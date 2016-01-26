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

let Analyses = React.createClass({
getInitialState: function(){
  console.log('in analyses');
  return {
    fixedHeader: true,
    tableStyle: {
      display: 'none',
    },
    mounted: false,
    spinnerStyle: {
      display: 'block'
    },
    loaded: false,
    has_results: true,
    reverse: true,
    search_term: "",
    analyses: {
      analysis: [],

    },
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
      if(data.analyses.length === 0){
        this.setState({
          loaded: true,
          has_results: false,
        })
      }
      else{
        let analyses_props = this.state.analyses;
        analyses_props['analysis'] = data.analyses
        this.setState({
          has_results: true,
          analyses: analyses_props,
          loaded: true,
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
onClick: function(x) {

console.log('clicked')
localStorage.analysis_id = this.state.analyses.analysis[x].analysis_id
localStorage.unique_key = this.state.analyses.analysis[x].unique_key
},
runCounts(e){
  console.log('run counts clicked');
  console.log(e.analysis_id);
  $.ajax({
    url: 'http://0.0.0.0:5000/v1/findings/run_counts/'+e.analysis_id,
    type: 'GET',
    success: (data) => {
      console.log(data);
    },
    error: (err) => {
      console.log('api error')
    }
  })

},

render(){

  const tableElements = this.state.analyses.analysis.map((analysis, x) => {
    let searchTerm = this.state.search_term;
    let count_link
    let includeResult = this.state.search_term.length === 0 ? true: false;
    if (!includeResult) {
      analysis.analyst_edit_analyzed_entity_name.includes(searchTerm) ? includeResult = true : false
    }

      let software_patching_link;
      let web_app_security_link;
      let web_encryption_link;
      let threat_intell_link;
      let defensibility_link;
      let dns_security_link;

      if (includeResult && analysis.analysis_state_netblocks_review_completed === 'true') {

        // if (analysis.analysis_state_security_domain_dns_security_completed === 'true' && analysis.analysis_state_security_domain_defensibility_completed === 'true' && analysis.analysis_state_security_domain_threat_intell_completed === 'true' && analysis.analysis_state_security_domain_web_app_security_completed  === 'true' && analysis.analysis_state_security_domain_web_app_security_completed === 'true'){
        //   console.log('this should print');
        //    count_link = <RaisedButton label="Run Counts" onClick={this.runCounts.bind(null, analysis)} primary={true} disabled={false } />
        // }
        // else {
            if (analysis.analysis_state_security_domain_software_patching_completed === 'true'){
                software_patching_link = <RaisedButton  label="Patching" disabled={true} secondary={true}></RaisedButton>
            }
            else{
              software_patching_link = <Link to="/software_patching" onClick={this.onClick.bind(this, x)}><RaisedButton  label="Patching" disabled={false} secondary={true}></RaisedButton></Link>
            }

            if (analysis.analysis_state_security_domain_web_app_security_completed === 'true'){
                web_app_security_link = <RaisedButton  label="App Security" disabled={true} secondary={true}></RaisedButton>
            }
            else{
              web_app_security_link = <Link to="/web_app_security" onClick={this.onClick.bind(this, x)}><RaisedButton  label="App Security" disabled={false} secondary={true}></RaisedButton></Link>

            }

            if (analysis.analysis_state_security_domain_web_encryption_completed === 'true'){
                web_encryption_link = <Link to="/web_encryption" onClick={this.onClick.bind(this, x)}><RaisedButton  label="Encryption" disabled={false} secondary={true}></RaisedButton></Link>
                // web_encryption_link = <RaisedButton  label="Encryption" disabled={true} secondary={true}></RaisedButton>
            }
            else{
              web_encryption_link = <Link to="/web_encryption" onClick={this.onClick.bind(this, x)}><RaisedButton  label="Encryption" disabled={false} secondary={true}></RaisedButton></Link>
            }

            if (analysis.analysis_state_security_domain_threat_intell_completed === 'true'){
                threat_intell_link =  <RaisedButton  label="Intell" disabled={true} secondary={true}></RaisedButton>
            }
            else{
              threat_intell_link = <Link to="/threat_intell" onClick={this.onClick.bind(this, x)}><RaisedButton  label="Intell" disabled={false} secondary={true}></RaisedButton></Link>
            }

            if (analysis.analysis_state_security_domain_defensibility_completed === 'true'){
                defensibility_link = <RaisedButton  label="Defensibility" disabled={true} secondary={true}></RaisedButton>
            }
            else{
              defensibility_link = <Link to="/defensibility" onClick={this.onClick.bind(this, x)}><RaisedButton  label="Defensibility" disabled={false} secondary={true}></RaisedButton></Link>
            }

            if (analysis.analysis_state_security_domain_dns_security_completed === 'true'){
                dns_security_link = <Link to="/dns_security" onClick={this.onClick.bind(this, x)}><RaisedButton  label="DNS" disabled={true} secondary={true}></RaisedButton></Link>
            }
            else{
              dns_security_link = <Link to="/dns_security" onClick={this.onClick.bind(this, x)}><RaisedButton  label="DNS" disabled={false} secondary={true}></RaisedButton></Link>
            }
      // }

    return(
      <TableRow key={x}>
          <TableRowColumn>{analysis.analyst_edit_analyzed_entity_name }</TableRowColumn>
          <TableRowColumn>{analysis.analysis_scan_completed_ts_utc_str}</TableRowColumn>
          <TableRowColumn>{analysis.analysis_id}</TableRowColumn>
          <TableRowColumn>{count_link || software_patching_link }</TableRowColumn>
          <TableRowColumn>{web_app_security_link}</TableRowColumn>
          <TableRowColumn>{web_encryption_link}</TableRowColumn>
          <TableRowColumn>{threat_intell_link}</TableRowColumn>
          <TableRowColumn>{defensibility_link}</TableRowColumn>
          <TableRowColumn>{dns_security_link}</TableRowColumn>
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
    { this.state.loaded & this.state.has_results ?
    <Card>
      <CardTitle title="Analyses"/>
      <table className="table table-bordered" id="mytable">
        <thead>
        <tr className="success">
        <TableHeaderColumn><DebounceInput minLenth={3} debounceTimeout={200} hintText="Search Target Name" value={this.state.search_term} onChange={event=>this.handleSearch(event)}/></TableHeaderColumn>

        <TableHeaderColumn></TableHeaderColumn>
        <TableHeaderColumn></TableHeaderColumn>
        <TableHeaderColumn colSpan="6"></TableHeaderColumn>
        </tr>
          <tr className="success">
          <TableHeaderColumn onClick={this.handleSort.bind(null, 'analyst_edit_analyzed_entity_name')}>Target <i className="fa fa-sort"></i></TableHeaderColumn>
          <TableHeaderColumn onClick={this.handleNumberSort.bind(null, 'security_domain_software_patching_completed')}>Scan Completed <i className="fa fa-sort"></i></TableHeaderColumn>
            <TableHeaderColumn onClick={this.handleNumberSort.bind(null, 'analysis_id')} tooltip='Analysis ID'>Analysis ID <i className="fa fa-sort"></i></TableHeaderColumn>
            <TableHeaderColumn colSpan="6" style={{textAlign: 'center' }} tooltip='Security Domains'>Security Domains</TableHeaderColumn>
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
  { !this.state.has_results ?
    <div className="container">
      <p className="error-text">Sorry! There aren't any analyses to be examined</p>
    </div>
    :null}
</div>
  )}

});

module.exports = Analyses;
