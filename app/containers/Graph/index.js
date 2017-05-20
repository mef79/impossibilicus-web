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
import {
  getLoadedStoryData,
  getCurrentData,
  getSelectedNode,
  getSelectedLink,
} from 'containers/HomePage/selectors'
import { clearLoadedStory, updateStory } from 'containers/HomePage/actions'
import {
  setListening,
  setSelectedNode,
  setSelectedLink,
  setDimensions,
  incrementNodeCounter,
  incrementLinkCounter,
  setLinkingNode,
  setMousedownNode,
  setMousedownLink,
} from './actions'
import {
  isListening,
  getDimensions,
  getNodeCount,
  getLinkCount,
  getLinkingNode,
  getMousedownNode,
  getMousedownLink,
} from './selectors'
import { LOCK } from 'utils/icons'

/* disable a ton of linting because this uses d3 and poor linter does not understand */
/* eslint no-unused-vars: 0, indent: 0, no-param-reassign:0, no-var: 0, camelcase: 0, prefer-arrow-callback: 0, no-shadow: 0, no-mixed-operators: 0 */

export class Graph extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.initialize = this.initialize.bind(this)
    this.resizeGraph = this.resizeGraph.bind(this)
    this.createNode = this.createNode.bind(this)
    this.insertNewNode = this.insertNewNode.bind(this)
    this.onAddNodeClick = this.onAddNodeClick.bind(this)
    this.getClosestMidpointOnRect = this.getClosestMidpointOnRect.bind(this)
    this.getClosestPointOnRect = this.getClosestPointOnRect.bind(this)
    this.distance = this.distance.bind(this)
    this.getNode = this.getNode.bind(this)
    this.removeLink = this.removeLink.bind(this)
    this.updateUndo = this.updateUndo.bind(this)
    this.redraw = this.redraw.bind(this)
    this.updateStyle = this.updateStyle.bind(this)
    this.setMotion = this.setMotion.bind(this)
    this.showAddingStyle = this.showAddingStyle.bind(this)
    this.onLinkClick = this.onLinkClick.bind(this)
    this.onNodeClick = this.onNodeClick.bind(this)
    this.updateInfo = this.updateInfo.bind(this)
    this.fillInfo = this.fillInfo.bind(this)
    this.clearInfo = this.clearInfo.bind(this)
    this.removeElementsByClass = this.removeElementsByClass.bind(this)
    this.onSvgClick = this.onSvgClick.bind(this)
    this.onUndoClick = this.onUndoClick.bind(this)
    this.onRedoClick = this.onRedoClick.bind(this)
    this.onUnlockClick = this.onUnlockClick.bind(this)
    this.onLockLinkClick = this.onLockLinkClick.bind(this)
    this.onUnlockLinkClick = this.onUnlockLinkClick.bind(this)
    this.onAddLinkClick = this.onAddLinkClick.bind(this)
    this.onAddLinkedNodeClick = this.onAddLinkedNodeClick.bind(this)
    this.onDelClick = this.onDelClick.bind(this)
    this.resetSelected = this.resetSelected.bind(this)
    this.insertNewLink = this.insertNewLink.bind(this)
    this.createLink = this.createLink.bind(this)
    this.deleteLink = this.deleteLink.bind(this)
    this.deleteNode = this.deleteNode.bind(this)
    this.removeNode = this.removeNode.bind(this)
    this.insertLink = this.insertLink.bind(this)
    this.insertLinks = this.insertLinks.bind(this)
    this.insertNode = this.insertNode.bind(this)
  }

  componentDidMount() {
    document.getElementById('add-node').onclick = this.onAddNodeClick
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
      }
      else {
        this.props.onResize({
          width: window.innerWidth - 20,
          height: (window.innerHeight / 2) - 30,
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    // if there is new data to load in
    if (this.props.loadedData.size === 0 && nextProps.loadedData.size > 0) {
      // re-initialize the graph
      this.initialize(nextProps.loadedData.get('nodes').toJS(),
        nextProps.loadedData.get('links').toJS())
    }

    // if the size of the graph has changed
    if (!this.props.dimensions.equals(nextProps.dimensions)) {
      // then resize the graph with the new dimensions
      this.resizeGraph(nextProps.dimensions.toJS())
    }
  }

  onSvgClick() {
    console.log('svg click')
    if (!this.props.mousedownNode && !this.props.mousedownLink) {
      console.log('no mousedown, resetting')
      this.resetSelected()
    }
  }

  onUndoClick() {
    var latestAction = this.undoStack.pop()
    this.undoneStack.push(latestAction)
    this.isUndoing = true
    latestAction()
    this.isUndoing = false
    this.redraw()
  }

  onRedoClick() {
    var latestAction = this.redoStack.pop()
    this.undoStack.push(this.undoneStack.pop())
    this.isRedoing = true
    latestAction()
    this.isRedoing = false
    this.redraw()
  }

  onUnlockClick() {
    this.props.selectedNode.fixed = false
    this.props.onSelectedNodeUpdate(null)
    this.redraw()
  }

  onLockLinkClick() {
    this.props.selectedLink.locked = true
    this.redraw()
  }

  onUnlockLinkClick() {
    this.props.selectedLink.locked = false
    this.redraw()
  }

  onAddLinkClick() {
    this.props.onLinkingNodeChange(this.props.selectedNode)
    this.redraw()
  }

  onAddLinkedNodeClick() {
    var x = this.props.selectedNode.get('x') - 100
    var y = this.props.selectedNode.get('y') - 100
    this.insertNewNode(x, y, this.props.selectedNode.toJS())
    this.props.onSelectedNodeUpdate(null)
    this.redraw()
  }

  onDelClick() {
    if (this.props.selectedLink) {
      this.deleteLink(this.props.selectedLink.toJS())
    }
    else {
      this.deleteNode(this.props.selectedNode.toJS())
    }
    this.resetSelected()
    this.redraw()
  }

  onAddNodeClick() {
    this.insertNewNode(0, 0)
    this.redraw()
  }

  onLinkClick(d) {
    this.props.onMousedownLinkUpdate(d)
    this.props.onSelectedLinkUpdate(d)
    this.props.onSelectedNodeUpdate(null)
    this.redraw()
  }

  onNodeClick(d) {
    if (this.props.linkingNode) {
      // create a link from selected to this node
      this.insertNewLink(this.props.linkingNode.toJS(), d)
      this.props.onLinkingNodeChange(null)
    }
    else {
      this.props.onSelectedNodeUpdate(d.id)
      this.props.onMousedownNodeUpdate(d)
      this.props.onSelectedLinkUpdate(null)
    }
    this.redraw()
  }

  // given a starting point, find the closest point along the perimeter of the
  // given rectangle to that point
  getClosestPointOnRect(from, rect) {
    // bounds of the rectangle (with rounded edges)
    var xmin = rect.x - this.props.nodeSize.width / 2 + 3
    var ymin = rect.y - this.props.nodeSize.height / 2 + 3
    var xmax = rect.x + this.props.nodeSize.width / 2 - 3
    var ymax = rect.y + this.props.nodeSize.height / 2 - 3
    return {
      x: Math.min(xmax, Math.max(xmin, from.x)),
      y: Math.min(ymax, Math.max(ymin, from.y))
    }
  }

  // similar to getClosestPoint, but it will only return a corner or a midpoint
  getClosestMidpointOnRect(from, rect) {
    var xmin = rect.x - this.props.nodeSize.width / 2
    var ymin = rect.y - this.props.nodeSize.height / 2
    var xmax = rect.x + this.props.nodeSize.width / 2
    var ymax = rect.y + this.props.nodeSize.height / 2

    var points = [
      { x: xmin, y: rect.y }, // mid left
      { x: rect.x, y: ymin }, // top center
      { x: rect.x, y: ymax }, // bottom center
      { x: xmax, y: rect.y }  // mid right
    ]

    points.map(point => {
        point.dist = this.distance(from, point)
        return point
    })

    points.sort((a, b) => a.dist - b.dist)
    return points[0]
  }

  // stop the animation if anything is selected
  setMotion() {
    if (this.props.selectedLink || this.props.selectedNode) {
      this.force.stop()
    }
    else {
      this.force.start()
    }
  }

  // find a node by its index
  getNode(node) {
    return this.nodes.find(e => e.id === node.id)
  }

  // insert an already created node
  insertNode(node) {
    this.nodes.push(node)
  }

  // safe way to re-insert links whose nodes may have been deleted in the past
  insertLinks(links) {
    this.links.forEach(link => { this.insertLink(link) })
  }

  insertLink(link) {
    this.links.push(this.createLink(link.source, link.target))
  }

  deleteNode(node) {
    this.removeNode(node)

    // save links that have been deleted so that they can be stored in undo
    var deleted = this.links.filter(link =>
      link.source === node || link.target === node)

    // remove the deleted links
    deleted.forEach(link => { this.removeLink(link) })

    // undo action inserts the deleted node and all the associated links
    if (!this.isUndoing) {
      this.redoStack = []
      this.undoStack.push(() => {
        this.insertNode(node)
        this.insertLinks(deleted)
        this.redoStack.push(() => {
          this.deleteNode(node)
        })
      })
    }
  }

  // remove a node from the list
  removeNode(node) {
    this.nodes.splice(this.nodes.indexOf(node), 1)
  }

  // create and insert a link
  insertNewLink(source, target) {
    var newlink = this.createLink(source, target)
    this.links.push(newlink)
    if (!this.isUndoing) {
      this.redoStack = []
      this.undoStack.push(() => {
        this.deleteLink(newlink)
        this.redoStack.push(() => {
          this.links.push(newlink)
        })
      })
    }
  }

  // create a link object: links have a source and a target
  createLink(source, target) {
    var link = {
      id: `link-${this.props.linkCounter}`,
      source: this.getNode(source),
      target: this.getNode(target),
      locked: false,
    }
    this.props.onLinkAdded()
    return link
  }

  // delete a link from the graph
  deleteLink(link) {
    this.removeLink(link)
    if (!this.isUndoing) {
      this.redoStack = []
      this.undoStack.push(() => {
        this.insertLink(link)
        this.redoStack.push(() => {
          this.removeLink(link)
        })
      })
    }
  }

  resetSelected() {
    this.props.onSelectedNodeUpdate(null)
    this.props.onSelectedLinkUpdate(null)
    this.props.onLinkingNodeChange(null)
    this.redraw()
  }

  // remove all elements of a given class
  removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className)
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0])
    }
  }

  // disable/gray out the undo button if there's nothing to undo
  updateUndo() {
    var undo = document.getElementById('undo')
    if (this.undoStack.length === 0 && !undo.classList.contains('disabled')) {
      undo.classList.add('disabled')
      undo.onclick = null
    }
    else if (this.undoStack.length > 0 && undo.classList.contains('disabled')) {
      undo.classList.remove('disabled')
      undo.onclick = this.onUndoClick
    }
    var redo = document.getElementById('redo')
    if (this.redoStack.length === 0 && !redo.classList.contains('disabled')) {
      redo.classList.add('disabled')
      redo.onclick = null
    }
    else if (this.redoStack.length > 0 && redo.classList.contains('disabled')) {
      redo.classList.remove('disabled')
      redo.onclick = this.onRedoClick
    }
  }

  updateStyle() {
    // apply style to indicate that the user is currently adding a link
    if (this.props.linkingNode) {
      this.showAddingStyle('adding link')
    }
    else {
      this.showAddingStyle(false)
    }
  }

  showAddingStyle(text) {
    // style to make it v clear that adding a link is currently what is happening
    if (text) {
      this.svg.append('text')
          .text(text)
          .attr('x', '50px')
          .attr('y', '50px')
          .attr('font-size', '50px')
          .attr('font-weight', 'bold')
          .attr('fill', '#ffe3e3')
          .attr('class', 'top-label')

      this.rect.attr('stroke', 'red')
          .attr('stroke-dasharray', '10,10')
          .attr('stroke-width', '6px')
    }

    // go back to the original style
    else {
      this.svg.selectAll('.top-label').remove()
      this.rect.attr('stroke', 'black')
          .attr('stroke-width', '1px')
          .attr('stroke-dasharray', null)
    }
  }

  // update the tooltip and the bottom section of the page
  updateInfo() {
    const showTooltip = !this.props.linkingNode && !this.dragged && this.should_show_info
    if (this.props.selectedNode) {
      this.fillInfo(this.props.selectedNode.toJS(), true, showTooltip)
    }
    else if (this.props.selectedLink) {
      console.log('filling link info')
      this.fillInfo(this.props.selectedLink, false, showTooltip)
    }
    else {
      console.log('not filling info')
      this.clearInfo()
    }
  }

  clearInfo() {
    this.removeElementsByClass('mf-tooltip')
  }

  fillInfo(selected, isNode, showTooltip) {
    var tooltipContent = ''
    this.removeElementsByClass('mf-tooltip')
    var div = document.createElement('div')
    div.className = 'mf-tooltip'

    var t = d3.transform(d3.select('.transformer').attr('transform'))

    var x, y
    if (isNode) {
      x = Math.round(selected.x)
      y = Math.round(selected.y)
    }
    else {
      x = (Math.round(selected.start.x) + Math.round(selected.end.x)) / 2
      y = (Math.round(selected.start.y) + Math.round(selected.end.y)) / 2
    }

    // start with just positioning it based on the current scale
    var tooltipLeft = x * t.scale[0]
    var tooltipTop = y * t.scale[1]

    // then account for the current translate
    tooltipLeft += t.translate[0]
    tooltipTop += t.translate[1]

    // THEN, account for the size of the node (since x/y are at the center)
    tooltipLeft -= t.scale[0] * this.props.nodeSize.width / 2
    if (isNode) {
      tooltipTop -= t.scale[1] * this.props.nodeSize.height / 2
    }

    // finally, account for the size of the tooltip
    tooltipLeft -= 60
    tooltipTop -= 50

    // ok, FINALLY finally, account for the page offset
    var test = document.getElementById('graph')
    var dimensions = test.getBoundingClientRect()
    var offsetTop = dimensions.top
    var offsetLeft = dimensions.left

    div.style.left = `${tooltipLeft + offsetLeft}px`
    div.style.top = `${tooltipTop + offsetTop}px`

    if (!isNode) {
      tooltipContent = selected.id
    }

    if (showTooltip) {
      var delButton = this.makeTooltipButton('del', 'x', this.onDelClick)
      var nodeButton = this.makeTooltipButton('add', 'node+', this.onAddLinkedNodeClick)
      var linkButton = this.makeTooltipButton('add', 'link+', this.onAddLinkClick)
      var unlockButton = this.makeTooltipButton(null, 'unlock', this.onUnlockClick)
      var lockLink = this.makeTooltipButton(null, 'lock', this.onLockLinkClick)
      var unlockLink = this.makeTooltipButton(null, 'unlock', this.onUnlockLinkClick)

      // make the tooltip
      document.body.appendChild(div)
      div.innerHTML = tooltipContent

      // always add delete button
      div.appendChild(delButton)

      if (isNode) {
        // add a linked node or a link
        div.appendChild(nodeButton)
        div.appendChild(linkButton)

        // un-fix the node position
        if (this.props.selectedNode.fixed) {
          div.appendChild(unlockButton)
        }
      }
      // link has a lock on it: add unlock button
      else if (this.props.selectedLink.locked) {
        div.appendChild(unlockLink)
      }
      // link does not have a lock: add lock button
      else {
        div.appendChild(lockLink)
      }
    }
  }

  makeTooltipButton(extraClass, text, click) {
    var button = document.createElement('div')
    button.className = 'button'
    if (extraClass) {
      button.className = `button ${extraClass}`
    }
    button.innerHTML = text
    button.onclick = click
    return button
  }

  // redraw force layout
  redraw() {
    this.updateUndo() // set the style/action of the undo button
    this.updateStyle() // update the overall style of the container
    this.setMotion() // pause the graph when some element is selected

    if (this.props.isListening) {
      this.props.onStoryUpdate(this.nodes, this.links)
    }

    this.lock = this.lock.data(this.links.filter(e => e.locked))

    this.lock.enter()
        .insert('path')
        .attr('class', 'link-lock')
        .attr('d', LOCK)
        .attr('x', d => d.midX)
        .attr('y', d => d.midY)
        .attr('transform', d => `translate(${d.midX - 8},${d.midY - 10})scale(.7,.7)`)
    this.lock.exit().remove()

    this.link = this.link.data(this.links)

    this.link.enter().insert('path', '.node')
        .attr('class', 'link')
        .on('click', this.onLinkClick)

    this.link.exit().remove()

    this.link.classed('link_selected', d => d === this.props.selectedLink)
        .attr('marker-end', d => d === this.props.selectedLink ? 'url(#end-selected' : 'url(#end)')

    this.node = this.node.data(this.nodes)

    this.node.enter().insert('rect')
        .attr('class', 'node')
        .attr('height', this.props.nodeSize.height)
        .attr('width', this.props.nodeSize.width)
        .attr('rx', this.props.nodeSize.rx)
        .attr('ry', this.props.nodeSize.ry)
        .style('filter', 'url(#drop-shadow)')
        .on('click', this.onNodeClick)
        .call(this.node_drag)
        .transition()
        .duration(750)
        .ease('elastic')
        .attr('height', this.props.nodeSize.height)
        .attr('width', this.props.nodeSize.width)
        .attr('rx', this.props.nodeSize.rx)
        .attr('ry', this.props.nodeSize.ry)

    this.node.exit().transition()
        .attr('height', 0)
        .attr('width', 0)
        .remove()

    this.node.classed('node_selected', d => {
      if (this.props.selectedNode) {
        return d.id === this.props.selectedNode.get('id')
      }
      return false
    })

    this.nodelabels = this.nodelabels.data(this.nodes)

    this.nodelabels.enter()
        .insert('text')
        .on('click', this.onNodeClick)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('class', 'nodelabel')
        .text(d => d.id)

    this.nodelabels.exit().transition()
        .attr('font-size', '0px')
        .remove()

    this.updateInfo()

    if (this.dragged) {
        this.dragged = false
    }
  }

  // remove a link from the list
  removeLink(link) {
    this.links.splice(this.nodes.indexOf(link), 1)
  }

  resizeGraph(dimensions) {
    var svg = d3.select('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
  }

  distance(start, end) {
    return Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2)
  }

  insertNewNode(x, y, linkedFrom) {
    var link
    var node = this.createNode(x, y)
    this.nodes.push(node)
    if (linkedFrom) {
      link = this.createLink(linkedFrom, node)
      this.links.push(link)
    }
    if (!this.isUndoing) {
      this.redoStack = []
      this.undoStack.push(() => {
        this.deleteNode(node)
        this.redoStack.push(() => {
          this.insertNode(node)
          if (linkedFrom) {
            this.insertLink(link)
          }
        })
      })
    }
  }

  // create a node object nodes have an x, y, and index
  createNode(x, y) {
    var node = { x, y, id: `node-${this.props.nodeCounter}` }
    this.props.onNodeAdded()
    return node
  }

  initialize(initialNodes, initialLinks) {
    var _this = this
    // remove the svg if there already is one
    d3.select('svg').remove()

    // the most recently taken/undone actions
    _this.undoStack = []
    _this.redoStack = []
    _this.undoneStack = []

    // whether a node was just dragged - indicates whether redraw() is necessary
    _this.dragged = false

    // the starting position of the latest node drag
    var dragstart_position = null

    // used to assign ids to nodes
    var link_counter = 0

    // temporary placeholder to determine whether to show the tooltip
    _this.should_show_info = true

    // whether or not we are in the 'undoing'/'redoing' state
    _this.isUndoing = false
    _this.isRedoing = false

    // create the initial set of data if nothing is passed in
    if (initialNodes.length === 0) {
      ({ initialNodes, initialLinks } = this.props.createDefaultStructure(this.createNode))
    }

    this.nodes = initialNodes

    initialLinks.forEach(link => {
      link.source = _this.getNode(link.source)
      link.target = _this.getNode(link.target)
    })
    this.links = initialLinks

    _this.force = d3.layout.force() // create a force layout
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
    _this.svg = d3.select('#graph')
        .append('svg')
        .attr('width', _this.props.dimensions.get('width'))
        .attr('height', _this.props.dimensions.get('height'))
        .on('click', _this.onSvgClick)
        // .on('mouseup', mouseup)
        .append('g')
        .call(zoom)

    _this.rect = _this.svg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .style('pointer-events', 'all')

    var container = _this.svg.append('g').attr('class', 'transformer')

    // build the arrow
    var defs = _this.svg.append('defs')

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
        .attr('fill', d => d === 'end-selected' ? '#ff7f0e' : '#555555')

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
        _this.props.onSelectedNodeUpdate(d.id)
        _this.redraw()
        _this.force.stop()
    }

    function dragMove(d) {
        d.px += d3.event.dx
        d.py += d3.event.dy
        d.x += d3.event.dx
        d.y += d3.event.dy
        if (distance(dragstart_position, { x: d.x, y: d.y }) > 5) {
            _this.clearInfo()
            _this.dragged = true
            _this.should_show_info = false
        }
        tick()
    }

    function distance(start, end) {
        return Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2)
    }

    function dragEnd(d) {
        if (_this.dragged) {
            d.fixed = true
            dragstart_position = null
            _this.should_show_info = true
        }
        tick()
        _this.force.resume()
        _this.redraw()
    }

    _this.node_drag = d3.behavior.drag()
        .on('dragstart', dragStart)
        .on('drag', dragMove)
        .on('dragend', dragEnd)

    _this.link = container.append('g').attr('class', 'link-group').selectAll('path')
        .data(this.links)
        .enter().append('svg:path')
        .on('click', _this.onLinkClick)
        .attr('class', d => `link ${d.type}`)
        .attr('marker-end', d => _this.props.selectedLink === d ? 'url(#end-selected)' : 'url(#end)')

    _this.lock = container.append('g').attr('class', 'lock-group').selectAll('path')
        .data(this.links.filter(e => e.locked))
        .enter().append('path')
        .attr('d', LOCK)
        .attr('class', 'link-lock')

    _this.node = container.selectAll('.node')
        .data(this.nodes)
        .enter().append('rect')
        .on('click', this.onNodeClick)
        .attr('width', this.props.nodeSize.width)
        .attr('height', this.props.nodeSize.height)
        .attr('rx', this.props.nodeSize.rx)
        .attr('ry', this.props.nodeSize.ry)
        .attr('class', 'node')
        .style('filter', 'url(#drop-shadow)')
        .call(_this.node_drag)

    _this.nodelabels = container.selectAll('.nodelabel')
        .data(this.nodes)
        .enter()
        .append('text')
        .on('click', this.onNodeClick)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('class', 'nodelabel')
        .text(d => d.id)

    _this.redraw()

    // indicate there is no element currently being clicked on
    function mouseup() {
        console.log('mouseup')
        _this.props.onMousedownNodeUpdate(null)
        _this.props.onMousedownLinkUpdate(null)
    }

    // called by the d3 force graph every time a frame is redrawn
    function tick() {
        // redraw the path of the links given their source/target node positions
        _this.link.attr('d', d => {
            const prevStart = d.start ? d.start : d.source
            const prevEnd = d.end ? d.end : d.target
            const start = _this.getClosestMidpointOnRect(d.target, d.source)
            const end = _this.getClosestPointOnRect(prevStart, d.target)
            d.midX = (start.x + end.x) / 2
            d.midY = (start.y + end.y) / 2
            d.start = start
            d.end = end
            return `M${start.x},${start.y}L${end.x},${end.y}`
        })

        _this.lock.attr('x', d => d.midX)
            .attr('y', d => d.midY)
            .attr('transform', d => `translate(${d.midX - 8},${d.midY - 10})scale(.7,.7)`)

        // redraw the ndes at their new position
        _this.node.attr('x', d => d.x - _this.props.nodeSize.width / 2)
            .attr('y', d => d.y - _this.props.nodeSize.height / 2)

        _this.nodelabels.attr('x', d => d.x - _this.props.nodeSize.width / 2 + 6)
            .attr('y', d => d.y + 4)
    }

    // clear the story data so that this won't be called again unnecessarily
    this.props.onInitialized()
  }

  render() {
    return (
      <div >
        <div
          id="graph"
          style={{
            height: this.props.dimensions.get('height'),
            width: this.props.dimensions.get('width')
          }}
        />
      </div>
    )
  }
}

