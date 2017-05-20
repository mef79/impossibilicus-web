/*
 *
 * StoryGraph
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Graph from 'containers/Graph'
import { createStructuredSelector } from 'reselect'
import { getDimensions } from 'containers/Graph/selectors'

export class StoryGraph extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createDefaultStructure = createNode => {
    const midX = this.props.dimensions.get('width') / 2
    const midY = this.props.dimensions.get('height') / 2
    return {
      initialNodes: [createNode(midX, midY)],
      initialLinks: [],
    }
  }

  render() {
    // size of the nodes
    const nodeSize = {
      width: 100,
      height: 30,
      rx: 5,
      ry: 5
    }
    return (
      <Graph
        nodeSize={nodeSize}
        createDefaultStructure={this.createDefaultStructure}
      />
    )
  }
}

StoryGraph.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dimensions: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  dimensions: getDimensions(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryGraph)
