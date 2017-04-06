/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import * as d3 from 'd3';


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
 
  
  render() { 
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <div id='add-node'>Add node</div>
        <div id='undo'>undo</div>
        <div id='redo'>redo</div>
        <div id='graph'>

        </div>
        <div id='bottom'>
          No element selected
</div>
      </div>
    );
  }
}
