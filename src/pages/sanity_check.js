import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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

import LoaderCSS from './../styles/loader.scss'
let SanityCheck = React.createClass({
getInitialState: function(){
  console.log('in analyses');
  return {
    fixedHeader: true,
    reverse: true,
    search_term: "",
    analyses: {
      analysis: [],
    },
    loaded: false,
    has_results: true,
  };
},
componentWillMount() {
console.log('will mount');

},
componentDidMount() {
  console.log('did mount');
  console.log('component mounted');
  $.ajax({
    url: 'http://0.0.0.0:5000/v1/analyses',
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
        analyses_props['analysis'] = data.analyses
        this.setState({
          analyses: analyses_props,
          loaded: true
        }, () => {console.log('RWAGH', this.state.analyses)});

      }

    },
    error: (err) => {
      console.log('api error')
    }
  })
},
handleSort(e) {
  console.log('handleSort clicked');
  console.log(e);
  let reverse = this.state.reverse
  if(reverse === true){
    reverse = false
  }
  else{
    reverse = true
  }
  this.setState({reverse: reverse})
  let analyses = this.state.analyses.analysis
  analyses.sort(this.sort_by(e, reverse, function(a) {return a.toLowerCase()}))
  this.setState({[analyses.analysis]: analyses})
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
  analyses.analysis.sort(this.sort_by(e, reverse, parseInt))
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
  console.log(e);
  this.setState({search_term: e.target.value})
  // console.log(this.state.search_term);
},
onClick: function(analysis) {
console.log(analysis);
console.log('clicked')
localStorage.analysis_id = analysis.analysis_id
localStorage.unique_key = analysis.unique_key
// localStorage.unique_key = this.state.analyses.analysis[x].unique_key
},

render(){
  const tableElements = this.state.analyses.analysis.map((analysis, x) => {
    let searchTerm = this.state.search_term;
    let includeResult = this.state.search_term.length === 0 ? true: false;
    let netblocks_button
    let proceed_analysis
    if (!includeResult) {
      analysis.analyst_edit_analyzed_entity_name.includes(searchTerm) ? includeResult = true : false
    }
      // if (includeResult && analysis.state_netblocks_review_completed != 'true') {
    if (includeResult & analysis.analysis_state_netblocks_review_completed != 'true') {
        if(analysis.analysis_state_netblocks_review_completed === 'false') {
          netblocks_button = <RaisedButton  label="Inspect Netblocks" disabled={true} default={true}></RaisedButton>
        }
        else {
          netblocks_button = <Link to="/edit_netblocks" onClick={this.onClick.bind(this, analysis)}><RaisedButton  label="Inspect Netblocks" disabled={false} secondary={true}></RaisedButton></Link>
        }


    return(
      <TableRow key={x}>
      <TableRowColumn>{analysis.analyst_edit_analyzed_entity_name}</TableRowColumn>
          <TableRowColumn>{analysis.analysis_scan_ordered_ts_utc_str}</TableRowColumn>
          <TableRowColumn>{analysis.analysis_scan_completed_ts_utc_str}</TableRowColumn>
          <TableRowColumn>{analysis.analysis_id}</TableRowColumn>
          <TableRowColumn></TableRowColumn>
          <TableRowColumn colSpan="2">{netblocks_button}</TableRowColumn>
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
            <TableHeaderColumn><DebounceInput minLenth={3} debounceTimeout={200} hintText="Search Target Name" value={this.state.search_term} onChange={event=>this.handleSearch(event)}/></TableHeaderColumn>

            <TableHeaderColumn></TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
            <TableHeaderColumn colSpan="5"></TableHeaderColumn>
          </tr>
            <tr className="success">
            <TableHeaderColumn onClick={this.handleSort.bind(null, 'analyst_edit_analyzed_entity_name')}>Target <i className="fa fa-sort"></i></TableHeaderColumn>
            <TableHeaderColumn onClick={this.handleNumberSort.bind(null, 'security_domain_software_patching_completed')}>Scan ordered <i className="fa fa-sort"></i></TableHeaderColumn>
            <TableHeaderColumn onClick={this.handleNumberSort.bind(null, 'security_domain_software_patching_completed')}>Scan Completed <i className="fa fa-sort"></i></TableHeaderColumn>
              <TableHeaderColumn onClick={this.handleNumberSort.bind(null, 'analysis_id')} tooltip='Analysis ID'>Analysis ID <i className="fa fa-sort"></i></TableHeaderColumn>
              <TableHeaderColumn colSpan="4" style={{textAlign: 'center' }} tooltip='Security Domains'>Actions</TableHeaderColumn>
            </tr>
          </thead>
          <TableBody
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={false}
            stripedRows={false}
            >

            { tableElements }
          </TableBody>
        </table>
    </Card>
    :null  }
    { !this.has_results ?
      <div className="container">
        <p className="error-text">Sorry! There are no netblocks to be tested</p>
      </div>
      :null}
</div>

  )}

});

module.exports = SanityCheck;
