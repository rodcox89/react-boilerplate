import React from 'react'
import Finding from './row-data'

let TableData = React.createClass({
  getDefaultProps() {
  return {
    findings: [],
    findings_copy: [],
    searchTerm: "",

  }
},
delete(finding, e , index) {
  e.preventDefault()
  this.props.delete(finding, e , index)
},
handleStatusChange(status, e, index) {
  this.props.handleStatusChange(status, e, index)
},
handleConfidenceChange( choice, e, index) {
  this.props.handleConfidenceChange(choice,e, index)
},
handleCommentChange( comment, e, index) {
  this.props.handleCommentChange(comment,e, index)
},
onEdit(finding, e , index, input) {
  return true
  // this.props.onEdit(finding, e, index, input)
},
render() {
  const rows = this.props.findings.map((finding, i) => {
  let searchTerm = this.props.searchTerm;
  let includeResult = this.props.searchTerm.length === 0 ? true : false;
  if (!includeResult) {
    finding.security_criteria.includes(searchTerm) ? includeResult = true : false
    finding.analyst_type.includes(searchTerm) ? includeResult = true : false
    finding.analyst_subtype.includes(searchTerm) ? includeResult = true : false
    finding.analyst_display_name_long.includes(searchTerm) ? includeResult = true : false
    finding.analyst_data_description.includes(searchTerm) ? includeResult = true : false
    finding.analyst_data_value.includes(searchTerm) ? includeResult = true : false
    finding.ip_addr.includes(searchTerm) ? includeResult = true : false
    finding.host_name.includes(searchTerm) ? includeResult = true : false
    finding.analyst_status.includes(searchTerm) ? includeResult = true : false
    finding.analyst_confidence === searchTerm ? includeResult = true : false
    finding.analyst_comments.includes(searchTerm) ? includeResult = true : false
}
if (includeResult) {

        return(
          <Finding finding={finding}
          key={i}
          delete={this.delete}
          handleStatusChange={this.handleStatusChange}
          handleConfidenceChange={this.handleConfidenceChange}
          handleCommentChange={this.handleCommentChange}
          onEdit={this.onEdit}
          index={i} show={this.props.children} />
        )
      }
    })

return(
  <tbody>{rows}</tbody>
  )
}});
export default TableData;
