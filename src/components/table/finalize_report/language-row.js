import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import DebounceInput from 'react-debounce-input'
import Griddle from 'griddle-react'
//injectTapEventPlugin();

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import RaisedButton from 'material-ui/lib/raised-button';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';


let LanguageRow = React.createClass({
	getDefaultProps(){
		return {
			isEditing: false,
			key: '',
			//index: '',
			language: {}
		}
	},
	getInitialState(){
		return {
			isEditing: false,
			key: this.props.key,
			//index: this.props.index,
			language: this.props.language
		}
	},
	// handleDataValueChange(e){
	// 	let tempMetric = this.state.metric
	// 	tempMetric['data_value'] = e.target.value
	// 	this.setState({metric: tempMetric});
	// },
	// handleNotesChange(e){
	// 	let tempMetric = this.state.metric
	// 	tempMetric['analyst_edit_notes'] = e.target.value
	// 	this.setState({metric: tempMetric});
	// },
	// handleIncludeInAnalysisChange(e){
	// 	let tempMetric = this.state.metric
	// 	tempMetric['analyst_edit_include_in_analysis'] = e.target.value
	// 	this.setState({metric: tempMetric});
	// },
	// editMetric(e){
	// 	e.preventDefault()
	// 	this.setState({isEditing: true})
	// },
	// saveMetric(e){
	// 	e.preventDefault()
	// 	$.ajax({
	// 		url: 'http://ops.riskrecon.net:5000/v1/report/derived/metrics',
	// 		type: 'PUT',
	// 		dataType: 'json',
	// 		headers: {
	// 			'Content-Type':'application/json',
	// 		},
	// 		data: JSON.stringify(this.state.metric),
	// 		success: (data) => {
	// 			this.setState({
	// 				metric: data,
	// 				isEditing: false
	// 			});
	// 			console.log(data);
	// 		}
	// 	});
	// 	//console.log(this.state.metric);
	// },
	debounce(fn, delay) {
   var timer = null;
   return function () {
     var context = this, args = arguments;
     clearTimeout(timer);
     timer = setTimeout(function () {
       fn.apply(context, args);
     }, delay);
   }
 },
	render: function(){
		var el
		if(this.state.isEditing){
			el =
			<TableRow key={this.state.key}>
				<TableRowColumn>{this.state.language['security_criteria']}</TableRowColumn>
			</TableRow>
		}
		else {
			el =
			<TableRow key={this.state.key}>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.language['security_criteria']} disabled="disabled" /></TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.language['display_name']} disabled="disabled" /></TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.language['language_data_list']} disabled="disabled" /></TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.language['language_long']} disabled="disabled" /></TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.language['language_short']} disabled="disabled" /></TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.language['overall_rating']} disabled="disabled" /></TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.language['overall_rating_numeric']} disabled="disabled" /></TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.language['security_domain']} disabled="disabled" /></TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.language['security_domain_rating']} disabled="disabled" /></TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.language['security_domain_rating_numeric']} disabled="disabled" /></TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.language['short_label']} disabled="disabled" /></TableRowColumn>
			</TableRow>
		}
		return(
			el
	)}
});

export default LanguageRow;
