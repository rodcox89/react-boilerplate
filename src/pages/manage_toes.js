import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import DebounceInput from 'react-debounce-input';
import Spinner from 'react-spinkit';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/circular-progress';
import SoftwarePatchingRowDataSyles from './../components/table/row-data.css'

import LoaderCSS from './../styles/loader.scss'

//import AnalysesCSS from './../styles/pages/analyses.scss'

let ManageToes = React.createClass({
getInitialState: function(){
	return {
		fixedHeader: true,
		tableStyle: {
			display: 'none',
		},
		mounted: false,
		spinnerStyle: {
			display: 'block'
		},
		loaded: false,
		has_results: true,
		reverse: true,
		search_term: "",
		toes: []
	};
},
componentDidMount() {
	$.ajax({
		url: 'http://localhost:5000/v1/toes',
		type: 'GET',
		dataType: 'json',
		success: (data) => {
			console.log(data);
			this.setState({
				loaded: true,
				has_results: true,
				toes: data
			});
		},
		error: (err) => {
			console.log('api error')
		}
	})
},

handleSort(e) {
	console.log('handleSort clicked');
	console.log(e);
	let reverse = this.state.reverse
	if(reverse === true){
		reverse = false
	}
	else{
		reverse = true
	}
	this.setState({reverse: reverse})
	let analyses = this.state.analyses.analysis
	analyses.sort(this.sort_by(e, reverse, function(a) {return a.toLowerCase()}))
	this.setState({[analyses.analysis]: analyses})
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
	let analyses = this.state.analyses
	analyses.analysis.sort(this.sort_by(e, reverse, parseInt))
	this.setState({analyses: analyses})
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
	console.log(e);
	this.setState({search_term: e.target.value})
	console.log(this.state.search_term);
},

runScan(){
	console.log('WANTED TO RUN A SCAN');
},

render(){

	const tableElements = this.state.toes.map((toe, x) => {

		let searchTerm = this.state.search_term;
		let includeResult = this.state.search_term.length === 0 ? true: false;
		let tempContent = '';

		if (!includeResult) {
			toe.formal_name.includes(searchTerm) ? includeResult = true : false
		}

		if(includeResult){
			tempContent =
			<TableRow key={x}>
					<TableRowColumn>{toe.formal_name}</TableRowColumn>
					<TableRowColumn>{toe.date_updated}</TableRowColumn>
					<TableRowColumn>{toe.date_last_scanned}</TableRowColumn>
					<TableRowColumn><Link to={"/add_edit_toe/"+toe.toe_id}><RaisedButton label="Edit" secondary={true}></RaisedButton></Link> &nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp; <RaisedButton onClick={this.runScan} label="Scan" secondary={true}></RaisedButton></TableRowColumn>
			</TableRow>
		}

		return(
			tempContent
		)
	}, this);
	return(
		<div>
		{ !this.state.loaded ?
		<div className="container">
			<Spinner className="spinner" spinnerName='cube-grid'/>
		</div>
		:null}
		{ this.state.loaded & this.state.has_results ?
		<Card>
			<CardTitle title="Manage Toes"/>
			<table className="table table-bordered" style={{width:'100%'}}>
				<thead>
				<tr className="success">
				<TableHeaderColumn><DebounceInput minLenth={3} debounceTimeout={200} hintText="Search Target Name" value={this.state.search_term} onChange={event=>this.handleSearch(event)}/></TableHeaderColumn>
				<TableHeaderColumn colSpan="3" style={{textAlign: 'right' }}><Link to="/add_edit_toe/"><RaisedButton label="Add Toe" secondary={true}></RaisedButton></Link></TableHeaderColumn>
				</tr>
					<tr className="success">
					<TableHeaderColumn onClick={this.handleSort.bind(null, 'formal_name')}>Name <i className="fa fa-sort"></i></TableHeaderColumn>
					<TableHeaderColumn>Last Edit Date <i className="fa fa-sort"></i></TableHeaderColumn>
					<TableHeaderColumn>Last Scan Date <i className="fa fa-sort"></i></TableHeaderColumn>
						<TableHeaderColumn>&nbsp;</TableHeaderColumn>
					</tr>
				</thead>
				<TableBody
					deselectOnClickaway={this.state.deselectOnClickaway}
					showRowHover={false}
					stripedRows={false}
					>
					{ tableElements }
				</TableBody>
			</table>
		</Card>
	:null	}
	{ !this.state.has_results ?
		<div className="container">
			<p className="error-text">No toes! Oh no!</p>
		</div>
		:null}
</div>
	)}

});

module.exports = ManageToes;
