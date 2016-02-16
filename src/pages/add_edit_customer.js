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
import KeyboardArrowRight from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-right';
import KeyboardArrowLeft from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-left';

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

import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';


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
			showingSubscriptions: true,
			subscriptionsContinuous: [],
			subscriptionsOneTime: [],
			addingSubscription: false,
			tempSubscriptionName: '',
			tempSubscriptionType: '',
			toes: []
		}
	},
	componentDidMount() {
		console.log(customerId);
		if(customerId.length > 0){
			$.ajax({
				url: 'http://localhost:5000/v1/customer/'+customerId,
				type: 'GET',
				dataType: 'json',
				success: (data) => {
					//console.log(data);
					this.setState({
						customer_id: data.customer_id,
						contactEmail: data.contact_email,
						contactName: data.contact_name,
						contactPhone: data.contact_phone,
						formalName: data.formal_name,
						shortName: data.short_name,
						industryName: data.industry
					});
					$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
				}
			});
			$.ajax({
				url: 'http://localhost:5000/v1/customer/relationships/'+customerId,
				type: 'GET',
				dataType: 'json',
				success: (data) => {
					//console.log(data.continuous);
					this.setState({
						subscriptionsContinuous: data.continuous,
						subscriptionsOneTime: data.one_time,
					});
					$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
				}
			});
		}else{
			this.setState({
				editingCustomerInfo: true,
				showingSubscriptions: false
			});
		}
	},
	handleShortNameChange(e, cb) { this.setState({shortName: e.target.value}, () => cb()) },
	handleFormalNameChange(e, cb) { this.setState({formalName: e.target.value}, () => cb()) },
	handleIndustryNameChange(e, cb) { this.setState({industryName: e.target.value}, () => cb()) },
	handleContactNameChange(e, cb) { this.setState({contactName: e.target.value}, () => cb()) },
	handleContactEmailChange(e, cb) { this.setState({contactEmail: e.target.value}, () => cb()) },
	handleContactPhoneChange(e, cb) { this.setState({contactPhone: e.target.value}, () => cb()) },
	handleTempSubscriptionName(e) { this.setState({tempSubscriptionName: e.target.value})},
	handleTempSubscriptionType(e) { this.setState({tempSubscriptionType: e.target.value})},

	editCustomerInfo(){
		this.setState({
			editingCustomerInfo: true
		});
		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	addSaveCustomerInfo(){
		//console.log('save customer info');
		if(customerId.length > 0){
			// EXISTING CUSTOMER
			if(this.state.shortName.length > 0
				&& this.state.formalName.length > 0
				&& this.state.industryName.length > 0
				&& this.state.contactName.length > 0
				&& this.state.contactEmail.length > 0
				&& this.state.contactPhone.length > 0){
					let formattedPostObject = {
						"customer_id": this.state.customer_id,
						"formal_name": this.state.formalName,
						"short_name": this.state.shortName,
						"industry": this.state.industryName,
						"contact_name": this.state.contactName,
						"contact_email": this.state.contactEmail,
						"contact_phone": this.state.contactPhone
					}
					//console.log(formattedPostObject);
					$.ajax({
						url: 'http://localhost:5000/v1/customer',
						type: 'PUT',
						dataType: 'json',
						headers: {
							'Content-Type':'application/json',
						},
						data: JSON.stringify(formattedPostObject),
						success: (data) => {
							//console.log(data);
							this.setState({
								editingCustomerInfo: false
							});
							//window.location.href= "/#/manage_toes";
						}
					});
			}else{
				alert('Please make sure all Customer Information is filled out.');
			}
		}else{
			// NEW CUSTOMER
			if(this.state.shortName.length > 0
				&& this.state.formalName.length > 0
				&& this.state.industryName.length > 0
				&& this.state.contactName.length > 0
				&& this.state.contactEmail.length > 0
				&& this.state.contactPhone.length > 0){
					let formattedPostObject = {
						"formal_name": this.state.formalName,
						"short_name": this.state.shortName,
						"industry": this.state.industryName,
						"contact_name": this.state.contactName,
						"contact_email": this.state.contactEmail,
						"contact_phone": this.state.contactPhone
					}
					//console.log(formattedPostObject);
					$.ajax({
						url: 'http://localhost:5000/v1/customer',
						type: 'POST',
						dataType: 'json',
						headers: {
							'Content-Type':'application/json',
						},
						data: JSON.stringify(formattedPostObject),
						success: (data) => {
							//console.log(data);
							this.setState({
								customer_id: data.customer_id,
							});
							$.ajax({
								url: 'http://localhost:5000/v1/customer/relationships/'+this.state.customer_id,
								type: 'GET',
								dataType: 'json',
								success: (data) => {
									console.log(data);
									this.setState({
										subscriptionsContinuous: data.continuous,
										subscriptionsOneTime: data.one_time,
										showingSubscriptions: true
									});
									$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
								}
							});
						}
					});
			}else{
				alert('Please make sure all Customer Information is filled out.');
			}
			this.setState({
				editingCustomerInfo: false
			});
			$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
		}
	},

	showAddSubscription(){
		$.ajax({
			url: 'http://localhost:5000/v1/customer/toes',
			type: 'GET',
			dataType: 'json',
			success: (data) => {
				//console.log(data);
				let toes = [{'text':'--Select--','id':'-1'}];
				for (var i = 1; i < data.length; i++) {
					toes[i] = {'text':data[i].short_name,'id':data[i].toe_id}
				}

				this.setState({
					toes: toes,
					addingSubscription: true
				});
			}
		});
		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	addSubscription(){
		// console.log('add new subscription');
		// console.log(this.state.tempSubscriptionName);
		// console.log(this.state.tempSubscriptionType);
		if(this.state.tempSubscriptionName.length > 0
			&& this.state.tempSubscriptionType.length > 0){
				let formattedPostObject = {
					"toe_id": this.state.tempSubscriptionName,
					"customer_id": this.state.customer_id,
					"frequency": this.state.tempSubscriptionType
				}
				//console.log(formattedPostObject);
				$.ajax({
					url: 'http://localhost:5000/v1/customer/relationships',
					type: 'POST',
					dataType: 'json',
					headers: {
						'Content-Type':'application/json',
					},
					data: JSON.stringify(formattedPostObject),
					success: (data) => {
						//console.log(this.state.tempSubscriptionType);
						this.setState({
							subscriptionsContinuous: data.continuous,
							subscriptionsOneTime: data.one_time,
							tempSubscriptionType: '',
							addingSubscription: false
							//toes: []
						});
						//this.refs.tempSubscriptionType.value = '';
					}
				});
		}else{
			alert('please select a TOE name and Subscription Type');
		}
	},

	removeSubscription(toe_id){
		$.ajax({
			url: 'http://localhost:5000/v1/customer/relationships/'+this.state.customer_id+'/'+toe_id,
			type: 'DELETE',
			dataType: 'json',
			success: (data) => {
				this.setState({
					subscriptionsContinuous: data.continuous,
					subscriptionsOneTime: data.one_time,
				});
				$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
			}
		});
	},

	switchSubscriptionType(toe_id, frequency){
		let formattedPostObject = {
			"toe_id": toe_id,
			"customer_id": this.state.customer_id,
			"frequency": frequency,
			"is_deleted": 'false'
		}
		console.log(formattedPostObject);
		$.ajax({
			url: 'http://localhost:5000/v1/customer/relationships',
			type: 'PUT',
			dataType: 'json',
			headers: {
				'Content-Type':'application/json',
			},
			data: JSON.stringify(formattedPostObject),
			success: (data) => {
				this.setState({
					subscriptionsContinuous: data.continuous,
					subscriptionsOneTime: data.one_time,
				});
			}
		});
	},

	render: function(){

		const toeSubscriptionContinuousRow = this.state.subscriptionsContinuous.map((subscription, x) => {
			return(
				<TableRow key={x}>
					<TableRowColumn>{subscription.toe_short_name}</TableRowColumn>
					<TableRowColumn>STARTDATE</TableRowColumn>
					<TableRowColumn style={{width:"120px"}}>
						<KeyboardArrowRight onClick={this.switchSubscriptionType.bind(null, subscription.toe_id, 'one_time')} style={{fill:'#8d8c8c',cursor:'pointer'}} />
						<ContentRemoveCircle onClick={this.removeSubscription.bind(null, subscription.toe_id)} className="remove-circle" style={{fill:'#8d8c8c'}} />
					</TableRowColumn>
				</TableRow>
			)
		}, this);

		const toeSubscriptionOneTimeRow = this.state.subscriptionsOneTime.map((subscription, x) => {
			return(
				<TableRow key={x}>
					<TableRowColumn>{subscription.toe_short_name}</TableRowColumn>
					<TableRowColumn>STARTDATE</TableRowColumn>
					<TableRowColumn style={{width:"120px"}}>
						<KeyboardArrowLeft onClick={this.switchSubscriptionType.bind(null, subscription.toe_id, 'continuous')} style={{fill:'#8d8c8c',cursor:'pointer'}} />
						<ContentRemoveCircle onClick={this.removeSubscription.bind(null, subscription.toe_id)} className="remove-circle" style={{fill:'#8d8c8c'}} />
					</TableRowColumn>
				</TableRow>
			)
		}, this);

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
					:
						<div>
							<RaisedButton label="Save" secondary={true} style={{position:'absolute', top:'20px', right:'20px'}} onClick={this.addSaveCustomerInfo}></RaisedButton>
							<FloatingLabelInput label="Short Name" value={this.state.shortName} wrapperClassName={((this.state.shortName.length > 0) ? 'active' : '')} onChange={this.handleShortNameChange} placeholder="Short Name" isDisabled={false} />
							<FloatingLabelInput label="Formal Name" value={this.state.formalName} wrapperClassName={((this.state.formalName.length > 0) ? 'active' : '')} onChange={this.handleFormalNameChange} placeholder="Formal Name" isDisabled={false} />
							<FloatingLabelInput label="Industry Name" value={this.state.industryName} wrapperClassName={((this.state.industryName.length > 0) ? 'active' : '')} onChange={this.handleIndustryNameChange} placeholder="Industry Name" isDisabled={false} />
							<br/><br/>
							<hr/>
							<FloatingLabelInput label="Contact Name" value={this.state.contactName} wrapperClassName={((this.state.contactName.length > 0) ? 'active' : '')} onChange={this.handleContactNameChange} placeholder="Contact Name" isDisabled={false} />
							<FloatingLabelInput label="Contact Email" value={this.state.contactEmail} wrapperClassName={((this.state.contactEmail.length > 0) ? 'active' : '')} onChange={this.handleContactEmailChange} placeholder="Contact Email" isDisabled={false} />
							<FloatingLabelInput label="Contact Phone" value={this.state.contactPhone} wrapperClassName={((this.state.contactPhone.length > 0) ? 'active' : '')} onChange={this.handleContactPhoneChange} placeholder="Contact Phone" isDisabled={false} />
						</div>
					}
				</CardText>
			</Card>
			{ this.state.showingSubscriptions ?
			<Card className="card">
				<CardTitle title="TOE Subscriptions">
					<FloatingActionButton onClick={this.showAddSubscription} style={{fontSize:'16px', position:'absolute', top:'8px', right:'0'}} mini={true}>
						<ContentAdd />
					</FloatingActionButton>
				</CardTitle>
				<CardText>
					{ this.state.addingSubscription ?
						<div className="clearfix" style={{marginBottom:'20px'}}>
							<div style={{width:'40%',float:'left'}}>
								TOE Name<br/>
							<Select2 ref="tempSubscriptionName" id="tempSubscriptionName" multiple={false} data={this.state.toes} onChange={this.handleTempSubscriptionName} />
							</div>
							<div style={{width:'20%',float:'left',marginLeft:'3%'}}>
								Subscription Type<br/>
								<select ref="tempSubscriptionType" id="adding-subscription-type" style={{fontSize:'12px'}} onChange={this.handleTempSubscriptionType}>
									<option value="">-- Select --</option>
									<option value="one_time">One Time</option>
									<option value="continuous">Continuous</option>
								</select>
							</div>
							<div style={{width:'20%',float:'left',marginLeft:'3%',marginTop:'27px'}}>
								<ContentAddCircle className="add-circle" style={{fill:'#689f38'}} onClick={this.addSubscription} />
							</div>
						</div>
					:null}
					<div className="clearfix">
						<div style={{width:'47%',float:'left'}}>
							<strong>Continuous</strong>
							<Table fixedHeader={true}>
								<TableHeader>
									<TableRow>
										<TableHeaderColumn>Name</TableHeaderColumn>
										<TableHeaderColumn>Start Date</TableHeaderColumn>
										<TableHeaderColumn style={{width:"120px"}}>&nbsp;</TableHeaderColumn>
									</TableRow>
								</TableHeader>
								<TableBody>
									{toeSubscriptionContinuousRow}
								</TableBody>
							</Table>
						</div>
						<div style={{width:'47%',float:'right'}}>
							<strong>One Time</strong>
							<Table fixedHeader={true}>
								<TableHeader>
									<TableRow>
										<TableHeaderColumn>Name</TableHeaderColumn>
										<TableHeaderColumn>Start Date</TableHeaderColumn>
										<TableHeaderColumn style={{width:"120px"}}>&nbsp;</TableHeaderColumn>
									</TableRow>
								</TableHeader>
								<TableBody>
									{toeSubscriptionOneTimeRow}
								</TableBody>
							</Table>
						</div>
					</div>
				</CardText>
			</Card>
			:null}
			</div>
		)
	}
})
module.exports = AddEditToe;
