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
		return {
			toe_id: '',
			unique_key: '',
			shortName: 'asdfasdf',
			formalName: '',
			industryName: '',
			seedHostnames: [{"name":"Cooper"},{"name":"Claire"},{"name":"Carolyn"},{"name":"Kirsten"},{"name":"Lyons"},{"name":"Ferrell"},{"name":"Allen"}],
			addingSeedHostname: false,
			tempAddSeedHostname: 'tempHostname',
			netblockIntell: [{"registrant_org":"SHOPABOUT","country":"MACRONAUT","cidr":"10.0.0.1/24","start_ip":"10.0.0.1","end_ip":"10.0.0.1"},{"registrant_org":"SUPREMIA","country":"PROTODYNE","cidr":"10.0.0.1/24","start_ip":"10.0.0.1","end_ip":"10.0.0.1"},{"registrant_org":"ZILIDIUM","country":"ZOLAR","cidr":"10.0.0.1/24","start_ip":"10.0.0.1","end_ip":"10.0.0.1"},{"registrant_org":"KINETICUT","country":"LIMAGE","cidr":"10.0.0.1/24","start_ip":"10.0.0.1","end_ip":"10.0.0.1"},{"registrant_org":"SKINSERVE","country":"MARVANE","cidr":"10.0.0.1/24","start_ip":"10.0.0.1","end_ip":"10.0.0.1"},{"registrant_org":"REALYSIS","country":"SOLAREN","cidr":"10.0.0.1/24","start_ip":"10.0.0.1","end_ip":"10.0.0.1"}],
			addingNetblockIntell: false,
			tempRegistrantOrg: '',
			tempCountry: '',
			tempCidr: '',
			tempStartIp: '',
			tempEndIp: '',
		}
		/*
		return {
			vendorName: '',
			entire_company: '',
			part_of_company_bool: true,
			partOfCompanyValue: '',
			partOfCompanyFieldColor: 'grey',
			scanFrequency: 'one_time',
			industrialSegment: 'services_producing',
			industry: 'Accomodation and Food Service'
		}
		*/
	},
	handleShortNameChange(e, cb) { this.setState({shortName: e.target.value}, () => cb()) },
	handleFormalNameChange(e, cb) { this.setState({formalName: e.target.value}, () => cb()) },
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
			temp.unshift({'name':this.state.tempAddSeedHostname});

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

	render: function(){

		const seedHostnamesRow = this.state.seedHostnames.map((seedHostname, x) => {
			return(
				<TableRow key={x}>
					<TableRowColumn>{seedHostname.name}</TableRowColumn>
					<TableRowColumn><ContentRemoveCircle onClick={this.removeSeedHostnames.bind(null, x)} key={x} className="remove-circle" style={{fill:'#8d8c8c'}} /></TableRowColumn>
				</TableRow>
			)
		}, this);

		const netblockIntellRow = this.state.netblockIntell.map((netblockIntell, x) => {
			return(
				<TableRow key={x}>
					<TableRowColumn>{netblockIntell.registrant_org}</TableRowColumn>
					<TableRowColumn>{netblockIntell.country}</TableRowColumn>
					<TableRowColumn>{netblockIntell.cidr}</TableRowColumn>
					<TableRowColumn>{netblockIntell.start_ip}</TableRowColumn>
					<TableRowColumn>{netblockIntell.end_ip}</TableRowColumn>
					<TableRowColumn><ContentRemoveCircle onClick={this.removeNetblockIntell.bind(null, x)} key={x} className="remove-circle" style={{fill:'#8d8c8c'}} /></TableRowColumn>
				</TableRow>
			)
		}, this);

		return (
			<div style={{marginBottom:'80px'}}>
			<Card className="card">
				<CardTitle title={"Manage TOE: " + this.state.shortName}></CardTitle>
				<CardText>
					<FloatingLabelInput label="Short Name" value={this.state.shortName} wrapperClassName={((this.state.shortName.length > 0) ? 'active' : '')} onChange={this.handleShortNameChange} placeholder="Short Name" isDisabled={false} />
					<FloatingLabelInput label="Formal Name" value={this.state.formalName} wrapperClassName={((this.state.formalName.length > 0) ? 'active' : '')} onChange={this.handleFormalNameChange} placeholder="Formal Name" isDisabled={false} />
					<FloatingLabelInput label="Industry Name" value={this.state.industryName} wrapperClassName={((this.state.industryName.length > 0) ? 'active' : '')} onChange={this.handleIndustryNameChange} placeholder="Industry Name" isDisabled={false} />
					<br/><br/>
					<div style={{margin:"8px", fontWeight:'bold'}}>Companies Assigned to this TOE</div>
					<div>
						<Paper style={companiesAssignedPaperStyles} zDepth={1}>asdf</Paper>
						<Paper style={companiesAssignedPaperStyles} zDepth={1}>asdf</Paper>
						<Paper style={companiesAssignedPaperStyles} zDepth={1}>asdf</Paper>
						<Paper style={companiesAssignedPaperStyles} zDepth={1}>asdf</Paper>
						<Paper style={companiesAssignedPaperStyles} zDepth={1}>asdf</Paper>
						<Paper style={companiesAssignedPaperStyles} zDepth={1}>asdf</Paper>
						<Paper style={companiesAssignedPaperStyles} zDepth={1}>asdf</Paper>
						<Paper style={companiesAssignedPaperStyles} zDepth={1}>asdf</Paper>
						<Paper style={companiesAssignedPaperStyles} zDepth={1}>asdf</Paper>
						<Paper style={companiesAssignedPaperStyles} zDepth={1}>asdf</Paper>
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
			<RaisedButton label="Add/Update TOE" style={{position:'fixed', bottom:'20px', right:'20px'}} secondary={true}></RaisedButton>
			</div>
		)
	}
})
module.exports = AddEditToe;

//
 // var goods = ["", "Agriculture, Forestry, and Fishing", "Construction", "Utilities", "Manufacturing", "Mining and Quarrying"];
//	 var services = ["", "Accommodation and Food Service", "Arts, Entertainment, and Recreation", "Business Support", "Content Creation and Mass Communication", "Education", "Finance and Insurance", "Government and Defense", "Human Health", "Information Technology", "Real Estate", "Retail Trade (B2B)", "Transportation and Storage", "Wholesale Trade (B2B)", "Vehicles"];

					// <SelectField value={this.state.industrialSegment} onChange={this.handleIndustrialSegmentChange}>
					//	 <MenuItem value={'services_producing'} primaryText="Services Producing"/>
					//	 <MenuItem value={'goods_producing'} primaryText="Goods Producing"/>
					// </SelectField>
