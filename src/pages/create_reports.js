import React from 'react'
import ReactDom from 'react-dom'
import {RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import RaisedButton from 'material-ui/lib/raised-button';
import Spinner from 'react-spinkit';
import TableBody from 'material-ui/lib/table/table-body';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';


const CreateReports = React.createClass({
  getInitialState: function() {
    return {
      analyses: [],
      loaded: false,
      has_results: true
    }
  },
  componentDidMount: function() {
    $.ajax({
      url: 'http://0.0.0.0:5000/v1/analyses/reporting',
      success: (data) => {
        if(data.length > 0){
          this.setState({
            analyses: data,
            loaded: true,
            })
        }
        else {
          this.setState({
            loaded: true,
            has_results: false
            })
          }

      },
      error: function () {
        console.log('api error');

      }
      })
  },
  render: function(){
    const tableElements = this.state.analyses.map((analysis, x) => {
    let metricsState
    let ratingsState
    let languageState
    if (analysis.analysis_state_report_derived_metrics_completed){
      metricsState = <RaisedButton  label="Edit" disabled={false} secondary={true}></RaisedButton>
    }
    else{
      metricsState = <p>incomplete</p>
    }
    if (analysis.analysis_state_report_derived_ratings_completed){
      ratingsState = <RaisedButton  label="Edit" disabled={false} secondary={true}></RaisedButton>
    }
    else{
      ratingsState = <p>incomplete</p>
    }
    if (analysis.analysis_state_report_derived_language_completed){
      languageState = <RaisedButton  label="Edit" disabled={false} secondary={true}></RaisedButton>
    }
    else{
      languageState = <p>incomplete</p>
    }

    return(
        <TableRow key={x}>
          <TableRowColumn>{analysis.analyst_edit_analyzed_entity_name}</TableRowColumn>
          <TableRowColumn>{analysis.analysis_id}</TableRowColumn>
          <TableRowColumn>{metricsState}</TableRowColumn>
          <TableRowColumn>{ratingsState}</TableRowColumn>
          <TableRowColumn>{languageState}</TableRowColumn>
        </TableRow>
    )

    }, this)
    return(
      <div>
        { !this.state.loaded ?
          <div className="container">
            <Spinner className="spinner"  spinnerName='cube-grid'/>
          </div>
        :null}
        { this.state.loaded & this.state.has_results ?
          <Card>
            <CardTitle title="Create Reports"/>
            <table className="table table-bordered" style={{width: '100%'}}>
              <thead>
                <tr>
                  <TableHeaderColumn>TOE</TableHeaderColumn>
                  <TableHeaderColumn>Analysis ID</TableHeaderColumn>
                  <TableHeaderColumn>Metrics</TableHeaderColumn>
                  <TableHeaderColumn>Ratings</TableHeaderColumn>
                  <TableHeaderColumn>Language</TableHeaderColumn>

                </tr>
              </thead>
              <TableBody
                showRowHover={false}
                stripedRows={false}
                displayRowCheckbox={false}
                >
                  { tableElements }
              </TableBody>
            </table>
          </Card>
        :null }
      </div>
    )
  }

})

module.exports = CreateReports
