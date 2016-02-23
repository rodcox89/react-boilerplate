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
			url: 'http://localhost:5000/v1/create_reports',
			success: (data) => {
				if(data.length > 0){
					console.log(data);
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

			}
			})
	},
	render: function(){
		const tableElements = this.state.analyses.map((analysis, x) => {
		let metricsState
		let ratingsState
		let languageState

		switch(analysis.analysis_state_lambda_report_derived_metrics_general_metrics_complete){
			case '-1':
				metricsState = 'Processing...'
			break;
			case '0':
				metricsState = <Link to={"/finalize_metrics/"+analysis.analysis_id}><RaisedButton label="Review" disabled={false} secondary={true}></RaisedButton></Link>
			break;
			case '1':
				metricsState = 'Done'
			break;
		}

		switch(analysis.analysis_state_lambda_report_derived_ratings_complete){
			case '-1':
				ratingsState = 'Processing...'
			break;
			case '0':
				ratingsState = <Link to={"/finalize_ratings/"+analysis.analysis_id}><RaisedButton label="Review" disabled={false} secondary={true}></RaisedButton></Link>
			break;
			case '1':
				ratingsState = 'Done'
			break;
		}

		switch(analysis.analysis_state_lambda_report_derived_language_complete){
			case '-1':
				languageState = 'Processing...'
			break;
			case '0':
				languageState = <Link to={"/finalize_language/"+analysis.analysis_id}><RaisedButton label="Review" disabled={false} secondary={true}></RaisedButton></Link>
			break;
			case '1':
				languageState = 'Done'
			break;
		}

		return(
			<TableRow key={x}>
				<TableRowColumn>{analysis.analyzed_entity_name}</TableRowColumn>
				<TableRowColumn>{analysis.analysis_id}</TableRowColumn>
				<TableRowColumn>{metricsState}</TableRowColumn>
				<TableRowColumn>{ratingsState}</TableRowColumn>
				<TableRowColumn>{languageState}</TableRowColumn>
				<TableRowColumn></TableRowColumn>
			</TableRow>
		)

	}, this)
		return(
			<div>
				{ !this.state.loaded ?
					<div className="container">
						<Spinner className="spinner" spinnerName='cube-grid'/>
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
									<TableHeaderColumn style={{width:'170px'}}>Metrics</TableHeaderColumn>
									<TableHeaderColumn style={{width:'170px'}}>Ratings</TableHeaderColumn>
									<TableHeaderColumn style={{width:'170px'}}>Language</TableHeaderColumn>
									<TableHeaderColumn style={{width:'300px'}}></TableHeaderColumn>
								</tr>
							</thead>
							<TableBody showRowHover={false} stripedRows={false} displayRowCheckbox={false}>
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
