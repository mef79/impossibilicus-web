// size of the graph
var dimensions = {
  width: 800,
  height: 500
}

// stacks of the most recently taken/undone actions
var undoStack = []
var redoStack = []
var undoneStack = []

// currently selected node
var selected_node = null

// currently selected link
var selected_link = null

// the link that has been mousedown'd on
var mousedown_link = null

// the node that has been mousedown'd on
var mousedown_node = null

// whether or not we are in the 'adding link' state
var isAddingLink = false

// whether a node was just dragged
var dragged = false

// the starting position of the latest node drag
var dragstart_position = null

// used to assign ids to nodes
var node_counter = 0

// temporary placeholder to determine whether to show the tooltip
var should_show_info = true

// whether or not we are in the 'undoing'/'redoing' state
var isUndoing = false
var isRedoing = false

var force = d3.layout.force() // create a force layout
  .size([dimensions.width, dimensions.height]) // of the given width/height
  .nodes([createNode()]) // initialize with a single node - ???
  .linkDistance(50) // how far the nodes are away from eachother
  .charge(-200) // how strongly the nodes repel eachother
  .on("tick", tick) // call the 'tick' function when drawing frames

// defines the zoom behavior
var zoom = d3.behavior.zoom()
  .scaleExtent([.1, 10]) // min/max zoom
  .on("zoom", zoomed) // call the zoom function when zooming

// init svg
var svg = d3.select("#graph")
  .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .on("click", onSvgClick)
    .on("mouseup", mouseup)
  .append("g")
    .call(zoom)

 var rect = svg.append("rect")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "none")
  .attr("stroke", "black")
  .style("pointer-events", "all")

var container = svg.append("g")

// build the arrow
svg.append("svg:defs").selectAll("marker")
    .data(["end", "end-selected"])
  .enter()
    .append("svg:marker")    // This section adds in the arrows
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 18)
      .attr("refY", 0)
      .attr("markerWidth", 5)
      .attr("markerHeight", 5)
      .attr("orient", "auto")
      .attr("class", function(d) { return d })
      .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", function(d) { return d == "end-selected" ? "#ff7f0e" : "#000"})

function zoomed() {
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
}

function dragStart(d) {
  d3.event.sourceEvent.stopPropagation()
  dragstart_position = {x: d.x, y: d.y}
  selected_node = d
  redraw()
  force.stop()
}

function dragMove(d) {
  d.px += d3.event.dx
  d.py += d3.event.dy
  d.x += d3.event.dx
  d.y += d3.event.dy
  if (distance(dragstart_position, {x: d.x, y:d.y}) > 5) {
    clearInfo()
    dragged = true
    should_show_info = false
  }
  tick()
}

function distance(start, end) {
  return Math.sqrt(Math.pow((end.x - start.x), 2) + Math.pow((end.y - start.y), 2))
}

function dragEnd(d) {
  if (dragged) {
    d.fixed = true
    dragstart_position = null
    should_show_info = true
  }
  tick()
  force.resume()
  redraw()
}

var node_drag = d3.behavior.drag()
  .on("dragstart", dragStart)
  .on("drag", dragMove)
  .on("dragend", dragEnd)

// get layout properties
var nodes = force.nodes(),
  links = force.links()

var link = container.append("g").selectAll("path")
    .data(force.links())
  .enter().append("svg:path")
    .attr("class", function(d) { return "link " + d.type })
    .attr("marker-end", function(d) { return selected_link === d ? "url(#end-selected)" : "url(#end)"})

var node = container.append("g").selectAll(".node")
    .data(force.nodes())
  .enter().append("circle")
    .on("click", onNodeClick)
    .attr("r", "10")
    .attr("class", "node")
    .call(node_drag)

redraw()
initTopBar()

function initTopBar() {
  // just "add node" for now
  var addNode = document.getElementById('add-node')
  addNode.onclick = onAddNodeClick
}

function resetSelected() {
  selected_node = null
  selected_link = null
  isAddingLink = false
  redraw()
}

// indicate there is no element currently being clicked on
function mouseup() {
  mousedown_node = null
  mousedown_link = null
}

function resetMouseVars() {
  dragged = null
  mousedown_node = null
  mousedown_link = null
}

// called by the d3 force graph every time a frame is redrawn
function tick() {
  // redraw the path of the links given their source/target node positions
  link.attr("d", function(d) {
      return "M" + d.source.x + "," + d.source.y + // where the path starts
             "L" + d.target.x + "," + d.target.y // where the path ends (absolute, not relative)
    })

  // redraw the ndes at their new position
  node.attr("cx", function(d) { return d.x })
    .attr("cy", function(d) { return d.y })
}

