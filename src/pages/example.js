import Constants from 'constants'

import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';


let ExampleComponent = React.createClass({
  getInitialState: function() {
    return {
      someArray: [],
      someAttribute: ""
    }
  },
  componentDidMount: function() {
    $.ajax({
      url: Constants.api_base_url + Constants.api_version + '/findings/web_encryption/' + localStorage.analysis_id,
      success: (data) => {
          this.setState({
              findings: data.someArray,
              someAttribute: data.someAttribute,
            }, () => {
          })
        }
      })
    },
    render: function(){
      return (
        <p>hello world</p>
      )
    }
});

module.exports = ExampleComponent;
