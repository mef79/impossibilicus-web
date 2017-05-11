/*
 *
 * Graph
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isImmutable } from 'immutable'
import * as d3 from 'd3'
import * as jQuery from 'jquery'
import { getLoadedStoryData, getCurrentData } from 'containers/HomePage/selectors'
import { clearLoadedStory, updateStory } from 'containers/HomePage/actions'
import { setListening, setSelectedNode, setDimensions } from './actions'
import { isListening, getSelectedNodeId, getDimensions } from './selectors'

/* disable a ton of linting because this uses d3 and poor linter does not understand */
/* eslint no-unused-vars: 0, indent: 0, no-param-reassign:0, no-var: 0, camelcase: 0, prefer-arrow-callback: 0, no-shadow: 0, no-mixed-operators: 0 */

export class Graph extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.initialize = this.initialize.bind(this)
    this.resizeGraph = this.resizeGraph.bind(this)
  }
  componentDidMount() {
    this.resizeGraph({
        width: window.innerWidth - 630,
        height: window.innerHeight - 200,
      })
    this.initialize([], [])
    jQuery(window).resize(() => {
        if (window.innerWidth >= 1256) {
            this.props.onResize({
                width: window.innerWidth - 630,
                height: window.innerHeight - 50,
            })
        } else {
            this.props.onResize({
                width: window.innerWidth - 20,
                height: (window.innerHeight / 2) - 30,
            })
        }
    })
}

  componentWillReceiveProps(nextProps) {
    if (this.props.loadedData.size === 0 && nextProps.loadedData.size > 0) {
      this.initialize(nextProps.loadedData.get('nodes'), nextProps.loadedData.get('links'))
    }
    if (this.props.dimensions.get('height') !== nextProps.dimensions.get('height') ||
      this.props.dimensions.get('width') !== nextProps.dimensions.get('width')) {
        this.resizeGraph({ height: nextProps.dimensions.get('height'), width: nextProps.dimensions.get('width') })
    }
  }

  resizeGraph(dimensions) {
    var svg = d3.select('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)
  }

  initialize(initialNodes, initialLinks) {
    var _this = this
    // remove the svg if there already is one
    d3.select('svg').remove()

    // size of the nodes
    var nodeSize = {
        width: 100,
        height: 30,
        rx: 5,
        ry: 5
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

    // the node we're currently creating a link to
    var linkingNode = false

    // whether a node was just dragged
    var dragged = false

    // the starting position of the latest node drag
    var dragstart_position = null

    // used to assign ids to nodes
    var node_counter = 0
    var link_counter = 0

    // temporary placeholder to determine whether to show the tooltip
    var should_show_info = true

    // whether or not we are in the 'undoing'/'redoing' state
    var isUndoing = false
    var isRedoing = false

    if (isImmutable(initialNodes)) {
      initialNodes = initialNodes.toJS()
    }
    if (isImmutable(initialLinks)) {
      initialLinks = initialLinks.toJS()
    }
    if (initialNodes.length < 1) {
      var midX = _this.props.dimensions.get('width') / 2
      var midY = _this.props.dimensions.get('height') / 2
      initialNodes = [createNode(midX, midY)]
    }
    this.nodes = initialNodes

    initialLinks.forEach(link => {
      link.source = getNode(link.source)
      link.target = getNode(link.target)
    })
    this.links = initialLinks

    var force = d3.layout.force() // create a force layout
        .size([_this.props.dimensions.get('width'), _this.props.dimensions.get('height')]) // of the given width/height
        .nodes(this.nodes) // initialize with a single node - ???
        .links(this.links)
        .linkDistance(150) // how far the nodes are away from eachother
        .charge(-500) // how strongly the nodes repel eachother
        .on('tick', tick.bind(this)) // call the 'tick' function when drawing frames

    // defines the zoom behavior
    var zoom = d3.behavior.zoom()
        .scaleExtent([0.1, 10]) // min/max zoom
        .on('zoom', zoomed) // call the zoom function when zooming

    // init svg
    var svg = d3.select('#graph')
        .append('svg')
        .attr('width', _this.props.dimensions.get('width'))
        .attr('height', _this.props.dimensions.get('height'))
        .on('click', onSvgClick)
        .on('mouseup', mouseup)
        .append('g')
        .call(zoom)

    var rect = svg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .style('pointer-events', 'all')

    var container = svg.append('g').attr('class', 'transformer')

    // build the arrow
    var defs = svg.append('defs')

    defs.selectAll('marker').append('marker')
        .data(['end', 'end-selected'])
        .enter()
        .append('svg:marker')    // This section adds in the arrows
        .attr('id', String)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 12)
        .attr('refY', 0)
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('orient', 'auto')
        .attr('class', d => d)
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', d => d === 'end-selected' ? '#ff7f0e' : '#000')

    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    var filter = defs.append('filter')
        .attr('id', 'drop-shadow')
        .attr('y', '-20%')
        .attr('height', '150%')

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter.append('feGaussianBlur')
        .attr('in', 'SourceAlpha')
        .attr('stdDeviation', 2)
        .attr('result', 'blur')

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter.append('feOffset')
        .attr('in', 'blur')
        .attr('dx', 2)
        .attr('dy', 2)
        .attr('result', 'offsetBlur')

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = filter.append('feMerge')

    feMerge.append('feMergeNode')
        .attr('in', 'offsetBlur')
    feMerge.append('feMergeNode')
        .attr('in', 'SourceGraphic')

    function zoomed() {
        container.attr('transform', `translate(${d3.event.translate})scale(${d3.event.scale})`)
    }

    function dragStart(d) {
        d3.event.sourceEvent.stopPropagation()
        dragstart_position = { x: d.x, y: d.y }
        selected_node = d
        redraw()
        force.stop()
    }

    function dragMove(d) {
        d.px += d3.event.dx
        d.py += d3.event.dy
        d.x += d3.event.dx
        d.y += d3.event.dy
        if (distance(dragstart_position, { x: d.x, y: d.y }) > 5) {
            clearInfo()
            dragged = true
            should_show_info = false
        }
        tick()
    }

    function distance(start, end) {
        return Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2)
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
        .on('dragstart', dragStart)
        .on('drag', dragMove)
        .on('dragend', dragEnd)

    var link = container.append('g').attr('class', 'link-group').selectAll('path')
        .data(this.links)
        .enter().append('svg:path')
        .attr('class', d => `link ${d.type}`)
        .attr('marker-end', d => selected_link === d ? 'url(#end-selected)' : 'url(#end)')

    var node = container.selectAll('.node')
        .data(this.nodes)
        .enter().append('rect')
        .on('click', onNodeClick)
        .attr('width', nodeSize.width)
        .attr('height', nodeSize.height)
        .attr('rx', nodeSize.rx)
        .attr('ry', nodeSize.ry)
        .attr('class', 'node')
        .style('filter', 'url(#drop-shadow)')
        .call(node_drag)

    var nodelabels = container.selectAll('.nodelabel')
        .data(this.nodes)
        .enter()
        .append('text')
        .on('click', onNodeClick)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('class', 'nodelabel')
        .text(d => d.id)

    redraw()
    initTopBar()

    function initTopBar() {
        // just 'add node' for now
        var addNode = document.getElementById('add-node')
        addNode.onclick = onAddNodeClick
    }

    function resetSelected() {
        _this.props.onSelectedNodeUpdate(null)
        selected_node = null
        selected_link = null
        linkingNode = null
        redraw()
    }

    // indicate there is no element currently being clicked on
    function mouseup() {
        mousedown_node = null
        mousedown_link = null
    }

    // called by the d3 force graph every time a frame is redrawn
    function tick() {
        // redraw the path of the links given their source/target node positions
        link.attr('d', d => {
            const prevStart = d.start ? d.start : d.source
            const prevEnd = d.end ? d.end : d.target
            const start = getClosestMidpointOnRect(d.target, d.source)
            const end = getClosestPointOnRect(prevStart, d.target)
            d.start = start
            d.end = end
            return `M${start.x},${start.y}L${end.x},${end.y}`
        })

        // redraw the ndes at their new position
        node.attr('x', d => d.x - nodeSize.width / 2)
            .attr('y', d => d.y - nodeSize.height / 2)

        nodelabels.attr('x', d => d.x - nodeSize.width / 2 + 6)
            .attr('y', d => d.y + 4)
    }

    // redraw force layout
    function redraw() {
        updateUndo() // set the style/action of the undo button
        updateStyle() // update the overall style of the container
        setMotion() // pause the graph when some element is selected

        if (_this.props.isListening) {
          _this.props.onStoryUpdate(_this.nodes, _this.links)
        }

        link = link.data(_this.links)

        link.enter().insert('path', '.node')
            .attr('class', 'link')
            .on('mousedown',
            d => {
                d3.event.stopPropagation()
                mousedown_link = d
                selected_link = d
                selected_node = null
                redraw()
            })

        link.exit().remove()

        link
            .classed('link_selected', d => d === selected_link)
            .attr('marker-end', d => d === selected_link ? 'url(#end-selected' : 'url(#end)')

        node = node.data(_this.nodes)

        node.enter().insert('rect')
            .attr('class', 'node')
            .attr('height', nodeSize.height)
            .attr('width', nodeSize.width)
            .attr('rx', nodeSize.rx)
            .attr('ry', nodeSize.ry)
            .style('filter', 'url(#drop-shadow)')
            .on('click', onNodeClick)
            .call(node_drag)
            .transition()
            .duration(750)
            .ease('elastic')
            .attr('height', nodeSize.height)
            .attr('width', nodeSize.width)
            .attr('rx', nodeSize.rx)
            .attr('ry', nodeSize.ry)

        node.exit().transition()
            .attr('height', 0)
            .attr('width', 0)
            .remove()

        node.classed('node_selected', d => d === selected_node)

        nodelabels = nodelabels.data(_this.nodes)
        nodelabels
            .enter()
            .insert('text')
            .on('click', onNodeClick)
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .attr('class', 'nodelabel')
            .text(d => d.id)

        nodelabels.exit().transition()
            .attr('font-size', '0px')
            .remove()

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
        var undo = document.getElementById('undo')
        if (undoStack.length === 0 && !undo.classList.contains('disabled')) {
            undo.classList.add('disabled')
            undo.onclick = null
        }
        else if (undoStack.length > 0 && undo.classList.contains('disabled')) {
            undo.classList.remove('disabled')
            undo.onclick = onUndoClick
        }
        var redo = document.getElementById('redo')
        if (redoStack.length === 0 && !redo.classList.contains('disabled')) {
            redo.classList.add('disabled')
            redo.onclick = null
        }
        else if (redoStack.length > 0 && redo.classList.contains('disabled')) {
            redo.classList.remove('disabled')
            redo.onclick = onRedoClick
        }
    }

    function updateStyle() {
        // apply style to indicate that the user is currently adding a link
        if (linkingNode) {
            showAddingStyle('adding link')
        }
        else {
            showAddingStyle(false)
        }
    }

    // update the tooltip and the bottom section of the page
    function updateInfo() {
        if (selected_node) {
            fillInfo(selected_node, true, !linkingNode && !dragged && should_show_info)
        }
        else if (selected_link) {
            fillInfo(selected_link, false, !linkingNode && !dragged && should_show_info)
        }
        else {
            clearInfo()
        }
    }

    function clearInfo() {
        removeElementsByClass('mf-tooltip')
    }

    function fillInfo(selected, isNode, showTooltip) {
        var tooltipContent = ''
        removeElementsByClass('mf-tooltip')
        var div = document.createElement('div')
        div.className = 'mf-tooltip'
        var xSource, ySource, xTarget, yTarget

        var t = d3.transform(d3.select('.transformer').attr('transform'))

        // start with just positioning it based on the current scale
        var tooltipLeft = Math.round(selected.x) * t.scale[0]
        var tooltipTop = Math.round(selected.y) * t.scale[1]

        // then account for the current translate
        tooltipLeft += t.translate[0]
        tooltipTop += t.translate[1]

        // THEN, account for the size of the node (since x/y are at the center)
        tooltipLeft -= t.scale[0] * nodeSize.width / 2
        tooltipTop -= t.scale[1] * nodeSize.height / 2

        // finally, account for the size of the tooltip
        tooltipLeft -= 60
        tooltipTop -= 50

        // ok, FINALLY finally, account for the page offset
        if (isNode) {
            var test = document.getElementById('graph')
            var dimensions = test.getBoundingClientRect()
            var offsetTop = dimensions.top
            var offsetLeft = dimensions.left

            div.style.left = `${tooltipLeft + offsetLeft}px`
            div.style.top = `${tooltipTop + offsetTop}px`
        }

        else {
            xSource = Math.round(selected.source.x)
            ySource = Math.round(selected.source.y)
            xTarget = Math.round(selected.target.x)
            yTarget = Math.round(selected.target.y)
            tooltipContent = 'link selected'
            div.style.left = (xSource + xTarget) / 2 - 100
            div.style.top = (ySource + yTarget) / 2 - 25
        }

        if (showTooltip) {
            // add delete button
            var delButton = document.createElement('div')
            delButton.className = 'del button'
            delButton.innerHTML = 'x'
            delButton.onclick = onDelClick

            // add link button
            var nodeButton = document.createElement('div')
            nodeButton.className = 'add button'
            nodeButton.innerHTML = 'node+'
            nodeButton.onclick = onAddLinkedNodeClick

            // add node button
            var linkButton = document.createElement('div')
            linkButton.className = 'add button'
            linkButton.innerHTML = 'link+'
            linkButton.onclick = onAddLinkClick

            var unlockButton = document.createElement('div')
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
    }

    function showAddingStyle(text) {
        // style to make it v clear that adding a link is currently what is happening
        if (text) {
            svg.append('text')
                .text(text)
                .attr('x', '50px')
                .attr('y', '50px')
                .attr('font-size', '50px')
                .attr('font-weight', 'bold')
                .attr('fill', '#ffe3e3')
                .attr('class', 'top-label')

            rect
                .attr('stroke', 'red')
                .attr('stroke-dasharray', '10,10')
                .attr('stroke-width', '6px')
        }

        // go back to the original style
        else {
            svg.selectAll('.top-label').remove()
            rect
                .attr('stroke', 'black')
                .attr('stroke-width', '1px')
                .attr('stroke-dasharray', null)
        }
    }

    // onClicks ------------------------------------------------------------------------------------//
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
        linkingNode = selected_node
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

    function onNodeClick(d) {
        if (linkingNode) {
            // create a link from selected to this node
            insertNewLink(linkingNode, d)
            linkingNode = null
        }
        else {
            _this.props.onSelectedNodeUpdate(d.id)
            selected_node = d
            mousedown_node = d
            selected_link = null
        }
        redraw()
    }

    // actions -------------------------------------------------------------------------------------//
    // create a node object nodes have an x, y, and index
    function createNode(x, y) {
        var node = { x, y, id: `node-${node_counter}` }
        node_counter++
        return node
    }

    // create a link object: links have a source and a target
    function createLink(source, target) {
        var link = {
            id: `link-${link_counter}`,
            source: getNode(source),
            target: getNode(target)
        }
        link_counter++
        return link
    }

    // create and insert a node
    function insertNewNode(x, y, linkedFrom) {
        var link
        var node = createNode(x, y)
        _this.nodes.push(node)
        if (linkedFrom) {
            link = createLink(linkedFrom, node)
            _this.links.push(link)
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
        _this.nodes.push(node)
    }

    // create and insert a link
    function insertNewLink(source, target) {
        var newlink = createLink(source, target)
        _this.links.push(newlink)
        if (!isUndoing) {
            redoStack = []
            undoStack.push(() => {
                deleteLink(newlink)
                redoStack.push(() => {
                    _this.links.push(newlink)
                })
            })
        }
    }

    // safe way to re-insert links whose nodes may have been deleted in the past
    function insertLinks(links) {
        _this.links.forEach(link => { insertLink(link) })
    }

    function insertLink(link) {
        _this.links.push(createLink(link.source, link.target))
    }

    // delete a node from the graph
    function deleteNode(node) {
        removeNode(node)

        // store the links that have been deleted so that they can be stored in the undo action
        var deleted = _this.links.filter(link => link.source === node || link.target === node)

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
            undoStack.push(() => {
                insertLink(link)
                redoStack.push(() => {
                    removeLink(link)
                })
            })
        }
    }

    // remove a node from the list
    function removeNode(node) {
        _this.nodes.splice(_this.nodes.indexOf(node), 1)
    }

    // remove a link from the list
    function removeLink(link) {
        _this.links.splice(_this.nodes.indexOf(link), 1)
    }

    // util ----------------------------------------------------------------------------------------//
    // find a node by its index
    function getNode(node) {
        return _this.nodes.find(e => e.id === node.id)
    }

    // remove all elements of a given class
    function removeElementsByClass(className) {
        var elements = document.getElementsByClassName(className)
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0])
        }
    }

    // given a starting point, find the closest point along the perimeter of the given
    // rectangle to that point
    function getClosestPointOnRect(from, rect) {
        var xmin = rect.x - nodeSize.width / 2
        var ymin = rect.y - nodeSize.height / 2
        var xmax = rect.x + nodeSize.width / 2
        var ymax = rect.y + nodeSize.height / 2

        var point = {
            x: null,
            y: null
        }

        if (from.x < xmin) {
            point.x = xmin + 3
        }
        if (from.x > xmax) {
            point.x = xmax - 3
        }

        if (from.y < ymin) {
            point.y = ymin + 3
        }
        if (from.y > ymax) {
            point.y = ymax - 3
        }

        // if either x or y was within the bounds
        if (!point.x) {
            point.x = from.x
        }
        if (!point.y) {
            point.y = from.y
        }

        return point
    }

    // similar to getClosestPoint, but it will only return a corner or a midpoint
    function getClosestMidpointOnRect(from, rect) {
        var xmin = rect.x - nodeSize.width / 2
        var ymin = rect.y - nodeSize.height / 2
        var xmax = rect.x + nodeSize.width / 2
        var ymax = rect.y + nodeSize.height / 2

        var points = [
            { x: xmin, y: rect.y }, // mid left
            { x: rect.x, y: ymin }, // top center
            { x: rect.x, y: ymax }, // bottom center
            { x: xmax, y: rect.y }  // mid right
        ]

        points.map(point => {
            point.dist = distance(from, point)
            return point
        })

        points.sort((a, b) => a.dist - b.dist)
        return points[0]
    }

    // clear the story data so that this won't be called again unnecessarily
    this.props.onInitialized()
  }

  render() {
    return (
      <div >
        <div id="graph" style={{ height: this.props.dimensions.get('height'), width: this.props.dimensions.get('width') }}>
        </div>
      </div>
    )
  }
}

Graph.propTypes = {
  storyData: PropTypes.object,
  onInitialized: PropTypes.func,
  isListening: PropTypes.bool,
  selectedNodeId: PropTypes.string,
  onStoryUpdate: PropTypes.func,
  dimensions: PropTypes.object.isRequired,
  onResize: PropTypes.func,
  loadedData: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  loadedData: getLoadedStoryData(),
  storyData: getCurrentData(),
  selectedNodeId: getSelectedNodeId(),
  isListening: isListening(),
  dimensions: getDimensions(),
})

export function mapDispatchToProps(dispatch) {
  return {
    onInitialized: () => { // done creating the graph
      dispatch(clearLoadedStory()) // remove the loaded story data
      dispatch(setListening(true)) // update store when things happen
      // dispatch(setCurrentStoryName())
    },
    onStoryUpdate: (nodes, links) => {
      dispatch(updateStory(nodes, links))
    },
    onSelectedNodeUpdate: nodeId => {
      dispatch(setSelectedNode(nodeId))
    },
    onResize: dimensions => {
      dispatch(setDimensions(dimensions))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
