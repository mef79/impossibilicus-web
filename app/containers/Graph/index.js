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
import {
  clearLoadedStory,
  updateStory,
  lockLink,
  unlockLink,
} from 'containers/HomePage/actions'
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
  setShouldRedraw,
  setShouldInitialize,
} from './actions'
import {
  isListening,
  getDimensions,
  getNodeCount,
  getLinkCount,
  getLinkingNode,
  getMousedownNode,
  getMousedownLink,
  getSelectedNodeId,
  getSelectedLinkId,
  getShouldRedraw,
  getShouldInitialize,
} from './selectors'
import { LOCK, WARN } from 'utils/icons'

/* disable linting that is incompatible with d3 */
/* eslint no-unused-vars: 0, no-param-reassign:0, no-var: 0*/
export class Graph extends React.PureComponent {

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
    // if the size of the graph has changed
    if (!this.props.dimensions.equals(nextProps.dimensions)) {
      // then resize the graph with the new dimensions
      this.resizeGraph(nextProps.dimensions.toJS())
    }
  }

  componentDidUpdate() {
    if (this.props.shouldRedraw) {
      this.redraw()
    }
    if (this.props.shouldInitialize) {
      this.initialize()
    }
  }

  onUndoClick = () => {
    var latestAction = this.undoStack.pop()
    this.undoneStack.push(latestAction)
    this.isUndoing = true
    latestAction()
    this.isUndoing = false
    this.redraw()
  }

  onRedoClick = () => {
    var latestAction = this.redoStack.pop()
    this.undoStack.push(this.undoneStack.pop())
    this.isRedoing = true
    latestAction()
    this.isRedoing = false
    this.redraw()
  }

  onUnlockClick = () => {
    this.getNode(this.props.selectedNode.toJS()).fixed = false
    this.props.onSelectedNodeUpdate(null)
    this.redraw()
  }

  onLockLinkClick = () => {
    this.getLink(this.props.selectedLink.toJS()).locked = true
    this.redraw()
  }

  onUnlockLinkClick = () => {
    this.getLink(this.props.selectedLink.toJS()).locked = false
    this.redraw()
  }

  onAddLinkClick = () => {
    this.props.onLinkingNodeChange(this.props.selectedNode)
    this.redraw()
  }

  onAddLinkedNodeClick = () => {
    var x = this.props.selectedNode.get('x') - 100
    var y = this.props.selectedNode.get('y') - 100
    this.insertNewNode(x, y, this.props.selectedNode.toJS())
    this.props.onSelectedNodeUpdate(null)
    this.redraw()
  }

  onDelClick = () => {
    if (this.props.selectedLink) {
      this.deleteLink(this.props.selectedLink.toJS())
    }
    else {
      this.deleteNode(this.props.selectedNode.toJS())
    }
    this.resetSelected()
    this.redraw()
  }

  onAddNodeClick = () => {
    this.insertNewNode(0, 0)
    this.redraw()
  }

  onLinkClick = d => {
    this.props.onMousedownLinkUpdate(d)
    this.props.onSelectedLinkUpdate(d.id)
    this.props.onSelectedNodeUpdate(null)
    this.redraw()
  }

  onNodeMouseDown = d => {
    if (this.props.linkingNode) {
      // create a link from selected to this node
      this.insertNewLink(this.props.linkingNode.toJS(), d)
      this.props.onLinkingNodeChange(null)
      this.props.onMousedownNodeUpdate(null)
      this.props.onSelectedNodeUpdate(null)
    }
    else {
      this.props.onSelectedNodeUpdate(d.id)
      this.props.onMousedownNodeUpdate(d)
      this.props.onSelectedLinkUpdate(null)
    }
    this.redraw()
  }

  onLinkMouseover() {
    let markerId = '#end-mousedover'
    let otherMarkerId = '#end-selected-mousedover'
    if (this.className.animVal.indexOf('selected') !== -1) {
      markerId = '#end-selected-mousedover'
      otherMarkerId = '#end-mousedover'
    }
    d3.select(this).attr('marker-end', `url(${markerId})`)
    d3.select(markerId)
        .transition().duration(100)
        .attr('refX', 8)
        .attr('markerWidth', 2)
        .attr('markerHeight', 2)
    d3.select(this)
        .transition().duration(100)
        .style('stroke-width', 10)
    d3.select(otherMarkerId)
        .attr('refX', 8)
        .attr('markerWidth', 2)
        .attr('markerHeight', 2)
  }

  onLinkMouseout() {
    let markerId = '#end-mousedover'
    let otherMarkerId = '#end-selected-mousedover'
    if (this.className.animVal.indexOf('selected') !== -1) {
      markerId = '#end-selected-mousedover'
      otherMarkerId = '#end-mousedover'
    }
    d3.select(this)
        .transition().duration(500)
        .style('stroke-width', 2)
    d3.select(markerId)
        .transition().duration(500)
        .attr('refX', 12)
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
    d3.select(this)
        .transition().duration(0).delay(500)
        .attr('marker-end', `url(${markerId})`)
    d3.select(otherMarkerId)
        .attr('refX', 12)
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
  }

  // given a starting point, find the closest point along the perimeter of the
  // given rectangle to that point
  getClosestPointOnRect = (from, rect) => {
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
  getClosestMidpointOnRect = (from, rect) => {
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
  setMotion = () => {
    if (this.props.selectedLink || this.props.selectedNode) {
      this.force.stop()
    }
    else {
      this.force.start()
    }
  }

  // find a node by its index
  getNode = node => this.nodes.find(e => e.id === node.id)

  getLink = link => this.links.find(e => e.id === link.id)

  // insert an already created node
  insertNode = node => {
    this.nodes.push(node)
  }

  // safe way to re-insert links whose nodes may have been deleted in the past
  insertLinks = links => {
    this.links.forEach(link => { this.insertLink(link) })
  }

  insertLink = link => {
    this.links.push(this.createLink(link.source, link.target))
  }

  deleteNode = node => {
    this.removeNode(node)

    // save links that have been deleted so that they can be stored in undo
    var deleted = this.links.filter(link =>
      link.source.id === node.id || link.target.id === node.id)

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
  removeNode = node => {
    this.nodes.splice(this.nodes.indexOf(this.getNode(node)), 1)
  }

  // create and insert a link
  insertNewLink = (source, target) => {
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
  createLink = (source, target) => {
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
  deleteLink = link => {
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

  resetSelected = () => {
    this.props.onSelectedNodeUpdate(null)
    this.props.onSelectedLinkUpdate(null)
    this.props.onLinkingNodeChange(null)
    this.redraw()
  }

  // remove all elements of a given class
  removeElementsByClass = className => {
    var elements = document.getElementsByClassName(className)
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0])
    }
  }

  // disable/gray out the undo button if there's nothing to undo
  updateUndo = () => {
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

  updateStyle = () => {
    // apply style to indicate that the user is currently adding a link
    if (this.props.linkingNode) {
      this.showAddingStyle('adding link')
    }
    else {
      this.showAddingStyle(false)
    }
  }

  showAddingStyle = text => {
    // style to make it v clear that adding a link is what's currently happening
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
  updateInfo = () => {
    const showTooltip = !this.props.linkingNode && !this.dragged &&
      this.should_show_info

    if (this.props.selectedNode) {
      this.fillInfo(this.props.selectedNode.toJS(), true, showTooltip)
    }
    else if (this.props.selectedLink) {
      this.fillInfo(this.props.selectedLink.toJS(), false, showTooltip)
    }
    else {
      this.clearInfo()
    }
  }

  clearInfo = () => {
    this.removeElementsByClass('mf-tooltip')
  }

  fillInfo = (selected, isNode, showTooltip) => {
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
      var nodeButton = this.makeTooltipButton('add', 'node+',
        this.onAddLinkedNodeClick)
      var linkButton = this.makeTooltipButton('add', 'link+',
        this.onAddLinkClick)
      var unlockButton = this.makeTooltipButton(null, 'unlock',
        this.onUnlockClick)
      var lockLinkButton = this.makeTooltipButton(null, 'lock',
        this.onLockLinkClick)
      var unlockLinkButton = this.makeTooltipButton(null, 'unlock',
        this.onUnlockLinkClick)

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
        if (this.props.selectedNode.get('fixed')) {
          div.appendChild(unlockButton)
        }
      }
      // link has a lock on it: add unlock button
      else if (this.props.selectedLink.get('locked')) {
        div.appendChild(unlockLinkButton)
      }
      // link does not have a lock: add lock button
      else {
        div.appendChild(lockLinkButton)
      }
    }
  }

  makeTooltipButton = (extraClass, text, click) => {
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
  redraw = () => {
    this.updateUndo() // set the style/action of the undo button
    this.updateStyle() // update the overall style of the container
    this.setMotion() // pause the graph when some element is selected

    // update the graph's copy of objects from the store
    this.props.storyData.toJS().nodes.forEach(node => {
      if (node.title) {
        this.getNode(node).title = node.title
      }
      if (node.content) {
        this.getNode(node).content = node.content
      }
    })

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
        .attr('transform', d =>
          `translate(${d.midX - 8},${d.midY - 10})scale(.7,.7)`)
    this.lock.exit().remove()

    this.link = this.link.data(this.links, d => d.id)

    this.link.enter().insert('path', '.node')
        .attr('class', 'link')
        .on('click', this.onLinkClick)
        .on('mouseover', this.onLinkMouseover)
        .on('mouseout', this.onLinkMouseout)

    this.link.exit().remove()

    this.link.classed('link_selected', d => {
      if (this.props.selectedLink) {
        return d.id === this.props.selectedLink.get('id')
      }
    }).attr('marker-end', d => {
      let result
      if (this.props.selectedLink) {
        result = d.id === this.props.selectedLink.get('id') ?
          'url(#end-selected-mousedover)' : 'url(#end)'
      }
      else {
        result = 'url(#end)'
      }
      return result
    })

    this.node = this.node.data(this.nodes, d => d.id)

    this.node.enter().insert('rect')
        .attr('class', 'node')
        .attr('height', this.props.nodeSize.height)
        .attr('width', this.props.nodeSize.width)
        .attr('rx', this.props.nodeSize.rx)
        .attr('ry', this.props.nodeSize.ry)
        .style('filter', 'url(#drop-shadow)')
        .on('mousedown', this.onNodeMouseDown)
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

    this.warnBackground = this.warnBackground.data(
      this.nodes.filter(e => !e.title || !e.content), d => d.id)

    this.warnBackground.enter()
        .insert('circle')
        .attr('r', 8)
        .attr('cx', d => d.x + this.props.nodeSize.width / 2 - 0.5)
        .attr('cy', d => d.y - this.props.nodeSize.height / 2 + 3.5)
        .attr('class', 'node-warning-background')

    this.warnBackground.exit().remove()

    this.warn = this.warn.data(this.nodes.filter(e => !e.title || !e.content),
      d => d.id)

    this.warn.enter()
        .insert('path')
        .attr('class', 'node-warning')
        .attr('d', WARN)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('transform', d => `translate(${d.x},${d.y})`)

    this.warn.exit().remove()

    this.nodelabels = this.nodelabels.data(this.nodes, d => d.id)

    this.nodelabels.enter().insert('foreignObject')
        .attr('height', this.props.nodeSize.height - 8)
        .attr('width', this.props.nodeSize.width - 12)
        .on('mousedown', this.onNodeMouseDown)
        .call(this.node_drag)
        // .attr('clip-path', 'url(#clip-path)')
        .attr('x', d => d.x - this.props.nodeSize.width / 2 + 6)
        .attr('y', d => d.y - this.props.nodeSize.height / 2 + 4)
        .attr('class', 'nodelabel')
        .append('xhtml')
        .append('div')
        .attr('style',
          `height:${this.labelHeight}px;width:${this.labelWidth}px;`)
        .html(d => d.title ? `<p>${d.title}</p>` : `<p>${d.id}</p>`)

    this.nodelabels.selectAll('div').html(d =>
      d.title ? `<p>${d.title}</p>` : `<p>${d.id}</p>`)

    this.nodelabels.exit().transition()
        .attr('font-size', '0px')
        .remove()

    this.updateInfo()

    if (this.dragged) {
      this.dragged = false
    }

    this.props.onRedrawn()
  }

  // remove a link from the list
  removeLink = link => {
    this.links.splice(this.links.indexOf(this.getLink(link)), 1)
  }

  resizeGraph = dimensions => {
    var svg = d3.select('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
  }

  distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

  insertNewNode = (x, y, linkedFrom) => {
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
  createNode = (x, y) => {
    var node = { x, y, id: `node-${this.props.nodeCounter}` }
    this.props.onNodeAdded()
    return node
  }

  initialize = () => {
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
    var dragstartPosition = null

    // temporary placeholder to determine whether to show the tooltip
    _this.should_show_info = true

    // whether or not we are in the 'undoing'/'redoing' state
    _this.isUndoing = false
    _this.isRedoing = false

    // positioning of the warning based on the size of the node
    _this.warnOffset = {
      x: _this.props.nodeSize.width / 2 - 8,
      y: _this.props.nodeSize.height / 2 + 4,
    }

    let initialNodes = _this.props.loadedData.get('nodes')
    let initialLinks = _this.props.loadedData.get('links')

    if (initialNodes) {
      initialNodes = initialNodes.toJS()
    }

    if (initialLinks) {
      initialLinks = initialLinks.toJS()
    }

    // create the initial set of data if nothing is passed in
    if (!initialNodes || initialNodes.length === 0) {
      ({ initialNodes, initialLinks } =
        this.props.createDefaultStructure(this.createNode))
    }

    this.nodes = initialNodes

    initialLinks.forEach(link => {
      link.source = _this.getNode(link.source)
      link.target = _this.getNode(link.target)
    })
    this.links = initialLinks

    const dimensions = _this.props.dimensions.toJS()

    _this.force = d3.layout.force() // create a force layout
        .size([dimensions.width, dimensions.height])
        .nodes(this.nodes)
        .links(this.links)
        .linkDistance(150) // how far the nodes are away from eachother
        .charge(-500) // how strongly the nodes repel eachother
        .on('tick', tick.bind(this)) // call 'tick' function when drawing frames

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
        .on('mouseup', mouseup)
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

    defs.selectAll('defs').append('marker')
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

    defs.selectAll('defs').append('marker')
        .data(['end', 'end-selected'])
        .enter()
        .append('svg:marker')
        .attr('id', d => `${d}-mousedover`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 0)
        .attr('refY', 0)
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('orient', 'auto')
        .attr('class', d => `${d}-mousedover`)
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', d => d === 'end-selected' ? '#ff7f0e' : '#555555')

    var clipPath = defs.append('clipPath')
        .attr('id', 'clip-path')
        .append('rect')
        .attr('width', this.props.nodeSize.width - 12)
        .attr('height', 30)

    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    var filter = defs.append('filter')
        .attr('id', 'drop-shadow')
        .attr('y', '-20%')
        .attr('height', '150%')

    // SourceAlpha refers to opacity of graphic that this filter will be applied
    // to convolve that with a Gaussian with standard deviation 3 and store
    // result in blur
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
      container.attr('transform',
        `translate(${d3.event.translate})scale(${d3.event.scale})`)
    }

    function dragStart(d) {
      d3.event.sourceEvent.stopPropagation()
      dragstartPosition = { x: d.x, y: d.y }
      _this.redraw()
      _this.force.stop()
    }

    function dragMove(d) {
      d.px += d3.event.dx
      d.py += d3.event.dy
      d.x += d3.event.dx
      d.y += d3.event.dy
      if (distance(dragstartPosition, { x: d.x, y: d.y }) > 5) {
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
        dragstartPosition = null
        _this.should_show_info = true
      }
      tick()
      _this.force.resume()
      _this.redraw()
    }

    // helper to insure the label is in front of a node and the warning is in
    // front of the warning background by tacking on a position index
    function addIndexToArr(arr, positionIndex) {
      const copied = JSON.parse(JSON.stringify(arr))
      copied.forEach(e => {
        e.positionIndex = positionIndex
      })
      return copied
    }

    _this.node_drag = d3.behavior.drag()
        .on('dragstart', dragStart)
        .on('drag', dragMove)
        .on('dragend', dragEnd)

    _this.link = container.append('g')
        .attr('class', 'link-group')
        .selectAll('path')
        .data(this.links)
        .enter().append('svg:path')
        .on('click', _this.onLinkClick)
        .on('mouseover', _this.onLinkMouseover)
        .on('mouseout', _this.onLinkMouseout)
        .attr('class', d => `link ${d.type}`)
        .attr('marker-end', d =>
          _this.props.selectedLink === d ? 'url(#end-selected)' : 'url(#end)')

    _this.lock = container.append('g')
        .attr('class', 'lock-group')
        .selectAll('path')
        .data(this.links.filter(e => e.locked))
        .enter().append('path')
        .attr('d', LOCK)
        .attr('class', 'link-lock')

    _this.node = container.selectAll('.node')
        .data(addIndexToArr(this.nodes, 0))
        .enter().append('rect')
        .on('mousedown', _this.onNodeMouseDown)
        .attr('width', this.props.nodeSize.width)
        .attr('height', this.props.nodeSize.height)
        .attr('rx', this.props.nodeSize.rx)
        .attr('ry', this.props.nodeSize.ry)
        .attr('x', d => d.x - _this.props.nodeSize.width / 2)
        .attr('y', d => d.y - _this.props.nodeSize.height / 2)
        .attr('class', 'node')
        .style('filter', 'url(#drop-shadow)')
        .call(_this.node_drag)

    _this.warnBackground = container.selectAll('.node-warning-background')
        .data(addIndexToArr(this.nodes.filter(e => !e.title), 1))
        .enter().append('circle')
        .attr('r', 8)
        .attr('cx', d => d.x + this.props.nodeSize.width / 2 - 0.5)
        .attr('cy', d => d.y - this.props.nodeSize.height / 2 + 3.5)
        .attr('class', 'node-warning-background')

    _this.warn = container.selectAll('.node-warning')
        .data(addIndexToArr(this.nodes.filter(e => !e.title), 2))
        .enter().append('path')
        .attr('d', WARN)
        .attr('class', 'node-warning')
        .attr('transform', d =>
            `translate(${d.x + _this.warnOffset.x},${d.y - _this.warnOffset.y}),scale(0.3,0.3)`)

    _this.nodelabels = container.selectAll('.nodelabel')
        .data(addIndexToArr(this.nodes, 4))
        .enter()
        .append('foreignObject')
        .on('mousedown', _this.onNodeMouseDown)
        .attr('height', this.props.nodeSize.height - 8)
        .attr('width', this.props.nodeSize.width - 12)
        // .attr('clip-path', 'url(#clip-path)')
        .attr('x', d => d.x - this.props.nodeSize.width / 2 + 6)
        .attr('y', d => d.y - this.props.nodeSize.height + 4)
        .attr('class', 'nodelabel')
        .call(_this.node_drag)

    /* when loading, we need to reposition the elements within the SVG such that
     * the order is: [
        node-0, node-0 warning-background, node-0 warning, node-0 label,
        node-1, node-1 warning-background, node-1 warning, node-1 label, ...
      ]
      so that all objects that are part of the same node are direct siblings
     */
    const toOrder = '.node, .node-warning, .node-warning-background, .nodelabel'
    container.selectAll(toOrder).sort((a, b) => {
      // push lower-indexed nodes in back, higher to the front
      if (a.id < b.id) {
        return -1
      }
      if (a.id > b.id) {
        return 1
      }

      // positioning elements that are part of the same nodes
      if (a.positionIndex < b.positionIndex) {
        return -1
      }
      return 1
    })

    _this.labelHeight = this.props.nodeSize.height - 8
    _this.labelWidth = this.props.nodeSize.width - 12
    _this.labelStyle =
      `height:${_this.labelHeight}px;width:${_this.labelWidth}px`
    _this.nodelabels.append('xhtml')
        .append('div')
        .attr('style', _this.labelStyle)
        .html(d => d.title ? `<p>${d.title}</p>` : `<p>${d.id}</p>`)

    _this.redraw()


    // indicate there is no element currently being clicked on
    function mouseup() {
      if (!_this.props.mousedownNode && !_this.props.mousedownLink) {
        _this.resetSelected()
      }
      // avoid firing off unnecessary actions
      else {
        _this.props.onMousedownNodeUpdate(null)
        _this.props.onMousedownLinkUpdate(null)
      }
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
          .attr('transform', d =>
            `translate(${d.midX - 8},${d.midY - 10})scale(.7,.7)`)

      // redraw the ndes at their new position
      _this.node.attr('x', d => d.x - _this.props.nodeSize.width / 2)
          .attr('y', d => d.y - _this.props.nodeSize.height / 2)

      _this.nodelabels
          .attr('x', d => d.x - _this.props.nodeSize.width / 2 + 6)
          .attr('y', d => d.y - _this.props.nodeSize.height / 2 + 4)

      _this.warn
          .attr('transform', d =>
            `translate(${d.x + _this.warnOffset.x},${d.y - _this.warnOffset.y}),scale(0.3,0.3)`)

      _this.warnBackground
          .attr('cx', d => d.x + _this.props.nodeSize.width / 2 - 0.5)
          .attr('cy', d => d.y - _this.props.nodeSize.height / 2 + 3.5)
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
  shouldRedraw: PropTypes.bool,
  shouldInitialize: PropTypes.bool,
  onRedrawn: PropTypes.func,
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
  shouldRedraw: getShouldRedraw(),
  shouldInitialize: getShouldInitialize(),
})

export function mapDispatchToProps(dispatch) {
  return {
    onInitialized: () => { // done creating the graph
      dispatch(setShouldInitialize(false))
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
    onRedrawn: () => {
      dispatch(setShouldRedraw(false))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