// redraw force layout
function redraw() {
  updateUndo() // set the style/action of the undo button
  updateStyle() // update the overall style of the container
  setMotion() // pause the graph when some element is selected

  link = link.data(links)

  link.enter().insert("path", ".node")
    .attr("class", "link")
    .on("mousedown",
      function(d) {
        d3.event.stopPropagation()
        mousedown_link = d
        selected_link = d
        selected_node = null
        redraw()
      })

  link.exit().remove()

  link
    .classed("link_selected", function(d) { return d === selected_link })
    .attr("marker-end", function(d) {
      return d === selected_link ? "url(#end-selected" : "url(#end)"
    })

  node = node.data(nodes)

  node.enter().insert("circle")
    .attr("class", "node")
    .attr("r", 10)
    .on("click", onNodeClick)
    .call(node_drag)
    .transition()
      .duration(750)
      .ease("elastic")
      .attr("r", 10)

  node.exit().transition()
    .attr("r", 0)
    .remove()

  node.classed("node_selected", function(d) { return d === selected_node })

  updateInfo()

  if (dragged) {
    dragged = false
  }
}

// stop the animation if anything is selected
function setMotion() {
  if (selected_link || selected_node) {
    force.stop()
  }
  else {
    force.start()
  }
}

// disable/gray out the undo button if there's nothing to undo
function updateUndo() {
  var undo = document.getElementById("undo")
  if (undoStack.length == 0 && !undo.classList.contains('disabled')) {
    undo.classList.add("disabled")
    undo.onclick = null
  }
  else if (undoStack.length > 0 && undo.classList.contains('disabled')) {
    undo.classList.remove('disabled')
    undo.onclick = onUndoClick
  }
  var redo = document.getElementById("redo")
  if (redoStack.length == 0 && !redo.classList.contains('disabled')) {
    redo.classList.add("disabled")
    redo.onclick = null
  }
  else if (redoStack.length > 0 && redo.classList.contains('disabled')) {
    redo.classList.remove('disabled')
    redo.onclick = onRedoClick
  }
}

function updateStyle() {
  // apply style to indicate that the user is currently adding a link
  if (isAddingLink) {
    showAddingStyle("adding link")
  }
  else {
    showAddingStyle(false)
  }
}

// update the tooltip and the bottom section of the page
function updateInfo() {
	if (selected_node) {
    fillInfo(selected_node, true, !isAddingLink && !dragged && should_show_info)
  }
  else if (selected_link) {
  	fillInfo(selected_link, false, !isAddingLink && !dragged && should_show_info)
  }
  else if (document.getElementById('bottom')) {
    clearInfo()
  }
}

function clearInfo() {
  removeElementsByClass("tooltip")
  var bottom = document.getElementById('bottom')
  bottom.innerHTML = "No element selected"
}

function fillInfo(selected, isNode, showTooltip) {
	var bottom = document.getElementById('bottom')
  var tooltipContent = ''
  var bottomContent
  removeElementsByClass('tooltip')
  var div = document.createElement("div")
  div.className = 'tooltip'
  var offsetTop = 15
  var xSource, ySource, xTarget, yTarget

  if (isNode) {
  	div.style.left = Math.round(selected.x) - 104 + "px"
  	div.style.top = Math.round(selected.y) - 48 + offsetTop + "px"
	  // tooltipContent = '(' + Math.round(selected.x) + ', ' + Math.round(selected.y) + ')'
    bottomContent = tooltipContent
  }

  else {
    xSource = Math.round(selected.source.x)
    ySource = Math.round(selected.source.y)
    xTarget = Math.round(selected.target.x)
    yTarget = Math.round(selected.target.y)
  	bottomContent = 'source: (' + xSource + ', ' + ySource + ')'
    bottomContent += '<br>'
    bottomContent += 'target: (' + xTarget + ', ' + yTarget + ')'
    tooltipContent = 'link selected'
    div.style.left = (xSource + xTarget)/2 - 100
    div.style.top = (ySource + yTarget)/2 - 25
  }

  if (showTooltip) {
    // add delete button
    var delButton = document.createElement("div")
    delButton.className = 'del button'
    delButton.innerHTML = 'x'
    delButton.onclick = onDelClick

    // add link button
    var nodeButton = document.createElement("div")
    nodeButton.className = 'add button'
    nodeButton.innerHTML = 'node+'
    nodeButton.onclick = onAddLinkedNodeClick

    // add node button
    var linkButton = document.createElement("div")
    linkButton.className = 'add button'
    linkButton.innerHTML = 'link+'
    linkButton.onclick = onAddLinkClick

    var unlockButton = document.createElement("div")
    unlockButton.className = 'button'
    unlockButton.innerHTML = 'unlock'
    unlockButton.onclick = onUnlockClick

    document.body.appendChild(div)
    div.innerHTML = tooltipContent
    div.appendChild(delButton)

    if (isNode) {
      div.appendChild(nodeButton)
      div.appendChild(linkButton)
      if (selected_node.fixed) {
        div.appendChild(unlockButton)
      }
    }
  }

  bottom.innerHTML = bottomContent
}

