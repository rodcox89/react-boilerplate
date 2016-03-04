import Constants from 'constants'

import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import DebounceInput from 'react-debounce-input'

//injectTapEventPlugin();

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import Colors from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import IconSort from 'material-ui/lib/svg-icons/content/sort'
import IconVerified from 'material-ui/lib/svg-icons/action/verified-user'
import IconDelete from 'material-ui/lib/svg-icons/action/delete'
import Popover from 'material-ui/lib/popover/popover'
import RaisedButton from 'material-ui/lib/raised-button';
import Spinner from 'react-spinkit';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';

import LoaderCSS from './../styles/loader.scss'

import TableData from './../components/table/edit_domains/domain-table-data';

const trashStyle = {
  color: Colors.red500,
  // marginRight: 10,
  // marginTop: ,
}
let EditDomains = React.createClass({
  getInitialState: function() {
    return {
      domains: [],
      reverse: true,
      search_term: "",
      has_results: true,
      loaded: false,
    }
  },
  componentDidMount: function() {

    $.ajax({
      url: 'http://opsapi.riskrecon.com:5010/v1/domains/'+localStorage.analysis_id,
      success: (data) => {
        if (data.data.length === 0){
          this.setState({
            has_results: false,
            loaded: true,
          })
					this.handleApproval('auto')
        }
        else{
          this.setState({
            domains: data.data,
            loaded: true,
          })
        }
      }})
    },
    handleOrgChange(org, e, index){
        let domains = this.state.domains
        let domain = this.state.domains[index]
        domain.analyst_edit_registrant_org = e.target.value
        this.setState({[domains[index]]: domain})
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
      let domains = this.state.domains
      domains.sort(this.sort_by(e, reverse, function(a) {return a.toLowerCase()}))
      this.setState({domains: domains})
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
    handleApproval(e){
      $.ajax({
        type: 'PUT',
        url: 'http://opsapi.riskrecon.com:5010/v1/nodes/domainrecords/'+localStorage.analysis_id+'/'+localStorage.unique_key,
        success: (data) => {
          if(e !== 'auto'){
          window.location.href= "/#/sanity_check";
        }
        else{

        }
          }
        })
    },
    handleTrashed(e){
    },
    render: function(){
      return(
        <div>
        { !this.state.loaded ?
        <div className="container">
          <Spinner className="spinner"  spinnerName='cube-grid'/>
        </div>
        :null}
        { this.state.loaded & this.state.has_results ?
        <div>
        <Card>
          <CardTitle title="Edit Domains"/>
          <table className="table table-bordered" id="mytable" >
            <thead>
            <tr>
              <TableHeaderColumn colSpan={3}><DebounceInput minLenth={3} debounceTimeout={200} hintText="Search Target Name" value={this.state.search_term} onChange={event=>this.handleSearch(event)}/></TableHeaderColumn>
              <TableHeaderColumn colSpan={6} style={{textAlign: 'right'}}><p>Does the data from this scan look clean enough to use, or should does this scan have significant errors</p></TableHeaderColumn>
              <TableHeaderColumn colSpan={2}><RaisedButton onClick={this.handleTrashed} secondary={true} ><IconDelete  color={Colors.grey50}/></RaisedButton><RaisedButton primary={true} onClick={this.handleApproval} ><IconVerified  color={Colors.grey50}/></RaisedButton></TableHeaderColumn>
            </tr>
              <tr>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'registrant_name')}>Registrant Name <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_edit_registrant_org')}>Registrant Org <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'registrant_email')}>Registrant Email <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'admin_name')}>Admin Name <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'admin_org')}>Admin Org <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'admin_email')}>Admin Email <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'tech_name')}>Tech Name <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'tech_org')}>Tech Org <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'tech_email')}>Tech Email <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'registrar_abuse_email')}>Abuse Email <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn>&nbsp;</TableHeaderColumn>
              </tr>
            </thead>

              <TableData
                handleOrgChange={this.handleOrgChange}
                domains={this.state.domains}
                searchTerm={this.state.search_term}/>
          </table>
        </Card>
        </div>
        :null  }
        { !this.state.has_results ?
          <div className="container">
            <p className="error-text">Sorry! There are no domains for analysis_id: { localStorage.analysis_id }</p>
          </div>
          :null}

        </div>
      )
    }


});

module.exports = EditDomains
