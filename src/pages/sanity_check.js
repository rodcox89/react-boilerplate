import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import DebounceInput from 'react-debounce-input';
import Spinner from 'react-spinkit';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/circular-progress';
import SoftwarePatchingRowDataSyles from './../components/table/row-data.css'

import SanityCheckCSS from './../styles/pages/sanity_check.scss'
import LoaderCSS from './../styles/loader.scss'
let SanityCheck = React.createClass({
getInitialState: function(){
  return {
    fixedHeader: true,
    reverse: true,
    search_term: "",
    analyses: [],
    loaded: false,
    has_results: true,
  };
},
componentWillMount() {

},
componentDidMount() {
  $.ajax({
    url: 'http://opsapi.riskrecon.com:5010/v1/nodes',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data.length === 0){
        this.setState({
          has_results: false,
          loaded: true,
        })
      }
      else{
        let analyses_props = this.state.analyses;
        this.setState({
          analyses: data,
          loaded: true,
          has_results: true,
        }, () => {});

      }

    },
    error: (err) => {
    }
  })
},
handleSort(e) {
  let reverse = this.state.reverse
  if(reverse === true){
    reverse = false
  }
  else{
    reverse = true
  }
  this.setState({reverse: reverse})
  let analyses = this.state.analyses
  analyses.sort(this.sort_by(e, reverse, function(a) {return a.toLowerCase()}))
  this.setState({[analyses]: analyses})
},
handleNumberSort(e) {
  let reverse = this.state.reverse
  if(reverse === true){
    reverse = false
  }
  else{
    reverse = true
  }
  this.setState({reverse: reverse})
  let analyses = this.state.analyses
  analyses.sort(this.sort_by(e, reverse, parseInt))
  this.setState({analyses: analyses})
},
sort_by(field, reverse, primer) {
  var key = primer ?
    function(x) {return primer(x[field])} :
    function(x) {return x[field]};
  reverse =!reverse ? 1 : -1;
  return function (a, b) {
    return a = key(a), b= key(b), reverse * ((a>b) - (b>a));
  }
},
handleSearch(e){
  this.setState({search_term: e.target.value})
},
onClick: function(analysis) {
localStorage.analysis_id = analysis.analysis_id
localStorage.unique_key = analysis.unique_key
// localStorage.unique_key = this.state.analyses.analysis[x].unique_key
},

render(){
  const tableElements = this.state.analyses.map((analysis, x) => {
    let searchTerm = this.state.search_term;
    let includeResult = this.state.search_term.length === 0 ? true: false;
    let netblocks_button
		let domains_button
    let proceed_analysis
    if (!includeResult) {
      analysis.analyzed_entity_name.includes(searchTerm) ? includeResult = true : false
    }
      // if (includeResult && analysis.state_netblocks_review_completed != 'true') {
    if (includeResult & analysis.analysis_state_opapp_edit_netblocks_review_complete != '1' || analysis.analysis_state_opapp_edit_domainrecords_review_complete !='1') {
        if(analysis.analysis_state_opapp_edit_netblocks_review_complete === '1') {
          netblocks_button = <Link to="/edit_netblocks" onClick={this.onClick.bind(this, analysis)}><RaisedButton  label="Netblocks" className="button-node-completed" default={true}></RaisedButton></Link>
        }
        else {
          netblocks_button = <Link to="/edit_netblocks" onClick={this.onClick.bind(this, analysis)}><RaisedButton  label="Netblocks" disabled={false} secondary={true}></RaisedButton></Link>
        }
        if(analysis.analysis_state_opapp_edit_domainrecords_review_complete === '1') {
          domains_button = <Link to="/edit_domains" onClick={this.onClick.bind(this, analysis)}><RaisedButton  label="Domains" className="button-node-completed"  secondary={true}></RaisedButton></Link>
        }
        else {
          domains_button = <Link to="/edit_domains" onClick={this.onClick.bind(this, analysis)}><RaisedButton  label="Domains" disabled={false} secondary={true}></RaisedButton></Link>
        }





    return(
      <TableRow key={x}>
      <TableRowColumn>{analysis.analyzed_entity_name}</TableRowColumn>
          <TableRowColumn>{analysis.analysis_state_scan_ordered_ts_utc_str}</TableRowColumn>
          <TableRowColumn>{analysis.analysis_state_lambda_export_files_load_dynamo_complete_ts_utc_str}</TableRowColumn>
          <TableRowColumn>{analysis.analysis_id}</TableRowColumn>
          <TableRowColumn></TableRowColumn>
          <TableRowColumn colSpan="2">{netblocks_button} {domains_button}</TableRowColumn>
          <TableRowColumn></TableRowColumn>
      </TableRow>
    )
  }
  }, this);
  return(
    <div>
    { !this.state.loaded ?
    <div className="container">
      <Spinner className="spinner"  spinnerName='cube-grid'/>
    </div>
    :null}
    { this.state.loaded & this.state.has_results?
    <Card>
      <CardTitle title="Sanity Check"/>

        <table className="table table-bordered" id="mytable">
          <thead>
          <tr className="success">
            <TableHeaderColumn colSpan="3"><DebounceInput minLenth={3} debounceTimeout={200} hintText="Search Target Name" value={this.state.search_term} onChange={event=>this.handleSearch(event)}/></TableHeaderColumn>
            <TableHeaderColumn colSpan="5"></TableHeaderColumn>
          </tr>
            <tr className="success">
            <TableHeaderColumn onClick={this.handleSort.bind(null, 'analyzed_entity_name')}>Target <i className="fa fa-sort"></i></TableHeaderColumn>
            <TableHeaderColumn onClick={this.handleNumberSort.bind(null, 'security_domain_software_patching_completed')}>Scan ordered <i className="fa fa-sort"></i></TableHeaderColumn>
            <TableHeaderColumn onClick={this.handleNumberSort.bind(null, 'analysis_state_lambda_export_files_load_dynamo_complete_ts_utc_str')}>Date Arrived in Dynamo <i className="fa fa-sort"></i></TableHeaderColumn>
            <TableHeaderColumn onClick={this.handleNumberSort.bind(null, 'analysis_id')} tooltip='Analysis ID'>Analysis ID <i className="fa fa-sort"></i></TableHeaderColumn>
            <TableHeaderColumn colSpan="4" style={{textAlign: 'center' }} tooltip='Security Domains'>Actions</TableHeaderColumn>
            </tr>
          </thead>
          <TableBody
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={false}
            stripedRows={false}
						displayRowCheckbox={false}
            >

            { tableElements }
          </TableBody>
        </table>
    </Card>
    :null  }
    { !this.state.has_results ?
      <div className="container">
        <p className="error-text">Sorry! There are no reports in this state</p>
      </div>
      :null}
</div>

  )}

});

module.exports = SanityCheck;
