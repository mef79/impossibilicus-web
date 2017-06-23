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

/* ignore lots of eslint functions because d3 */

import React from 'react'
import HotKeyHandler from 'containers/HotKeyHandler'

import ImportDialog from 'containers/ImportDialog'
import LoadDialog from 'containers/LoadDialog'
import SaveDialog from 'containers/SaveDialog'
import FormPane from 'containers/FormPane'
import NavigationBar from 'components/NavigationBar'
import StoryGraph from 'containers/StoryGraph'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (<div>
      <HotKeyHandler>
        <NavigationBar />
        <div className="container-fluid">
          <div className="row justify-content-around align-self-start">
            <StoryGraph />
            <FormPane />
          </div>
          <ImportDialog />
          <LoadDialog />
          <SaveDialog />
        </div>
      </HotKeyHandler>
    </div>
    )
  }
}

export default HomePage
