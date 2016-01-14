import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
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


let Analyses = React.createClass({
getInitialState: function(){
  console.log('in analyses');
  return {
    fixedHeader: true,
    analyses: {
      analysis: [],
    },
  };
},
componentDidMount() {
  console.log('component mounted');
  $.ajax({
    url: 'http://0.0.0.0:5000/v1/analyses',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      let analyses_props = this.state.analyses;
      analyses_props['analysis'] = data.analyses
      this.setState({analyses: analyses_props}, () => {console.log('RWAGH', this.state.analyses)});
    },
    error: (err) => {
      console.log('api error')
    }
  })
},
onClick: function(x) {
console.log('clicked')
localStorage.analysis_id = this.state.analyses.analysis[x].analysis_id
  localStorage.unique_key = this.state.analyses.analysis[x].unique_key
},

render(){
  const tableElements = this.state.analyses.analysis.map((analysis, x) => {
    return(

      <TableRow key={x}>
          <TableRowColumn>{analysis.analysis_id}</TableRowColumn>
          <TableRowColumn>{analysis.analyst_edit_analyzed_entity_name}</TableRowColumn>
          <TableRowColumn><Link to="/software_patching" onClick={this.onClick.bind(this, x)}  ><RaisedButton  label="Software Patching" default={true} /></Link></TableRowColumn>
          <TableRowColumn><Link to="/web_app_security" onClick={this.onClick.bind(this, x)}  ><RaisedButton  label="Web App Security" default={true} /></Link></TableRowColumn>
          <TableRowColumn><Link to="/web_encryption" onClick={this.onClick.bind(this, x)}  ><RaisedButton  label="Web Encryption" default={true} /></Link></TableRowColumn>
          <TableRowColumn><Link to="/threat_intell" onClick={this.onClick.bind(this, x)}  ><RaisedButton  label="Threat Intell" default={true} /></Link></TableRowColumn>
          <TableRowColumn><Link to="/defensibility" onClick={this.onClick.bind(this, x)}  ><RaisedButton  label="Defensibility" default={true} /></Link></TableRowColumn>
          <TableRowColumn><Link to="/dns_security" onClick={this.onClick.bind(this, x)}  ><RaisedButton  label="DNS" default={true} /></Link></TableRowColumn>
      </TableRow>
    )
  }, this);
  return(
    <Table
      height={this.state.height}
      fixedHeader={this.state.fixedHeader}
      fixedFooter={this.state.fixedFooter}
      selectable={this.state.selectable}
      multiSelectable={this.state.multiSelectable}
      onRowSelection={this._onRowSelection}>
      <TableHeader enableSelectAll={this.state.enableSelectAll}>
        <TableRow>
          <TableHeaderColumn tooltip='Analysis ID'>Analysis ID</TableHeaderColumn>
          <TableHeaderColumn tooltip='Target'>Target</TableHeaderColumn>
          <TableHeaderColumn colSpan="5" style={{textAlign: 'center' }} tooltip='Security Domains'>Security Domains</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        deselectOnClickaway={this.state.deselectOnClickaway}
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

  )}

});

module.exports = Analyses;
