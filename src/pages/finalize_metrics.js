import Constants from 'constants'

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

import MetricRow from './../components/table/finalize_report/metric-row';


const FinalizeMetrics = React.createClass({
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
			metrics: [],
			loaded: false,
			has_results: true,
			uniqueId: uniqueId,
			analysisId: analysisId
		}
	},
	componentDidMount: function() {
		$.ajax({
			url: 'http://opsapi.riskrecon.com:5010/v1/report/derived/metrics/' + this.state.analysisId,
			success: (data) => {
				if(data.length > 0){
					this.setState({
						metrics: data,
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
	handleMetricChange(metric, index){
		//let metrics = this.state.metrics;
		//this.setState({[metrics[index]]: metric});
		$.ajax({
			url: 'http://opsapi.riskrecon.com:5010/v1/report/derived/metrics',
			type: 'PUT',
			dataType: 'json',
			headers: {
				'Content-Type':'application/json',
			},
			data: JSON.stringify(metric),
			success: (data) => {
				this.setState({
					metrics: data,
					//metrics: []
				});
			}
		});
	},
	doneMetrics(){
		$.ajax({
			url: 'http://opsapi.riskrecon.com:5010/v1/complete_metrics/'+this.state.analysisId+'/'+this.state.uniqueId,
			type: 'POST',
			//dataType: 'json',
			// headers: {
			// 	'Content-Type':'application/json',
			// },
			// data: JSON.stringify(metric),
			success: (data) => {
				window.location.href= "/#/create_reports";
			},
			error: function () {
			}
		});
	},
	render: function(){
		const tableElements = this.state.metrics.map((metric, x) => {

			return(
				<MetricRow key={x} metric={metric} />
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
							<CardTitle title="Finalize Metrics"/>
							<table className="table table-bordered" style={{width:'100%'}}>
								<thead>
									<tr>
										<TableHeaderColumn>Key</TableHeaderColumn>
										<TableHeaderColumn>Value</TableHeaderColumn>
										<TableHeaderColumn>Notes</TableHeaderColumn>
										<TableHeaderColumn style={{width:'150px'}}>Include in analysis</TableHeaderColumn>
										<TableHeaderColumn></TableHeaderColumn>
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
						<RaisedButton label="Done" secondary={true} onClick={this.doneMetrics} style={{margin:'20px'}} />
					</div>
				:null }
			</div>
		)
	}

})

module.exports = FinalizeMetrics
