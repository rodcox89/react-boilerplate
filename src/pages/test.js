import Constants from 'constants'

import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import RaisedButton from 'material-ui/lib/raised-button';
import { Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
let MyAwesomeReactComponent = React.createClass({

render(){
  return(

    <RaisedButton label="Default" />
  )}

}
)

export default MyAwesomeReactComponent;
