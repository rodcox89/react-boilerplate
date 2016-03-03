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

import LanguageRow from './../components/table/finalize_report/language-row';


const FinalizeLanguage = React.createClass({
	getInitialState: function() {

		let analysisId = '';
		let uniqueId = '';

		if(typeof this.props.params.analysisId != 'undefined'){
			analysisId = this.props.params.analysisId;
		}

		if(typeof this.props.params.uniqueId != 'undefined'){
			uniqueId = this.props.params.uniqueId;
		}

		return {
			language: [],
			loaded: false,
			has_results: true,
			uniqueId: uniqueId,
			analysisId: analysisId
		}
	},
	componentDidMount: function() {
		console.log(this.state.analysisId);
		$.ajax({
			url: 'http://ops.riskrecon.net:5000/v1/report/derived/language/' + this.state.analysisId,
			success: (data) => {
				if(data.length > 0){
					console.log(data);
					this.setState({
						language: data,
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
	// handleMetricChange(metric, index){
	// 	//let metrics = this.state.metrics;
	// 	//this.setState({[metrics[index]]: metric});
	// 	//console.log(this.state.metrics);
	// 	//console.log('post updated metric and reshow updated metrics state');
	// 	console.log(metric);
	// 	$.ajax({
	// 		url: 'http://ops.riskrecon.net:5000/v1/report/derived/metrics',
	// 		type: 'PUT',
	// 		dataType: 'json',
	// 		headers: {
	// 			'Content-Type':'application/json',
	// 		},
	// 		data: JSON.stringify(metric),
	// 		success: (data) => {
	// 			this.setState({
	// 				metrics: data,
	// 				//metrics: []
	// 			});
	// 			//console.log(data[index]);
	// 			console.log(data);
	// 		}
	// 	});
	// },
	doneLanguage(){
		// console.log(this.state.analysisId);
		// console.log(this.state.uniqueId);
		$.ajax({
			url: 'http://localhost:5000/v1/complete_ratings/'+this.state.analysisId+'/'+this.state.uniqueId,
			type: 'POST',
			//dataType: 'json',
			// headers: {
			// 	'Content-Type':'application/json',
			// },
			// data: JSON.stringify(metric),
			success: (data) => {
				console.log('sent metrics done');
				console.log(data);
			},
			error: function () {
				console.log('error');
			}
		});
	},
	render: function(){
		const tableElements = this.state.language.map((language, x) => {

			return(
				<LanguageRow key={x} language={language} />
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
					<div>
						<Card>
							<CardTitle title="Finalize Language"/>
							<table className="table table-bordered" style={{width:'100%'}}>
								<thead>
									<tr>
										<TableHeaderColumn>Criteria</TableHeaderColumn>
										<TableHeaderColumn>Display Name</TableHeaderColumn>
										<TableHeaderColumn>Data List</TableHeaderColumn>
										<TableHeaderColumn>Long</TableHeaderColumn>
										<TableHeaderColumn>Short</TableHeaderColumn>
										<TableHeaderColumn>Rating</TableHeaderColumn>
										<TableHeaderColumn>Rating Numeric</TableHeaderColumn>
										<TableHeaderColumn>Domain</TableHeaderColumn>
										<TableHeaderColumn>Domain Rating</TableHeaderColumn>
										<TableHeaderColumn>Domain Rating Numeric</TableHeaderColumn>
										<TableHeaderColumn>Short Label</TableHeaderColumn>
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
						<RaisedButton label="Done" secondary={true} onClick={this.doneLanguage} style={{margin:'20px'}} />
					</div>
				:null }
			</div>
		)
	}

})

module.exports = FinalizeLanguage
