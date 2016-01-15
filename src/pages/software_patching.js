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
import Css from 'styles/findings/findings.css';
import TableData from './../components/table/table-data'
import CircularProgress from 'material-ui/lib/circular-progress';



let SoftwarePatching = React.createClass({

  getInitialState: function() {
    return {
      findings: [],
      submission: [],

    }
  },
  componentWillMount() {
    console.log('componentWillMount');
  },
  componentDidMount() {
    console.log('didMount');
    $.ajax({
      url: 'http://0.0.0.0:5000/v1/findings/software_patching/'+localStorage.analysis_id,
      success: (data) => {
        console.log('success');
        console.log(data);
        var received = true;
        this.setState({findings: data.findings})
        $('#mytable').DataTable({
          paging: false,
          autoWidth: false,
        })
      }})
    },
    handleChange: function(e){
      console.log('shouldnt');

    },

    handleClick: function(e){
      console.log(e);
      console.log($(e.target).attr('data-wtfman'))
      console.log($(e.target).parents('tr').attr('data-id'));
      $(e.target).parents('td').html('<input name="skfd" value="asdf" onChange={this.herpDerp}>')
      // $(e.target).find('input').on('change', function(){
      //     console.log('');
      // });

    },
    deleteFinding: function(finding){
      console.log('delete');
      console.log(finding.index);
      console.log(finding);
      var slicedState = this.state.findings.slice();
      findings[finding.index] = finding.finding;
      let findings = this.state.findings
      slicedState.splice(finding.index,1)
      this.setState({findings: slicedState})

    },
    herpDerp: function(e){
      console.log('holy eff balls it worked');
    },


  render: function(){

    return (
      <form id="net-blocks-form" action="" method="POST">
      <div className="table-responsive">
        <table className="table table-bordered" id="mytable" >
          <thead>
            <tr className="success">
              <td>Security Criteria</td>
              <td>Name Long</td>
              <td>Data Description</td>
              <td className="data-value">Data Value</td>
              <td>Host</td>
              <td>IP</td>
              <td>Status</td>
              <td>Confidence</td>
              <td>Comments</td>
              <td>Action</td>
              <td>Remove</td>
            </tr>
          </thead>
            <TableData findings={this.state.findings} deleteFinding={this.deleteFinding}/>
        </table>
      </div>
      </form>
    )
  }
});




module.exports = SoftwarePatching;
