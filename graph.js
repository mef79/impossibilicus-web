
var width = 540,
    height = 500;

var actions = [];

var fill = d3.scale.category20();

// mouse event vars
var dragged = null,
  selected_node = null,
  selected_link = null,
  mousedown_link = null,
  mousedown_node = null,
  mouseup_node = null,
  isAddingLink = false;

// init force layout
var force = d3.layout.force()
  .size([width, height])
  .nodes([{}]) // initialize with a single node
  .linkDistance(50)
  .charge(-200) // they repel
  .on("tick", tick);

// init svg
var svg = d3.select("#graph").append("svg")
  .attr("width", width)
  .attr("height", height)
  .on("click", onClick)
  .on("mouseup", mouseup);
    
var container = svg.append("rect")
	.attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "white")
  .attr("stroke", "black");

// line displayed when dragging new nodes
var drag_line = svg.append("line")
  .attr("class", "drag_line")
  .attr("x1", 0)
  .attr("y1", 0)
  .attr("x2", 0)
  .attr("y2", 0);

// get layout properties
var nodes = force.nodes(),
  links = force.links(),
  node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

redraw();

// focus on svg?
svg.node().focus();

initTopBar();

var isUndoing = false;

function onUndoClick() {
  var latestAction = actions.pop();
  isUndoing = true;
  latestAction();
  isUndoing = false;
  redraw();
}

function initTopBar() {
  // just "add node" for now
  var addNode = document.getElementById('add-node');
  addNode.onclick = onAddNodeClick;
}

function onClick() {
  if (!mousedown_node && !mousedown_link) {
    resetSelected();
  }
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
  mouseup_node = null;
  mousedown_link = null;
}

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
}

// redraw force layout
function redraw() {

  if (!link) return;

  var undo = document.getElementById("undo");
  if (actions.length == 0 && !undo.classList.contains('disabled')) {
    undo.classList.add("disabled");
    undo.onclick = null;
  } else if (actions.length > 0 && undo.classList.contains('disabled')) {
    undo.classList.remove('disabled');
    undo.onclick = onUndoClick;
  }

  // apply style to indicate that the user is currently adding a link
  if (isAddingLink) {
    showAddingStyle("adding link");
  }
  else {
    showAddingStyle(false);
  }

  // stop the animation if something's selected
  if (selected_link || selected_node) {
    force.stop()
  }

  link = link.data(links);

  link.enter().insert("line", ".node")
    .attr("class", "link")
    .on("mousedown", 
      function(d) { 
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
    .attr("r", 5)
    .on("click", function(d) {
      if (isAddingLink) {
        // create a link from selected to this node
        insertNewLink(selected_node, d);
        isAddingLink = false;
      } else {
        selected_node = d;
        mousedown_node = d;
        selected_link = null;
      }
      redraw();
    })
    .transition()
      .duration(750)
      .ease("elastic")
      .attr("r", 6.5);

  node.exit().transition()
    .attr("r", 0)
    .remove();

  node.classed("node_selected", function(d) { return d === selected_node; });

  updateInfo();

  if (d3.event) {
    // prevent browser's default behavior
    d3.event.preventDefault();
  }

  if (!selected_link && !selected_node) {
    force.start();
  }

}

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
  if (isNode) {
  	div.style.left = Math.round(selected.x) - 104 + "px";
  	div.style.top = Math.round(selected.y) - 48 + offsetTop + "px";
	  tooltipContent = '(' + Math.round(selected.x) + ', ' + Math.round(selected.y) + ')';
    bottomContent = tooltipContent;
  } else {
  	bottomContent = 'source: (' + Math.round(selected.source.x) + ', ' + Math.round(selected.source.y) + ')';
    bottomContent += '<br>'
    bottomContent += 'target: (' + Math.round(selected.target.x) + ', ' + Math.round(selected.target.y) + ')';
    tooltipContent = 'link selected';
    div.style.left = (Math.round(selected.source.x) + Math.round(selected.target.x))/2 - 100;
    div.style.top = (Math.round(selected.source.y) + Math.round(selected.target.y))/2 - 25;
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

// util
function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
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