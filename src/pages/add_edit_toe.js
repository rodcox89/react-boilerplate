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

import asdf from './../styles/pages/new_toe.scss'
import Css from './../styles/pages/add_edit_toe.scss'


const companiesAssignedButtonStyles = {margin:'8px'}
const companiesAssignedPaperStyles = {display:'inline-block', margin:'8px', padding:'8px'}


let toeId = '';


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

		if(typeof this.props.params.toeId != 'undefined'){
			toeId = this.props.params.toeId;
		}

		return {
			toe_id: '',
			shortName: '',
			formalName: '',
			industryName: '',
			seedHostnames: [],
			addingSeedHostname: false,
			tempAddSeedHostname: '',
			netblockIntell: [],
			addingNetblockIntell: false,
			tempRegistrantOrg: '',
			tempCountry: '',
			tempCidr: '',
			tempStartIp: '',
			tempEndIp: '',
		}
	},
	componentDidMount() {
		console.log(toeId);
		if(toeId.length > 0){
			$.ajax({
				url: 'http://localhost:5000/v1/toe/'+toeId,
				type: 'GET',
				dataType: 'json',
				success: (data) => {
					data = data[0];
					console.log(data);
					this.setState({
						dateCreated: data.date_created,
						toe_id: data.toe_id,
						shortName: data.short_name,
						formalName: data.formal_name,
						industryName: data.industry,
						seedHostnames: data.seed_hostnames,
						netblockIntell: data.toe_netblocks
					});
					$('tbody, tfoot, thead').css('-webkit-transform', 'scale(1)').css('border','none');
					console.log(data);
				}
			});
		}
	},
	handleShortNameChange(e, cb) { this.setState({shortName: e.target.value}, () => cb()) },
	handleFormalNameChange(e, cb) { this.setState({formalName: e.target.value}, () => cb()) },
	handleIndustryNameChange(e, cb) { this.setState({industryName: e.target.value}, () => cb()) },
	handleTempAddSeedHostname(e, cb) { this.setState({tempAddSeedHostname: e.target.value}, () => cb()) },
	handleTempRegistrantOrg(e) { this.setState({tempRegistrantOrg: e.target.value}) },
	handleTempCountry(e) { this.setState({tempCountry: e.target.value}) },
	handleTempCidr(e) { this.setState({tempCidr: e.target.value}) },
	handleTempStartIp(e) { this.setState({tempStartIp: e.target.value}) },
	handleTempEndIp(e) { this.setState({tempEndIp: e.target.value}) },

	refreshDomainIntell(e){
		console.log('WE WANT TO REFRESH DOMAIN INTELL');
	},

	showAddNetblockIntell(e){
		this.setState({
			addingNetblockIntell:true
		});
		$('tbody, tfoot, thead').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	addNetblockIntell(e){

		if(this.state.tempRegistrantOrg.length > 0
			&& this.state.tempCountry.length > 0
			&& this.state.tempCidr.length > 0
			&& this.state.tempStartIp.length > 0
			&& this.state.tempEndIp.length > 0){

			let newRecord = {
				"registrant_org":this.state.tempRegistrantOrg,
				"country":this.state.tempCountry,
				"cidr":this.state.tempCidr,
				"start_ip":this.state.tempStartIp,
				"end_ip":this.state.tempEndIp
			}

			let temp = this.state.netblockIntell;
			temp.unshift(newRecord);

			this.setState({
				netblockIntell: temp
			});

		}

		this.setState({
			tempRegistrantOrg: '',
			tempCountry: '',
			tempCidr: '',
			tempStartIp: '',
			tempEndIp: '',
			addingNetblockIntell: false
		});

		$('tbody, tfoot, thead').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	removeNetblockIntell(e){
		let temp = this.state.netblockIntell;

		temp.splice(e, 1);

		this.setState({
			netblockIntell: temp
		});

		$('tbody, tfoot, thead').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	showAddSeedHostname(e){
		this.setState({
			tempAddSeedHostname: '',
			addingSeedHostname:true
		});
		$('tbody, tfoot, thead').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	addSeedHostnames(e){

		if(this.state.tempAddSeedHostname.length > 0){
			let temp = this.state.seedHostnames;
			temp.unshift([this.state.tempAddSeedHostname]);

			this.setState({
				seedHostnames: temp
			});
		}

		this.setState({
			addingSeedHostname:false
		});
		$('tbody, tfoot, thead').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	removeSeedHostnames(e){
		let temp = this.state.seedHostnames;

		temp.splice(e, 1);

		this.setState({
			seedHostnames: temp
		});
		$('tbody, tfoot, thead').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	addUpdateToe(){
		console.log('update dem toes');

		// check if new or updated TOE
		if(toeId.length > 0){
			//console.log(this.state.dateCreated);
			// updating existing TOE
			let formattedPutObject = {
				//"date_created": this.state.dateCreated,
				"date_created": "2016-02-02 15:02:20.942993",
				"formal_name": this.state.formalName,
				"industry": this.state.industryName,
				"seed_hostnames": this.state.seedHostnames,
				"short_name": this.state.shortName,
				"toe_id": this.state.toe_id,
				"toe_netblocks": this.state.netblockIntell
			}
			console.log(formattedPutObject);
			$.ajax({
				url: 'http://localhost:5000/v1/toe',
				type: 'PUT',
				dataType: 'json',
				headers: {
					'Content-Type':'application/json',
					//'Access-Control-Request-Headers':'null'
				},
				// data: {
				// 	//"date_created": this.state.dateCreated,
				// 	"date_created": "2016-02-02 15:02:20.942993",
				// 	"formal_name": this.state.formalName,
				// 	"industry": this.state.industryName,
				// 	"seed_hostnames": this.state.seedHostnames,
				// 	"short_name": this.state.shortName,
				// 	"toe_id": this.state.toe_id,
				// 	"toe_netblocks": this.state.netblockIntell
				// },
				data: JSON.stringify(formattedPutObject),
				success: (data) => {
					console.log(data);
				}
			});
		}else{
			console.log('NEWTOE');
			let formattedPutObject = {
				//"date_created": this.state.dateCreated,
				//"date_created": "2016-02-02 15:02:20.942993",
				"formal_name": this.state.formalName,
				"industry": this.state.industryName,
				"seed_hostnames": this.state.seedHostnames,
				"short_name": this.state.shortName,
				//"toe_id": this.state.toe_id,
				"toe_netblocks": this.state.netblockIntell
			}
			console.log(formattedPutObject);
			$.ajax({
				url: 'http://localhost:5000/v1/toe',
				type: 'POST',
				dataType: 'json',
				headers: {
					'Content-Type':'application/json',
					//'Access-Control-Request-Headers':'null'
				},
				// data: {
				// 	//"date_created": this.state.dateCreated,
				// 	//"date_created": "2016-02-02 15:02:20.942993",
				// 	"formal_name": this.state.formalName,
				// 	"industry": this.state.industryName,
				// 	"seed_hostnames": this.state.seedHostnames,
				// 	"short_name": this.state.shortName,
				// 	//"toe_id": this.state.toe_id,
				// 	"toe_netblocks": this.state.netblockIntell
				// },
				data: JSON.stringify(formattedPutObject),
				success: (data) => {
					console.log(data);
				}
			});
		}
		// redirect to manage toes page??
	},

	render: function(){

		const seedHostnamesRow = this.state.seedHostnames.map((seedHostname, x) => {
			return(
				<TableRow key={x}>
					<TableRowColumn>{seedHostname}</TableRowColumn>
					<TableRowColumn><ContentRemoveCircle onClick={this.removeSeedHostnames.bind(null, x)} key={x} className="remove-circle" style={{fill:'#8d8c8c'}} /></TableRowColumn>
				</TableRow>
			)
		}, this);

		const netblockIntellRow = this.state.netblockIntell.map((netblockIntell, x) => {
			return(
				<TableRow key={x}>
					<TableRowColumn>{netblockIntell.registrant_org}</TableRowColumn>
					<TableRowColumn>{netblockIntell.country}</TableRowColumn>
					<TableRowColumn style={{textOverflow:'string'}}>{netblockIntell.cidr}</TableRowColumn>
					<TableRowColumn>{netblockIntell.start_ip}</TableRowColumn>
					<TableRowColumn>{netblockIntell.end_ip}</TableRowColumn>
					<TableRowColumn style={{width:"90px"}}><ContentRemoveCircle onClick={this.removeNetblockIntell.bind(null, x)} key={x} className="remove-circle" style={{fill:'#8d8c8c'}} /></TableRowColumn>
				</TableRow>
			)
		}, this);

		return (
			<div style={{marginBottom:'200px'}}>
			<Card className="card">
				<CardTitle title={"Manage TOE: " + this.state.shortName}></CardTitle>
				<CardText>
					<div>Created on <strong>{this.state.dateCreated}</strong></div>
					<FloatingLabelInput label="Short Name" value={this.state.shortName} wrapperClassName={((this.state.shortName.length > 0) ? 'active' : '')} onChange={this.handleShortNameChange} placeholder="Short Name" isDisabled={false} />
					<FloatingLabelInput label="Formal Name" value={this.state.formalName} wrapperClassName={((this.state.formalName.length > 0) ? 'active' : '')} onChange={this.handleFormalNameChange} placeholder="Formal Name" isDisabled={false} />
					<FloatingLabelInput label="Industry Name" value={this.state.industryName} wrapperClassName={((this.state.industryName.length > 0) ? 'active' : '')} onChange={this.handleIndustryNameChange} placeholder="Industry Name" isDisabled={false} />
					<br/><br/>
					<div style={{margin:"8px", fontWeight:'bold'}}>Companies Assigned to this TOE</div>
					<div>
						<Paper style={companiesAssignedPaperStyles} zDepth={1}>COMPANIES ASSIGNED LOGIC HAS NOT BEEN DONE</Paper>
					</div>
				</CardText>
			</Card>
			<Card className="card">
				<CardTitle title="Seed Hostnames">
					<FloatingActionButton onClick={this.showAddSeedHostname} style={{fontSize:'16px', position:'absolute', top:'8px', right:'0'}} mini={true}>
						<ContentAdd />
					</FloatingActionButton>
				</CardTitle>
				<CardText>
					{ this.state.addingSeedHostname ?
						<div className="clearfix">
							<FloatingLabelInput label="Hostname" value={this.state.tempAddSeedHostname} onChange={this.handleTempAddSeedHostname} wrapperClassName={((this.state.tempAddSeedHostname.length > 0) ? 'active' : '')} placeholder="Hostname" isDisabled={false} />
							<RaisedButton label="Add" onClick={this.addSeedHostnames} secondary={true}></RaisedButton>
							<br/><br/>
						</div>
				  :null}
					<div className="clearfix">
						<Table fixedHeader={true}>
							<TableHeader style={{display:'none'}}>
								<TableRow>
									<TableHeaderColumn></TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody>
								{seedHostnamesRow}
							</TableBody>
						</Table>
					</div>
				</CardText>
			</Card>
			<Card className="card">
				<CardTitle title="Netblock Intell">
					<FloatingActionButton onClick={this.showAddNetblockIntell} style={{fontSize:'16px', position:'absolute', top:'8px', right:'0'}} mini={true}>
						<ContentAdd />
					</FloatingActionButton>
				</CardTitle>
				<CardText>
					<Table fixedHeader={true}>
						<TableHeader>
							<TableRow>
								<TableHeaderColumn>Registrant Org</TableHeaderColumn>
								<TableHeaderColumn>Country</TableHeaderColumn>
								<TableHeaderColumn>CIDR</TableHeaderColumn>
								<TableHeaderColumn>Start IP</TableHeaderColumn>
								<TableHeaderColumn>End IP</TableHeaderColumn>
								<TableHeaderColumn>&nbsp;</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ this.state.addingNetblockIntell ?
								<TableRow>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="registrant_org" id="registrant_org" placeholder="Registrant Org" style={{fontSize:'12px'}} onChange={this.handleTempRegistrantOrg} value={this.state.tempRegistrantOrg} /></TableRowColumn>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="country" id="country" placeholder="Country" style={{fontSize:'12px'}} onChange={this.handleTempCountry} value={this.state.tempCountry} /></TableRowColumn>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="cidr" id="cidr" placeholder="CIDR" style={{fontSize:'12px'}} onChange={this.handleTempCidr} value={this.state.tempCidr} /></TableRowColumn>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="start_ip" id="start_ip" placeholder="Start IP" style={{fontSize:'12px'}} onChange={this.handleTempStartIp} value={this.state.tempStartIp} /></TableRowColumn>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="end_ip" id="end_ip" placeholder="End IP" style={{fontSize:'12px'}} onChange={this.handleTempEndIp} value={this.state.tempEndIp} /></TableRowColumn>
									<TableRowColumn><ContentAddCircle className="add-circle" style={{fill:'#689f38'}} onClick={this.addNetblockIntell} /></TableRowColumn>
								</TableRow>
						  :null}
							{netblockIntellRow}
						</TableBody>
					</Table>
				</CardText>
			</Card>
			<Card className="card">
				<CardTitle title="Domain Intell"></CardTitle>
				<CardText>
					<div className="clearfix">
						<strong>Domain Count:</strong> 753 &nbsp;&nbsp;&nbsp;&nbsp;<strong>Last Load Date:</strong> 12/12/2015
						<span className="domain-intel-refresh-link" onClick={this.refreshDomainIntell}>Refresh</span>
					</div>
					<div className="clearfix">
						<div style={{width:'49%', float:'left'}}>
							<Table fixedHeader={true}>
								<TableHeader>
									<TableRow>
										<TableHeaderColumn>Domain</TableHeaderColumn>
										<TableHeaderColumn>Audit Date</TableHeaderColumn>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableRowColumn>asdffd</TableRowColumn>
										<TableRowColumn>John Smith</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn>asdffd</TableRowColumn>
										<TableRowColumn>John Smith</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn>asdffd</TableRowColumn>
										<TableRowColumn>John Smith</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn>asdffd</TableRowColumn>
										<TableRowColumn>John Smith</TableRowColumn>
									</TableRow>
								</TableBody>
							</Table>
						</div>
						<div style={{width:'49%', float:'right'}}>
							<Table fixedHeader={true}>
								<TableHeader>
									<TableRow>
										<TableHeaderColumn>Domain</TableHeaderColumn>
										<TableHeaderColumn>Audit Date</TableHeaderColumn>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableRowColumn>asdffd</TableRowColumn>
										<TableRowColumn>John Smith</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn>asdffd</TableRowColumn>
										<TableRowColumn>John Smith</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn>asdffd</TableRowColumn>
										<TableRowColumn>John Smith</TableRowColumn>
									</TableRow>
									<TableRow>
										<TableRowColumn>asdffd</TableRowColumn>
										<TableRowColumn>John Smith</TableRowColumn>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</div>

				</CardText>
			</Card>
			<div style={{position:'fixed', bottom:'20px', right:'0', width:'200px', background:'#fff', border:'1px solid #E0E0E0', borderRight:'none', padding:'20px'}}>
				<p style={{fontSize:'13px'}}><strong>Note:</strong> Changes will only be applied if you click this button.</p>
				<RaisedButton label="Add/Update TOE" secondary={true} onClick={this.addUpdateToe}></RaisedButton>
			</div>
			</div>
		)
	}
})
module.exports = AddEditToe;
