import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import DebounceInput from 'react-debounce-input'

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ContentRemoveCircle from 'material-ui/lib/svg-icons/content/remove-circle';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import Brightness1 from 'material-ui/lib/svg-icons/image/brightness-1';

import FloatingLabelInput from './../components/form_elements/floating_label_input/floating_label_input'
import TextField from 'material-ui/lib/text-field';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import SelectField from 'material-ui/lib/select-field';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import MenuItem from 'material-ui/lib/menus/menu-item';

import asdf from './../styles/pages/new_toe.scss';
import Css from './../styles/pages/add_edit_toe.scss';


const companiesAssignedButtonStyles = {margin:'8px'}
const companiesAssignedPaperStyles = {display:'inline-block', margin:'8px', padding:'8px'}


let customerId = '';


injectTapEventPlugin();
var inputStyle = {
	outline: 'none !important',
	border: 'none',
	boxShadow: 'none',
	clear:'left',
	display:'block',
	width: '80%',
}
let AddEditToe = React.createClass({
	getInitialState: function() {

		customerId = '';

		if(typeof this.props.params.customerId != 'undefined'){
			customerId = this.props.params.customerId;
		}

		return {
			customer_id: '',
			editingCustomerInfo: false,
			shortName: '',
			formalName: '',
			industryName: '',
			contactName: '',
			contactEmail: '',
			contactPhone: '',
		}
	},
	componentDidMount() {
		console.log('load data');
		/*
		if(customerId.length > 0){
			$.ajax({
				url: 'http://localhost:5000/v1/toe/'+customerId,
				type: 'GET',
				dataType: 'json',
				success: (data) => {
					data = data[0];
					//console.log(data);
					this.setState({
						dateCreated: data.date_created,
						toe_id: data.toe_id,
						shortName: data.short_name,
						formalName: data.formal_name,
						industryName: data.industry,
						rootDomain: data.root_domain,
						seedHostnames: data.seed_hostnames,
						netblockIntell: data.toe_netblocks
					});
					$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
				}
			});
		}
		*/
	},
	handleShortNameChange(e, cb) { this.setState({shortName: e.target.value}, () => cb()) },
	handleFormalNameChange(e, cb) { this.setState({formalName: e.target.value}, () => cb()) },
	handleIndustryNameChange(e, cb) { this.setState({industryName: e.target.value}, () => cb()) },
	handleContactNameChange(e, cb) { this.setState({contactName: e.target.value}, () => cb()) },
	handleContactEmailChange(e, cb) { this.setState({contactEmail: e.target.value}, () => cb()) },
	handleContactPhoneChange(e, cb) { this.setState({contactPhone: e.target.value}, () => cb()) },

	editCustomerInfo(){
		this.setState({
			editingCustomerInfo: true
		});
	},

	saveCustomerInfo(){
		this.setState({
			editingCustomerInfo: false
		});
	},

	render: function(){


		return (
			<div>
			<Card className="card" style={{position:'relative'}}>
				<CardTitle title={"Manage Customer: " + this.state.shortName}></CardTitle>
				<CardText>
					{ !this.state.editingCustomerInfo ?
						<div>
							<RaisedButton label="Edit" secondary={true} style={{position:'absolute', top:'20px', right:'20px'}} onClick={this.editCustomerInfo}></RaisedButton>
							<p>Formal Name: <strong>{this.state.formalName}</strong></p>
							<p>Short Name: <strong>{this.state.shortName}</strong></p>
							<p>Industry Name: <strong>{this.state.industryName}</strong></p>
							<hr/>
							<p>Contact Name: <strong>{this.state.contactName}</strong></p>
							<p>Contact Email: <strong>{this.state.contactEmail}</strong></p>
							<p>Contact Phone: <strong>{this.state.contactPhone}</strong></p>
						</div>
					:null}
					{ this.state.editingCustomerInfo ?
						<div>
							<RaisedButton label="Save" secondary={true} style={{position:'absolute', top:'20px', right:'20px'}} onClick={this.saveCustomerInfo}></RaisedButton>
							<FloatingLabelInput label="Short Name" value={this.state.shortName} wrapperClassName={((this.state.shortName.length > 0) ? 'active' : '')} onChange={this.handleShortNameChange} placeholder="Short Name" isDisabled={false} />
							<FloatingLabelInput label="Formal Name" value={this.state.formalName} wrapperClassName={((this.state.formalName.length > 0) ? 'active' : '')} onChange={this.handleFormalNameChange} placeholder="Formal Name" isDisabled={false} />
							<FloatingLabelInput label="Industry Name" value={this.state.industryName} wrapperClassName={((this.state.industryName.length > 0) ? 'active' : '')} onChange={this.handleIndustryNameChange} placeholder="Industry Name" isDisabled={false} />
							<br/><br/>
							<hr/>
							<FloatingLabelInput label="Contact Name" value={this.state.contactName} wrapperClassName={((this.state.contactName.length > 0) ? 'active' : '')} onChange={this.handleContactNameChange} placeholder="Contact Name" isDisabled={false} />
							<FloatingLabelInput label="Contact Email" value={this.state.contactEmail} wrapperClassName={((this.state.contactEmail.length > 0) ? 'active' : '')} onChange={this.handleContactEmailChange} placeholder="Contact Email" isDisabled={false} />
							<FloatingLabelInput label="Contact Phone" value={this.state.contactPhone} wrapperClassName={((this.state.contactPhone.length > 0) ? 'active' : '')} onChange={this.handleContactPhoneChange} placeholder="Contact Phone" isDisabled={false} />
					</div>
					:null}
				</CardText>
			</Card>
			<Card className="card">
				<CardTitle title="TOE Subscriptions"></CardTitle>
				<CardText>
					asdfasdf
				</CardText>
			</Card>
			</div>
		)
	}
})
module.exports = AddEditToe;