Graph.propTypes = {
  storyData: PropTypes.object,
  onInitialized: PropTypes.func,
  isListening: PropTypes.bool,
  onStoryUpdate: PropTypes.func,
  dimensions: PropTypes.object.isRequired,
  onResize: PropTypes.func,
  loadedData: PropTypes.object,
  nodeSize: PropTypes.object,
  nodeCounter: PropTypes.number,
  linkCounter: PropTypes.number,
  mousedownNode: PropTypes.object,
  mousedownLink: PropTypes.object,
  linkingNode: PropTypes.object,
  selectedNode: PropTypes.object,
  selectedLink: PropTypes.object,
  onSelectedLinkUpdate: PropTypes.func,
  onSelectedNodeUpdate: PropTypes.func,
  onMousedownNodeUpdate: PropTypes.func,
  onMousedownLinkUpdate: PropTypes.func,
  onNodeAdded: PropTypes.func,
  onLinkAdded: PropTypes.func,
  onLinkingNodeChange: PropTypes.func,
  createDefaultStructure: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  loadedData: getLoadedStoryData(),
  storyData: getCurrentData(),
  selectedNode: getSelectedNode(),
  selectedLink: getSelectedLink(),
  isListening: isListening(),
  dimensions: getDimensions(),
  nodeCounter: getNodeCount(),
  linkCounter: getLinkCount(),
  linkingNode: getLinkingNode(),
  mousedownNode: getMousedownNode(),
  mousedownLink: getMousedownLink(),
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
    onSelectedLinkUpdate: linkId => {
      dispatch(setSelectedLink(linkId))
    },
    onResize: dimensions => {
      dispatch(setDimensions(dimensions))
    },
    onNodeAdded: () => {
      dispatch(incrementNodeCounter())
    },
    onLinkAdded: () => {
      dispatch(incrementLinkCounter())
    },
    onLinkingNodeChange: node => {
      dispatch(setLinkingNode(node))
    },
    onMousedownNodeUpdate: node => {
      dispatch(setMousedownNode(node))
    },
    onMousedownLinkUpdate: link => {
      dispatch(setMousedownLink(link))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
