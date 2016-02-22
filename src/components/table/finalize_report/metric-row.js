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


let MetricRow = React.createClass({
	getDefaultProps(){
		return {
			isEditing: false,
			key: '',
			index: '',
			metric: {}
		}
	},
	getInitialState(){
		return {
			isEditing: false,
			key: this.props.key,
			index: this.props.index,
			metric: this.props.metric
		}
	},
	handleDataValueChange(e){
		let tempMetric = this.state.metric
		tempMetric['data_value'] = e.target.value
		this.setState({metric: tempMetric});
	},
	handleNotesChange(e){
		let tempMetric = this.state.metric
		tempMetric['analyst_edit_notes'] = e.target.value
		this.setState({metric: tempMetric});
	},
	editMetric(e){
		e.preventDefault()
		this.setState({isEditing: true})
	},
	saveMetric(e){
		e.preventDefault()
		this.props.handleMetricChange(this.state.metric, this.state.index);
		this.setState({isEditing: false})
	},
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
				<TableRowColumn>(({this.state.metric['unique_key']})) {this.state.metric['data_key']}</TableRowColumn>
				<TableRowColumn>

					<textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} defaultValue={this.state.metric['data_value']} onChange={event=>this.debounce(this.handleDataValueChange(event), 200)} />
				</TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.metric['analyst_edit_notes']} onChange={event=>this.debounce(this.handleNotesChange(event), 200)} /></TableRowColumn>
				<TableRowColumn>
					<select style={{fontSize:'12px'}}>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</select>
				</TableRowColumn>
				<TableRowColumn><RaisedButton label="Save" secondary={true} onClick={this.saveMetric} /></TableRowColumn>
			</TableRow>

		}
		else {
			el =
			<TableRow key={this.state.key}>
				<TableRowColumn>(({this.state.metric['unique_key']})) {this.state.metric['data_key']}</TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.metric['data_value']} disabled="disabled" /></TableRowColumn>
				<TableRowColumn><textArea style={{width:'100%',fontSize:'12px',resize:'vertical'}} value={this.state.metric['analyst_edit_notes']} disabled="disabled" /></TableRowColumn>
				<TableRowColumn>
					<select style={{fontSize:'12px'}} disabled="disabled">
						<option value="1">Yes</option>
						<option value="0">No</option>
					</select>
				</TableRowColumn>
				<TableRowColumn><RaisedButton label="Edit" secondary={true} onClick={this.editMetric} /></TableRowColumn>
			</TableRow>
		}
		return(
			el
	)}
});

export default MetricRow;
