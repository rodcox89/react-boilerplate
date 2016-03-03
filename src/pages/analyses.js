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

import LoaderCSS from './../styles/loader.scss'

import AnalysesCSS from './../styles/pages/analyses.scss'

let Analyses = React.createClass({
getInitialState: function(){
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
    analyses: []
  };
},
componentWillMount() {

},
componentDidMount() {
  $.ajax({
    url: 'http://ops.riskrecon.net:5000/v1/analyses',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data.length === 0){
        this.setState({
          loaded: true,
          has_results: false,
        })
      }
      else{
        this.setState({
          has_results: true,
          analyses: data,
          loaded: true,
        }), () => {};
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
  this.setState({search_term: e.target.value})
},
onClick: function(x) {

localStorage.analysis_id = this.state.analyses[x].analysis_id
localStorage.unique_key = this.state.analyses[x].unique_key
},
runCounts(e){
  this.setState({loaded: false})
  $.ajax({
    url: 'http://ops.riskrecon.net:5000/v1/netblocks_domainrecords_join/'+e.analysis_id+'/'+e.unique_key,
    dataType: 'json',
    type: 'POST',
    success: (data) => {
      this.setState({
        analyses: data,
        loaded: true
      })
    },
    error: (err) => {

    }
  })

},

render(){

  const tableElements = this.state.analyses.map((analysis, x) => {
    let searchTerm = this.state.search_term;
    let count_link
    let includeResult = this.state.search_term.length === 0 ? true: false;
    if (!includeResult) {
      analysis.analyzed_entity_name.includes(searchTerm) ? includeResult = true : false
    }

      let software_patching_link;
      let web_app_security_link;
      let web_encryption_link;
      let threat_intell_link;
      let defensibility_link;
      let dns_security_link;

      if (includeResult ) {

        if (analysis.analysis_state_opapp_edit_security_domain_software_patching_complete === '1' && analysis.analysis_state_opapp_edit_security_domain_dns_security_complete === '1' && analysis.analysis_state_opapp_edit_security_domain_defensibility_complete === '1' && analysis.analysis_state_opapp_edit_security_domain_threat_intell_complete === '1' && analysis.analysis_state_opapp_edit_security_domain_web_app_security_complete  === '1' && analysis.analysis_state_opapp_edit_security_domain_web_encryption_complete === '1'){
           count_link = <RaisedButton id={analysis.analysis_id} label="Run Counts" onClick={this.runCounts.bind(this, analysis)} primary={true} disabled={false } />
        }
        else {

            if (analysis.analysis_state_opapp_edit_security_domain_software_patching_complete === '1'){
              software_patching_link = <Link to="/software_patching" onClick={this.onClick.bind(this, x)}><RaisedButton className="button-domain-completed" label="Patching" disabled={false} secondary={true}></RaisedButton></Link>
            }
            else{
              software_patching_link = <Link to="/software_patching" onClick={this.onClick.bind(this, x)}><RaisedButton  label="Patching" disabled={false} secondary={true}></RaisedButton></Link>
            }

            if (analysis.analysis_state_opapp_edit_security_domain_web_app_security_complete === '1'){
              web_app_security_link = <Link to="/web_app_security" onClick={this.onClick.bind(this, x)}><RaisedButton className="button-domain-completed" label="App Security" disabled={false} secondary={true}></RaisedButton></Link>
            }
            else{
              web_app_security_link = <Link to="/web_app_security" onClick={this.onClick.bind(this, x)}><RaisedButton  label="App Security" disabled={false} secondary={true}></RaisedButton></Link>

            }

            if (analysis.analysis_state_opapp_edit_security_domain_web_encryption_complete === '1'){
              web_encryption_link = <Link to="/web_encryption" onClick={this.onClick.bind(this, x)}><RaisedButton className="button-domain-completed" label="Encryption" disabled={false} secondary={true}></RaisedButton></Link>
            }
            else{
              web_encryption_link = <Link to="/web_encryption" onClick={this.onClick.bind(this, x)}><RaisedButton  label="Encryption" disabled={false} secondary={true}></RaisedButton></Link>
            }

            if (analysis.analysis_state_opapp_edit_security_domain_threat_intell_complete === '1'){
              threat_intell_link = <Link to="/threat_intell" onClick={this.onClick.bind(this, x)}><RaisedButton className="button-domain-completed" label="Intell" disabled={false} secondary={true}></RaisedButton></Link>
            }
            else{
              threat_intell_link = <Link to="/threat_intell" onClick={this.onClick.bind(this, x)}><RaisedButton  label="Intell" disabled={false} secondary={true}></RaisedButton></Link>
            }

            if (analysis.analysis_state_opapp_edit_security_domain_defensibility_complete === '1'){
              defensibility_link = <Link to="/defensibility" onClick={this.onClick.bind(this, x)}><RaisedButton className="button-domain-completed" label="Defensibility" disabled={false} secondary={true}></RaisedButton></Link>
            }
            else{
              defensibility_link = <Link to="/defensibility" onClick={this.onClick.bind(this, x)}><RaisedButton  label="Defensibility" disabled={false} secondary={true}></RaisedButton></Link>
            }

            if (analysis.analysis_state_opapp_edit_security_domain_dns_security_complete === '1'){
              dns_security_link = <Link to="/dns_security" onClick={this.onClick.bind(this, x)}><RaisedButton className="button-domain-completed" label="DNS" disabled={false} secondary={true}></RaisedButton></Link>
            }
            else{
              dns_security_link = <Link to="/dns_security" onClick={this.onClick.bind(this, x)}><RaisedButton  label="DNS" disabled={false} secondary={true}></RaisedButton></Link>
            }
      }

    return(
      <TableRow key={x}>
          <TableRowColumn>{analysis.analyzed_entity_name }</TableRowColumn>
          <TableRowColumn>{analysis.analysis_scan_completed_ts_utc_str}</TableRowColumn>
          <TableRowColumn>{analysis.analysis_id}</TableRowColumn>
          <TableRowColumn>{count_link || software_patching_link } {web_app_security_link} {web_encryption_link} {threat_intell_link} {defensibility_link} {dns_security_link}</TableRowColumn>
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
      <CardTitle title="Review Findings"/>
      <table className="table table-bordered" style={{width:'100%'}}>
        <thead>
        <tr className="success">
        <TableHeaderColumn><DebounceInput minLenth={3} debounceTimeout={200} hintText="Search Target Name" value={this.state.search_term} onChange={event=>this.handleSearch(event)}/></TableHeaderColumn>

        <TableHeaderColumn></TableHeaderColumn>
        <TableHeaderColumn></TableHeaderColumn>
        <TableHeaderColumn colSpan="6"></TableHeaderColumn>
        </tr>
          <tr className="success">
          <TableHeaderColumn onClick={this.handleSort.bind(null, 'analyzed_entity_name')}>Target <i className="fa fa-sort"></i></TableHeaderColumn>
          <TableHeaderColumn onClick={this.handleNumberSort.bind(null, 'security_domain_software_patching_completed')}>Scan Completed <i className="fa fa-sort"></i></TableHeaderColumn>
            <TableHeaderColumn onClick={this.handleNumberSort.bind(null, 'analysis_id')} tooltip='Analysis ID'>Analysis ID <i className="fa fa-sort"></i></TableHeaderColumn>
            <TableHeaderColumn style={{textAlign: 'center' }} tooltip='Security Domains'>Security Domains</TableHeaderColumn>
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
      <p className="error-text">Sorry! There aren't any analyses to be examined</p>
    </div>
    :null}
</div>
  )}

});

module.exports = Analyses;
