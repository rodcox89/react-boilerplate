import React from 'react'
import Finding from './row-data'

let TableData = React.createClass({
  getDefaultProps() {
  return {
    findings: [],
  }
},
deleteFinding(finding) {
  this.props.deleteFinding(finding)
},
render() {
  const rows = this.props.findings.map((finding, i) => {
    return(
      <Finding finding={finding} key={i} delete={this.deleteFinding} index={i} />
    )
  })
return(
  <tbody>
    {rows}
  </tbody>
  )
}
});
export default TableData;
