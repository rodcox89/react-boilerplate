import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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

import TableData from './../components/table/defensibility/table-data'



let Defensibility = React.createClass({

  getInitialState: function() {
    return {
      findings: [],
      findings_copy: [],
      reverse: true,
      search_term: "",
      loaded: false,
      has_results: true,
    }
  },
  componentDidMount: function() {
    var self = this;
    $.ajax({
      url: 'http://0.0.0.0:5000/v1/findings/defensibility/'+localStorage.analysis_id,
      success: (data) => {
        console.log(data)
        if(data.findings.length === 0){
          this.setState({
            loaded: true,
            has_results: false,
          })
        }
        else{
          this.setState({
              findings: data.findings,
              loaded: true,
              has_results: true,
            }, () => {console.log('RWAGH', this.state.findings)
          })
        }
        this.onSubmit()
      }})
    },

    delete: function(finding, e , index){
      console.log(finding);
      let f = {
        unique_key: finding['unique_key'],
        analysis_id: finding['analysis_id'],
      }
      e.preventDefault()
      $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5000/v1/findings/delete_finding',
      crossDomain: true,
      data: JSON.stringify(f),
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        console.log('success');
        console.log(data);
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
        console.log('error');

      },
    });

    },
    handleStatusChange: function(status, e, index){
      console.log(e.target.value);
      let findings = this.state.findings
      let newfinding = this.state.findings[index]
      newfinding.analyst_status = e.target.value
      this.setState({[findings[index]]: newfinding})
      console.log(findings[index]);
    },
    handleConfidenceChange: function(choice, e, index){
      console.log(e.target.selectedOptions[0].id);
      let findings = this.state.findings
      let newfinding = this.state.findings[index]
      newfinding.analyst_confidence = e.target.selectedOptions[0].id
      this.setState({[findings[index]]: newfinding})
      console.log(findings[index]);
    },
    handleCommentChange: function(comment, e, index){
      console.log(e.target.value);
      let findings = this.state.findings
      let newfinding = this.state.findings[index]
      newfinding.analyst_comments = e.target.value
      this.setState({[findings[index]]: newfinding})
      console.log(findings[index]);
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
      console.log(this.state.search_term);
    },

    onSubmit(e) {
      console.log('submitted');
      $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5000/v1/update_analyses/defensibility/'+localStorage.analysis_id+'/'+localStorage.unique_key,
      crossDomain: true,
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        console.log('success');
        console.log(data);
      },
      error: function () {
        console.log('error');

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
        { this.state.loaded & this.state.has_results?
          <div>
            <h1>Defensibility</h1>
            <TextField hintText="Search" onChange={this.handleSearch}></TextField>
            <div className="table-responsive">
              <table className="table table-bordered" id="mytable" >
                <thead>
                  <tr className="success">
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'security_criteria')}>Security Criteria <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_type')}>Type <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_subtype')}>Subtype <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_display_name_long')}>Name Long <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_data_description')}>Data Description <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_data_value')}>Data Value <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleNumberSort.bind(null,'ip_addr')}>IP <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'host_name')}>Host <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_status')}>Status <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleNumberSort.bind(null,'analyst_confidence')}>Confidence <i className="fa fa-sort"></i></TableHeaderColumn>
                    <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_comments')}>Comments <i className="fa fa-sort" ></i></TableHeaderColumn>
                    <td></td>
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
              <Link to="/analyses"><RaisedButton label="I'm done" secondary={true}/></Link>
          </div>
        :null  }
        { !this.has_results ?
          <div className="container">
            <p className="error-text">Sorry! There are no defensibility findings for analysis_id: { localStorage.analysis_id }</p>
          </div>
        :null}
        </div>
      )
    }
  });




  module.exports = Defensibility;
