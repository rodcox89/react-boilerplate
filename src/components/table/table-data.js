import React from 'react'
import Row from './row-data'

let TableData = React.createClass({
  getDefaultProps() {
  return {
    findings: [],
  }
},
render() {
  const rows = this.props.findings.map((finding, i) => {
    return(
      <Row finding={finding} key={i} />
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
