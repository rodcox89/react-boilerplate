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

import AdministratorRow from './../components/table/administrator-row';


const ReportAdministrator = React.createClass({
	getInitialState: function() {

		return {
			analyses: [],
			loaded: false,
			has_results: true,
		}
	},
	componentDidMount: function() {
		$.ajax({
			url: 'http://ops.riskrecon.net:5000/v1/report_state',
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

			return(
				<AdministratorRow key={x} analysis={analysis} />
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
							<CardTitle title="Report Administrator"/>
							<table className="table table-bordered" style={{width:'100%'}}>
								<thead>
									<tr>
										<TableHeaderColumn>Name</TableHeaderColumn>
										<TableHeaderColumn>Analysis ID</TableHeaderColumn>
										<TableHeaderColumn>Analysis State</TableHeaderColumn>
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
					</div>
				:null }
			</div>
		)
	}

})

module.exports = ReportAdministrator
