import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

import Domain from './domain-row-data'

let TableData = React.createClass({
  getDefaultProps() {
  return {
    domains: [],
    searchTerm: "",

  }
},
delete(finding, e , index) {
  e.preventDefault()
  this.props.delete(finding, e , index)
},

handleOrgChange(org, e, index){
  this.props.handleOrgChange(org, e, index)
},
onEdit(finding, e , index, input) {
  return true
  // this.props.onEdit(finding, e, index, input)
},
render() {
  const rows = this.props.domains.map((domain, i) => {
    let searchTerm = this.props.searchTerm;
    let includeResult = this.props.searchTerm.length === 0 ? true : false;
    if (!includeResult) {
      domain.registrant_name.includes(searchTerm) ? includeResult = true : false
      domain.analyst_edit_registrant_org.includes(searchTerm) ? includeResult = true : false
      domain.registrant_email.includes(searchTerm) ? includeResult = true : false
      domain.admin_name.includes(searchTerm) ? includeResult = true : false
      domain.admin_org.includes(searchTerm) ? includeResult = true : false
      domain.admin_email.includes(searchTerm) ? includeResult = true : false
      domain.tech_name.includes(searchTerm) ? includeResult = true : false
      domain.tech_org.includes(searchTerm) ? includeResult = true : false
      domain.tech_email.includes(searchTerm) ? includeResult = true : false
      domain.registrar_abuse_email.includes(searchTerm) ? includeResult = true : false
      }
      if (includeResult) {
    return(
      <Domain
      key={i}
      domain={domain}
      onEdit={this.onEdit}
      index={i}
      handleOrgChange={this.handleOrgChange}
      />
      )
    }
    })
return(
  <tbody>{rows}</tbody>
  )
}});
export default TableData;
