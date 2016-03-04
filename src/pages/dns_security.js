import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

import Spinner from 'react-spinkit';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import Css from 'styles/findings/findings.css';
import LoaderCSS from './../styles/loader.scss'

import TableData from './../components/table/dns_security/table-data'


var no_results
let DnsSecurity = React.createClass({

  getInitialState: function() {
    return {
      findings: [],
      findings_copy: [],
      loaded: false,
      reverse: true,
      search_term: "",
      has_results: true,
    }
  },
  componentDidMount: function() {
    var self = this;
    $.ajax({
      url: 'http://opsapi.riskrecon.com:5010/v1/findings/dns_security/'+localStorage.analysis_id,
      success: (data) => {
        if(data.findings.length === 0){
          no_results = <div className="container"><p className="error-text">Sorry! There are no DNS Security findings for analysis_id: { localStorage.analysis_id }</p></div>
          this.setState({
            loaded: true,
            has_results: false,
          })
          this.onSubmit('auto')
        }
        else{
          this.setState({
              findings: data.findings,
              loaded: true,
              has_results: true,
            }, () => {
          })
        }
      }})
    },

    delete: function(finding, e , index){
      let f = {
        unique_key: finding['unique_key'],
        analysis_id: finding['analysis_id'],
      }
      e.preventDefault()
      $.ajax({
      type: 'DELETE',
      url: 'http://opsapi.riskrecon.com:5010/v1/findings',
      crossDomain: true,
      data: JSON.stringify(f),
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        let findings = this.state.findings
        let newfindings = []
        for (var i = 0; i < this.state.findings.length; ++i) {
          if (!(i === index)) {
            newfindings.push(this.state.findings[i])
          }
        }
        this.setState({findings: newfindings})
      },
      error: function () {

      },
    });

    },
    handleStatusChange: function(status, e, index){
      let findings = this.state.findings
      let newfinding = this.state.findings[index]
      newfinding.analyst_status = e.target.value
      this.setState({[findings[index]]: newfinding})
    },
    handleConfidenceChange: function(choice, e, index){
      let findings = this.state.findings
      let newfinding = this.state.findings[index]
      newfinding.analyst_confidence = e.target.selectedOptions[0].id
      this.setState({[findings[index]]: newfinding})
    },
    handleCommentChange: function(comment, e, index){
      let findings = this.state.findings
      let newfinding = this.state.findings[index]
      newfinding.analyst_comments = e.target.value
      this.setState({[findings[index]]: newfinding})
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
      let findings = this.state.findings
      findings.sort(this.sort_by(e, reverse, function(a) {return a.toLowerCase()}))
      this.setState({findings: findings})
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
      let findings = this.state.findings
      findings.sort(this.sort_by(e, reverse, parseInt))
      this.setState({findings: findings})
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

    onSubmit(e) {
      $.ajax({
      type: 'PUT',
      url: 'http://opsapi.riskrecon.com:5010/v1/analyses/dns_security/'+localStorage.analysis_id+'/'+localStorage.unique_key,
      crossDomain: true,
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        if(e !== 'auto'){
          window.location.href= "/#/analyses";
        }
        else{

        }

      },
      error: function () {

      },
    });


    },

    render: function(){
      return (
        <div>
        { !this.state.loaded ?
          <div className="container">
            <Spinner className="spinner"  spinnerName='cube-grid'/>
          </div>
        :null}
          { this.state.loaded & this.state.has_results ?
          <div>
            <h2>DNS Security</h2>
            <TextField hintText="Search" onChange={this.handleSearch}></TextField>
            <div className="table-responsive">
              <table className="table table-bordered" id="mytable" >
                <thead>
                  <tr className="success" displayBorder={true}>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'security_criteria')}>Security Criteria <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_type')}>Type <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_subtype')}>Subtype <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_display_name_long')}>Name Long <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_data_value')}>Data Value <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null, 'analyst_status')}>Status <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleNumberSort.bind(null,'analyst_confidence')}>Confidence <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_comments')}>Comments <i className="fa fa-sort" ></i></TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                  </tr>
                </thead>
                <TableData
                findings={this.state.findings}
                delete={this.delete}
                handleStatusChange={this.handleStatusChange}
                handleConfidenceChange={this.handleConfidenceChange}
                handleCommentChange={this.handleCommentChange}
                searchTerm={this.state.search_term}
                onEdit={this.onEdit}/>
              </table>
            </div>
              <RaisedButton label="I'm done"  onClick={this.onSubmit.bind(null, localStorage.analysis_id)} secondary={true}/>
          </div>
        :null  }
        {no_results}
        </div>
    )
  }

  });




  module.exports = DnsSecurity;