function showAddingStyle(text) {
  // style to make it v clear that adding a link is currently what is happening
  if (text) {
    svg.append("text")
      .text(text)
      .attr("x", "50px")
      .attr("y", "50px")
      .attr("font-size", "50px")
      .attr("font-weight", "bold")
      .attr("fill", "#ffe3e3")

    container
      .attr("stroke", "red")
      .attr("stroke-dasharray", "10,10")
      .attr("stroke-width", "6px")
  }

  // go back to the original style
  else {
    svg.selectAll("text").remove()
    container
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
      .attr("stroke-dasharray", null)
  }
}

//-- onClicks ------------------------------------------------------------------------------------//
function onSvgClick() {
  if (!mousedown_node && !mousedown_link) {
    resetSelected()
  }
}

function onUndoClick() {
  var latestAction = undoStack.pop()
  undoneStack.push(latestAction)
  isUndoing = true
  latestAction()
  isUndoing = false
  redraw()
}

function onRedoClick() {
  var latestAction = redoStack.pop()
  undoStack.push(undoneStack.pop())
  isRedoing = true
  latestAction()
  isRedoing = false
  redraw()
}

function onUnlockClick() {
  selected_node.fixed = false
  selected_node = null
  redraw()
}

function onAddLinkClick() {
  isAddingLink = true
  redraw()
}

function onAddLinkedNodeClick() {
  var x = selected_node.x - 100
  var y = selected_node.y - 100
  insertNewNode(x, y, selected_node)
  selected_node = null
  redraw()
}

function onDelClick() {
  if (selected_link) {
    deleteLink(selected_link)
  }
  else {
    deleteNode(selected_node)
  }
  resetSelected()
  redraw()
}

function onAddNodeClick() {
  insertNewNode(0, 0)
  resetSelected()
}

function onNodeMousedown(d) {
  console.log(d)
}

function onNodeMouseup(d) {
  console.log(d)
}

function onNodeClick(d) {
  if (isAddingLink) {
    // create a link from selected to this node
    insertNewLink(selected_node, d)
    isAddingLink = false
  }
  else {
    selected_node = d
    mousedown_node = d
    selected_link = null
  }
  redraw()
}

//-- actions -------------------------------------------------------------------------------------//
// create a node object nodes have an x, y, and index
function createNode(x, y) {
  var node = {
    x: x,
    y: y,
    id: 'node-' + node_counter
  }
  node_counter++
  return node
}

// create a link object: links have a source and a target
function createLink(source, target) {
  return {
    source: getNode(source),
    target: getNode(target)
  }
}

// create and insert a node
function insertNewNode(x, y, linkedFrom) {
  var node = createNode(x, y)
  nodes.push(node)
  if (linkedFrom) {
    var link = createLink(linkedFrom, node)
    links.push(link)
  }
  if (!isUndoing) {
    redoStack = []
    undoStack.push(() => {
      deleteNode(node)
      redoStack.push(() => {
        insertNode(node)
        if (linkedFrom) {
          insertLink(link)
        }
      })
    })
  }
}

// insert an already created node
function insertNode(node) {
  nodes.push(node)
}

// create and insert a link
function insertNewLink(source, target) {
  var newlink = createLink(source, target)
  links.push(newlink)
  if (!isUndoing) {
    redoStack = []
    undoStack.push(() => {
      deleteLink(newlink)
      redoStack.push(() => {
        links.push(newLink)
      })
    })
  }
}

// safe way to re-insert links whose nodes may have been deleted in the past
function insertLinks(links) {
  links.forEach(link => { insertLink(link) })
}

function insertLink(link) {
  links.push(createLink(link.source, link.target))
}

// delete a node from the graph
function deleteNode(node) {
  removeNode(node)

  // store the links that have been deleted so that they can be stored in the undo action
  var deleted = links.filter(link => { return link.source === node || link.target === node })

  // remove the deleted links
  deleted.forEach(link => { removeLink(link) })

  // undo action is to insert the deleted node and all the links that were associated with it
  if (!isUndoing) {
    redoStack = []
    undoStack.push(() => {
      insertNode(node)
      insertLinks(deleted)
      redoStack.push(() => {
        deleteNode(node)
      })
    })
  }
}

// delete a link from the graph
function deleteLink(link) {
  removeLink(link)
  if (!isUndoing) {
    redoStack = []
    undoStack.push(function () {
      insertLink(link)
      redoStack.push(() => {
        removeLink(link)
      })
    })
  }
}

// remove a node from the list
function removeNode(node) {
  nodes.splice(nodes.indexOf(node), 1)
}

// remove a link from the list
function removeLink(node) {
  links.splice(nodes.indexOf(link), 1)
}

//-- util ----------------------------------------------------------------------------------------//
// find a node by its index
function getNode(node) {
  return nodes.find(e => { return e.id == node.id })
}

// remove all elements of a given class
function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className)
    while (elements.length > 0){
        elements[0].parentNode.removeChild(elements[0])
    }
}
