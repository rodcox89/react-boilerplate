import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';



let DnsSecurity = React.createClass({


  getInitialState: function() {
    return {
      findings: [],
      selectable: false,
      displayRowCheckbox: false,
      enableSelectAll: false,
      preScanRows: false,
      row: '',
      col: '',
      cellSelection: {
        row: '',
        col: '',
      },
      postData: [],

    }
  },
  componentDidMount() {
    console.log('component mounted');
    console.log(localStorage.analysis_id);
    $.ajax({
      url: 'http://0.0.0.0:5000/v1/findings/dns_security/'+localStorage.analysis_id,
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        this.setState({findings: data.findings}, () => {console.log('RWAGH', this.state.findings)});
      },
      error: (err) => {
        console.log('api error')
      }
    })
    $(document).on('keydown', function(event) {
   if (event.keyCode == 9) {   //tab pressed
      event.preventDefault(); // stops its action
   }
});
  },
  onClick: function(x) {
    console.log('test');
    localStorage.foo = 'bar'
  },
  handleCellSelection(rowNumber, columnID) {
    console.log(rowNumber, columnID);
    console.log(this.state.findings[rowNumber]);
    let postData = this.state.postData
    console.log(postData);


  },

  onFormChange: function(e){
    console.log('form changed');
    console.log(e.target.value);

  },
  onTextFieldExit: function(e) {
    console.log(e);
    console.log('text field exited');
    return  e
  },


render() {

  const tableElements = this.state.findings.map((finding, x) => {
return(
        <TableRow key={x}>
            <TableRowColumn><TextField
                              defaultValue={finding.security_criteria}
                              onChange={this.onFormChange}
                              onFocus={this.onFormChange}
                            /></TableRowColumn>
            <TableRowColumn><TextField
                              defaultValue={finding.analyst_confidence}
                              onChange={this.onFormChange}
                              onFocus={this.onFormChange}
                            /></TableRowColumn>
            <TableRowColumn><TextField
                              defaultValue={finding.analyst_type}
                              onChange={this.onFormChange}
                              onFocus={this.onFormChange}
                            /></TableRowColumn>
            <TableRowColumn><TextField
                              defaultValue={finding.analyst_subtype}
                              onChange={this.onFormChange}
                              /></TableRowColumn>
            <TableRowColumn><TextField
                              defaultValue={finding.domain_name}
                              onChange={this.onFormChange}
                              /></TableRowColumn>
            <TableRowColumn><TextField
                            defaultValue={finding.analyst_data_value}
                            onChange={this.onFormChange}
                            /></TableRowColumn>
            <TableRowColumn><TextField
                            defaultValue={finding.analyst_status}
                            onChange={this.onFormChange}
                            onBlur={this.onTextFieldExit}
                            /></TableRowColumn>

        </TableRow>
      )
    }, this);
  return (
    <Table
    height={this.state.height}
    onCellClick={this.handleCellSelection}
    fixedHeader={this.state.fixedHeader}
    fixedFooter={this.state.fixedFooter}
    multiSelectable={this.state.multiSelectable}
    selectable={this.state.selectable}
    >


      <TableHeader enableSelectAll={this.state.enableSelectAll}>
        <TableRow>
          <TableHeaderColumn>Criteria</TableHeaderColumn>
          <TableHeaderColumn>Type</TableHeaderColumn>
          <TableHeaderColumn  style={{textAlign: 'center' }}>Subtype</TableHeaderColumn>
          <TableHeaderColumn  style={{textAlign: 'center' }}>Domain Name</TableHeaderColumn>
          <TableHeaderColumn  style={{textAlign: 'center' }} tooltip='Security Domains'>Security Domains</TableHeaderColumn>
          <TableHeaderColumn  style={{textAlign: 'center' }} tooltip='Security Domains'>Security Domains</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={this.state.displayRowCheckbox}
        showRowHover={this.state.showRowHover}
        stripedRows={this.state.stripedRows}>

        { tableElements }
      </TableBody>
      <TableFooter>

        <TableRow>
          <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
          </TableRowColumn>
        </TableRow>
      </TableFooter>
    </Table>
  )
  }

});

module.exports = DnsSecurity;
