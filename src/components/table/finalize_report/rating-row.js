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


let RatingRow = React.createClass({
	getDefaultProps(){
		return {
			isEditing: false,
			key: '',
			//index: '',
			rating: {}
		}
	},
	getInitialState(){
		return {
			isEditing: false,
			key: this.props.key,
			//index: this.props.index,
			rating: this.props.rating
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
	// 		url: 'http://opsapi.riskrecon.com:5010/v1/report/derived/metrics',
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
	// 		}
	// 	});
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
				<TableRowColumn>{this.state.rating['security_criteria']}</TableRowColumn>
			</TableRow>
		}
		else {
			el =
			<TableRow key={this.state.key}>
				<TableRowColumn>{this.state.rating['security_criteria']}</TableRowColumn>
				<TableRowColumn>{this.state.rating['security_criteria_rating']}</TableRowColumn>
				<TableRowColumn>{this.state.rating['security_criteria_rating_numeric']}</TableRowColumn>
				<TableRowColumn>{this.state.rating['security_domain']}</TableRowColumn>
				<TableRowColumn>{this.state.rating['security_domain_rating_numeric']}</TableRowColumn>
				<TableRowColumn>{this.state.rating['analyst_edit_notes']}</TableRowColumn>
				<TableRowColumn>
					<select style={{fontSize:'12px'}} value={this.state.rating['analyst_edit_include_in_analysis']} disabled="disabled">
						<option value="1">Yes</option>
						<option value="0">No</option>
					</select>
				</TableRowColumn>
			</TableRow>
		}
		return(
			el
	)}
});

export default RatingRow;
