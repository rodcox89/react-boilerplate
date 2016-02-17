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

import TableData from './../components/table/edit_netblocks/netblock-table-data';

const trashStyle = {
  color: Colors.red500,
  // marginRight: 10,
  // marginTop: ,
}
let EditNetblocks = React.createClass({
  getInitialState: function() {
    return {
      netblocks: [],
      reverse: true,
      search_term: "",
      has_results: true,
      loaded: false,
    }
  },
  componentDidMount: function() {

    $.ajax({
      url: 'http://0.0.0.0:5000/v1/netblock/'+localStorage.analysis_id,
      success: (data) => {
        console.log(data)
        if (data.data.length === 0){
          this.setState({
            has_results: false,
            loaded: true,
          })
        }
        else{
          this.setState({
            netblocks: data.data,
            loaded: true,
          })
        }
      }})
    },
    handleCityChange(city, e, index){
        let netblocks = this.state.netblocks
        let netblock = this.state.netblocks[index]
        netblock.analyst_edit_registrant_city = e.target.value
        this.setState({[netblocks[index]]: netblock})
    },
    handleCountryChange(country, e, index){
        let netblocks = this.state.netblocks
        let netblock = this.state.netblocks[index]
        netblock.analyst_edit_registrant_country = e.target.value
        this.setState({[netblocks[index]]: netblock})
    },
    handleStateChange(state, e, index){
        let netblocks = this.state.netblocks
        let netblock = this.state.netblocks[index]
        netblock.analyst_edit_registrant_state = e.target.value
        this.setState({[netblocks[index]]: netblock})
    },
    handleOrgChange(org, e, index){
        let netblocks = this.state.netblocks
        let netblock = this.state.netblocks[index]
        netblock.analyst_edit_registrant_org = e.target.value
        this.setState({[netblocks[index]]: netblock})
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
      let netblocks = this.state.netblocks
      netblocks.sort(this.sort_by(e, reverse, function(a) {return a.toLowerCase()}))
      this.setState({netblocks: netblocks})
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
    handleApproval(e){
      console.log('approved');
      $.ajax({
        type: 'PUT',
        url: 'http://0.0.0.0:5000/v1/completed/netblocks/'+localStorage.analysis_id+'/'+localStorage.unique_key,
        success: (data) => {
          console.log(data)
          }
        })
    },
    handleTrashed(e){
      console.log('trashed');
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
          <CardTitle title="Edit Netblocks"/>
          <table className="table table-bordered" id="mytable" >
            <thead>
            <tr>
              <TableHeaderColumn><DebounceInput minLenth={3} debounceTimeout={200} hintText="Search Target Name" value={this.state.search_term} onChange={event=>this.handleSearch(event)}/></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: 'center'}}></TableHeaderColumn>
              <TableHeaderColumn ></TableHeaderColumn>
              <TableHeaderColumn colSpan={2} style={{textAlign: 'center'}}><p>Does the data from this scan look clean enough to use, or should does this scan have significant errors</p></TableHeaderColumn>
              <TableHeaderColumn><RaisedButton onClick={this.handleTrashed} secondary={true} ><IconDelete  color={Colors.grey50}/></RaisedButton><Link to="/sanity_check" onClick={this.handleApproval}><RaisedButton primary={true}  ><IconVerified  color={Colors.grey50}/></RaisedButton></Link></TableHeaderColumn>
            </tr>
              <tr>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_edit_registrant_org')}>Registrant Org <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_edit_registrant_city')}>Registrant City <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_edit_registrant_state')}>Registrant State <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn onClick={this.handleSort.bind(null,'analyst_edit_registrant_country')}>Registrant Country <i className="fa fa-sort" ></i></TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </tr>
            </thead>

              <TableData
                handleCityChange={this.handleCityChange}
                handleStateChange={this.handleStateChange}
                handleCountryChange={this.handleCountryChange}
                handleOrgChange={this.handleOrgChange}
                netblocks={this.state.netblocks}
                searchTerm={this.state.search_term}/>
          </table>
        </Card>
        </div>
        :null  }
        { !this.has_results ?
          <div className="container">
            <p className="error-text">Sorry! There are no netblocks for analysis_id: { localStorage.analysis_id }</p>
          </div>
          :null}

        </div>
      )
    }


});

module.exports = EditNetblocks
