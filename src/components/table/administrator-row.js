import Constants from 'constants'

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


let AdministratorRow = React.createClass({
	getDefaultProps(){
		return {
			isEditing: false,
			key: '',
			//index: '',
			analysis: {},
			allowedAnalysisStates: []
		}
	},
	getInitialState(){
		return {
			isEditing: false,
			key: this.props.key,
			//index: this.props.index,
			analysis: this.props.analysis,
			allowedAnalysisStates: ['Sanity Check', 'Nodes', 'Findings', 'Finalize']
		}
	},
	handleAnalysisStateChange(e){
		let tempAnalysis = this.state.analysis
		tempAnalysis['analysis_state'] = e.target.value
		this.setState({analysis: tempAnalysis});
	},
	editAnalysis(e){
		e.preventDefault()
		this.setState({isEditing: true})
	},
	saveAnalysis(e){
		if(Constants.debug){
			console.log(JSON.stringify(this.state.analysis));
		}
		e.preventDefault()
		$.ajax({
			url: Constants.api_base_url + Constants.api_version + '/report_state',
			type: 'PUT',
			dataType: 'json',
			headers: {
				'Content-Type':'application/json',
			},
			data: JSON.stringify(this.state.analysis),
			success: (data) => {
				if(Constants.debug){
					console.log(data);
				}
				this.setState({
					analysis: data[0],
					isEditing: false
				});
			}
		});
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
		const stateOptions = this.state.allowedAnalysisStates.map((analysisState, x) => {
			let optionHtml
			let currentAnalysisStateIndex = this.state.allowedAnalysisStates.indexOf(this.state.analysis['analysis_state']);

			if(x < currentAnalysisStateIndex){
				optionHtml = <option key={x} value={analysisState}>{analysisState}</option>
			}else{
				optionHtml = <option key={x} disabled="disabled" value={analysisState}>{analysisState}</option>
			}

			return optionHtml
		})
		var el
		if(this.state.isEditing){
			el =
			<TableRow key={this.state.key}>
				<TableRowColumn>{this.state.analysis['analyzed_entity_name']}</TableRowColumn>
				<TableRowColumn>{this.state.analysis['analysis_id']}</TableRowColumn>
				<TableRowColumn>
					<select style={{fontSize:'12px'}} value={this.state.analysis['analysis_state']} onChange={event=>this.debounce(this.handleAnalysisStateChange(event), 200)}>
						{stateOptions}
					</select>
				</TableRowColumn>
				<TableRowColumn><RaisedButton label="Save" secondary={true} onClick={this.saveAnalysis} /></TableRowColumn>
			</TableRow>

		}
		else {
			el =
			<TableRow key={this.state.key}>
				<TableRowColumn>{this.state.analysis['analyzed_entity_name']}</TableRowColumn>
				<TableRowColumn>{this.state.analysis['analysis_id']}</TableRowColumn>
				<TableRowColumn>
					<select style={{fontSize:'12px'}} value={this.state.analysis['analysis_state']} disabled="disabled">
						<option value="Sanity Check">Sanity Check</option>
						<option value="Nodes">Nodes</option>
						<option value="Findings">Findings</option>
						<option value="Finalize">Finalize</option>
					</select>
				</TableRowColumn>
				<TableRowColumn><RaisedButton label="Edit" secondary={true} onClick={this.editAnalysis} /></TableRowColumn>
			</TableRow>
		}
		return(
			el
	)}
});

export default AdministratorRow;
