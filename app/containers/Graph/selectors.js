import { createSelector } from 'reselect';

/**
 * Direct selector to the graph state domain
 */
const selectGraphDomain = () => (state) => state.get('graph');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Graph
 */

const makeSelectGraph = () => createSelector(
  selectGraphDomain(),
  (substate) => substate.toJS()
);

export default makeSelectGraph;
export {
  selectGraphDomain,
};
