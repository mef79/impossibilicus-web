
var width = 800,
    height = 500;

var actions = [];

var fill = d3.scale.category20();

// mouse event vars
var dragged = null,
  selected_node = null, // currently selected node
  selected_link = null, // currently selected link
  mousedown_link = null, // the link that has been mousedown'd on
  mousedown_node = null, // the node that has been mousedown'd on
  isAddingLink = false, // whether or not we are in the 'adding link' state
  isUndoing = false; // whether or not we are in the 'undoing' state

// init force layout
var force = d3.layout.force() // create a force layout
  .size([width, height]) // of the given width/height
  .nodes([{}]) // initialize with a single node - ???
  .linkDistance(50) // how far the nodes are away from eachother
  .charge(-200) // how strongly the nodes repel eachother
  .on("tick", tick); // call the 'tick' function when drawing frames

// init svg
var svg = d3.select("#graph")
  .append("svg")
    .attr("width", width) 
    .attr("height", height)
    .on("click", onSvgClick)
    .on("mouseup", mouseup);
    
var container = svg.append("rect")
	.attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "white")
  .attr("stroke", "black");

// build the arrow.
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
        .attr("fill", function(d) { return d == "end-selected" ? "#ff7f0e" : "#000"});

// get layout properties
var nodes = force.nodes(),
  links = force.links(),
  node = svg.selectAll(".node");

var link = svg.selectAll("path")
    .data(force.links())
  .enter().append("svg:path")
    .attr("class", function(d) { return "link " + d.type; })
    .attr("marker-end", function(d) { return selected_link === d ? "url(#end-selected)" : "url(#end)"});

function dragStart(d) {
  clearInfo();
  force.stop();
}

function dragMove(d) {
  d.px += d3.event.dx;
  d.py += d3.event.dy;
  d.x += d3.event.dx;
  d.y += d3.event.dy;
  tick();
}

function dragEnd(d) {
  d.fixed = true;
  force.resume();
}

var node_drag = d3.behavior.drag()
    .on("dragstart", dragStart)
    .on("drag", dragMove)
    .on("dragend", dragEnd);

redraw();

// focus on svg?
svg.node().focus();

initTopBar();

function initTopBar() {
  // just "add node" for now
  var addNode = document.getElementById('add-node');
  addNode.onclick = onAddNodeClick;
}

function resetSelected() {
  selected_node = null;
  selected_link = null; 
  isAddingLink = false;
  redraw();
}

// indicate there is no element currently being clicked on
function mouseup() {
  mousedown_node = null;
  mousedown_link = null;
}

function resetMouseVars() {
  dragged = null;
  mousedown_node = null;
  mousedown_link = null;
}

// called by the d3 force graph every time a frame is redrawn
function tick() {

  // redraw the path of the links given their source/target node positions
  link
    .attr("d", function(d) {
      return "M" + d.source.x + "," + d.source.y + // where the path starts
             "L" + d.target.x + "," + d.target.y; // where the path ends (absolute, not relative)
    });

  // redraw the ndes at their new position
  node
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
}

// redraw force layout
function redraw() {

  updateUndo(); // set the style/action of the undo button
  updateStyle(); // update the overall style of the container
  setMotion(); // pause the graph when some element is selected

  link = link.data(links);

  link.enter().insert("path", ".node")
    .attr("class", "link")
    .attr("marker-end", function(d) {
      return d === selected_link ? "url(#end-selected" : "url(#end)"
    })
    .on("mousedown", 
      function(d) { 
        d3.event.stopPropagation();
        mousedown_link = d; 
        selected_link = d; 
        selected_node = null; 
        redraw(); 
      });

  link.exit().remove();

  link.classed("link_selected", function(d) { return d === selected_link; });

  node = node.data(nodes);

  node.enter().insert("circle")
    .attr("class", "node")
    .attr("r", 10)
    .on("click", function(d) {
      if (isAddingLink) {
        // create a link from selected to this node
        insertNewLink(selected_node, d);
        isAddingLink = false;
      } 
      else {
        selected_node = d;
        mousedown_node = d;
        selected_link = null;
      }
      redraw();
    })
    // .on("mousedown", function(d) {
    //   mousedown_node = d;
    // })
    // .on("mousemove", function(d) {
    //   mousedown_node = null;
    // })
    // .on("mouseup", function(d) {
    //   d.fixed = true;
    //   if (d == mousedown_node) {
    //     selected_node = d;
    //     selected_link = null;
    //   }
    // })
    .call(node_drag)
    .transition()
      .duration(750)
      .ease("elastic")
      .attr("r", 10);

  node.exit().transition()
    .attr("r", 0)
    .remove();

  node.classed("node_selected", function(d) { return d === selected_node; });

  updateInfo();

  if (d3.event) {
    // prevent browser's default behavior
    d3.event.preventDefault();
  }
}

// stop the animation if anything is selected
function setMotion() {
  if (selected_link || selected_node) {
    force.stop()
  }
  else {
    force.start();
  }
}

// disable/gray out the undo button if there's nothing to undo
function updateUndo() {
  var undo = document.getElementById("undo");
  if (actions.length == 0 && !undo.classList.contains('disabled')) {
    undo.classList.add("disabled");
    undo.onclick = null;
  } 
  else if (actions.length > 0 && undo.classList.contains('disabled')) {
    undo.classList.remove('disabled');
    undo.onclick = onUndoClick;
  }
}

