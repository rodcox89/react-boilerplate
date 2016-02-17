import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

import Netblock from './netblock-row-data'

let TableData = React.createClass({
  getDefaultProps() {
  return {
    netblocks: [],
    searchTerm: "",

  }
},
delete(finding, e , index) {
  e.preventDefault()
  this.props.delete(finding, e , index)
},

handleCountryChange(country, e, index){
  this.props.handleCountryChange(country, e, index)
},
handleCityChange(city, e, index){
  this.props.handleCityChange(city, e, index)
},
handleStateChange(state, e, index){
  this.props.handleStateChange(state, e, index)
},
handleOrgChange(org, e, index){
  this.props.handleOrgChange(org, e, index)
},
onEdit(finding, e , index, input) {
  console.log('onedit');
  console.log(input);
  return true
  // this.props.onEdit(finding, e, index, input)
},
render() {
  const rows = this.props.netblocks.map((netblock, i) => {
    let searchTerm = this.props.searchTerm;
    let includeResult = this.props.searchTerm.length === 0 ? true : false;
    if (!includeResult) {
      netblock.analyst_edit_registrant_org.includes(searchTerm) ? includeResult = true : false
      netblock.analyst_edit_registrant_city.includes(searchTerm) ? includeResult = true : false
      netblock.analyst_edit_registrant_state.includes(searchTerm) ? includeResult = true : false
      netblock.analyst_edit_registrant_country.includes(searchTerm) ? includeResult = true : false
      netblock.analyst_edit_include_in_analysis.includes(searchTerm) ? includeResult = true : false
      }
      if (includeResult) {
    return(
      <Netblock
      key={i}
      netblock={netblock}
      onEdit={this.onEdit}
      index={i}
      handleCountryChange={this.handleCountryChange}
      handleCityChange={this.handleCityChange}
      handleOrgChange={this.handleOrgChange}
      handleStateChange={this.handleStateChange}
      />
      )
    }
    })
return(
  <tbody>{rows}</tbody>
  )
}});
export default TableData;