function updateStyle() {
  // apply style to indicate that the user is currently adding a link
  if (isAddingLink) {
    showAddingStyle("adding link");
  }
  else {
    showAddingStyle(false);
  }
}

// update the tooltip and the bottom section of the page
function updateInfo() {
	if (selected_node) {
    fillInfo(selected_node, true, !isAddingLink);
  }
  else if (selected_link) {
  	fillInfo(selected_link, false, !isAddingLink);
  }
  else if (document.getElementById('bottom')) {
    clearInfo();
  }
}

function clearInfo() {
  removeElementsByClass("tooltip");
  var bottom = document.getElementById('bottom');
  bottom.innerHTML = "No element selected";
}

function fillInfo(selected, isNode, showTooltip) {
	var bottom = document.getElementById('bottom');
  var tooltipContent;
  var bottomContent;
  removeElementsByClass('tooltip');
  var div = document.createElement("div");
  div.className = 'tooltip'
  var offsetTop = 15;
  var xSource, ySource, xTarget, yTarget;

  if (isNode) {
  	div.style.left = Math.round(selected.x) - 104 + "px";
  	div.style.top = Math.round(selected.y) - 48 + offsetTop + "px";
	  tooltipContent = '(' + Math.round(selected.x) + ', ' + Math.round(selected.y) + ')';
    bottomContent = tooltipContent;
  } 

  else {
    xSource = Math.round(selected.source.x);
    ySource = Math.round(selected.source.y);
    xTarget = Math.round(selected.target.x);
    yTarget = Math.round(selected.target.y);
  	bottomContent = 'source: (' + xSource + ', ' + ySource + ')';
    bottomContent += '<br>'
    bottomContent += 'target: (' + xTarget + ', ' + yTarget + ')';
    tooltipContent = 'link selected';
    div.style.left = (xSource + xTarget)/2 - 100;
    div.style.top = (ySource + yTarget)/2 - 25;
  }

  if (showTooltip) {
    // add delete button
    var delButton = document.createElement("div");
    delButton.className = 'del button';
    delButton.innerHTML = 'x';
    delButton.onclick = onDelClick;

    // add link button
    var nodeButton = document.createElement("div");
    nodeButton.className = 'add button';
    nodeButton.innerHTML = 'node+'
    nodeButton.onclick = onAddLinkedNodeClick;

    // add node button
    var linkButton = document.createElement("div");
    linkButton.className = 'add button';
    linkButton.innerHTML = 'link+'
    linkButton.onclick = onAddLinkClick;
  
    document.body.appendChild(div);
    div.innerHTML = tooltipContent;
    div.appendChild(delButton);

    if (isNode) {
      div.appendChild(nodeButton);
      div.appendChild(linkButton);
    }
  }

  bottom.innerHTML = bottomContent;
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
    svg.selectAll("text").remove();
    container
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
      .attr("stroke-dasharray", null)
  }
}

//-- onClicks ------------------------------------------------------------------------------------//
function onSvgClick() {
  if (!mousedown_node && !mousedown_link) {
    resetSelected();
  }
}

function onUndoClick() {
  var latestAction = actions.pop();
  isUndoing = true;
  latestAction();
  isUndoing = false;
  redraw();
}

function onAddLinkClick() {
  isAddingLink = true;
  redraw();
}

function onAddLinkedNodeClick() {
  var x = selected_node.x - 100;
  var y = selected_node.y - 100;
  insertNewNode(x, y, selected_node);
  selected_node = null;
  redraw();
}

function onDelClick() {
  if (selected_link) {
    deleteLink(selected_link);
  } 
  else {
    deleteNode(selected_node);
  }
  resetSelected();
  redraw();
}

function onAddNodeClick() {
  insertNewNode(0, 0);
  resetSelected();
}

//-- actions -------------------------------------------------------------------------------------//
function insertNewNode(x, y, linkedFrom) {
  var newNode = {x: x, y: y};
  nodes.push(newNode);
  if (linkedFrom) {
    var newLink = {source: linkedFrom, target: newNode};
    links.push(newLink);
  }
  if (!isUndoing) {
    actions.push(function () {
      deleteNode(newNode)
    })
  }
}

function insertNewLink(source, target) {
  var newlink = { source: source, target: target };
  links.push(newlink);
  if (!isUndoing) {
    actions.push(function () {
      deleteLink(newlink);
    })
  }
}

function deleteNode(node) {
  nodes.splice(nodes.indexOf(node), 1);
  var deletedlinks = [];
  links.forEach(link => { 
    if (link.source === node || link.target === node) {
      deletedlinks.push(link);
      links.splice(links.indexOf(link), 1);
    }
  });
  if (!isUndoing) {
    actions.push(function () {
      insertNewNode(node)
      deletedlinks.forEach(link => {
        insertNewLink(link)
      })
    })
  }
}

function deleteLink(link) {
  links.splice(links.indexOf(link), 1);
  if (!isUndoing) {
    actions.push(function () {
      insertNewLink(link)
    })
  }
}

//-- util ----------------------------------------------------------------------------------------//
function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
