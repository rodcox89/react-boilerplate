import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

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

	refreshDomainIntell(e){
		console.log('WE WANT TO REFRESH DOMAIN INTELL');
	},

	addNetblockIntell(e){
		console.log('WE WANT TO ADD NETBLOCK INTELL');
	},

	removeNetblockIntell(e){
		console.log('REMOVE NETBLOCK INTELL');
	},

	showAddSeedHostname(e){
		this.setState({
			tempAddSeedHostname: '',
			addingSeedHostname:true
		});
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

	},

	removeSeedHostnames(e){
		let temp = this.state.seedHostnames;

		temp.splice(e, 1);

		this.setState({
			seedHostnames: temp
		});

	},







	partOfCompanySelection(e){
		console.log('radio switched');
		if (e.target.value === 'entire') {
			console.log('was entire');
			this.setState({
				entire_company: true,
				part_of_company_bool: true,
				partOfCompanyFieldColor: 'grey',
				partOfCompanyValue: ''
			})
		}
		else {
			console.log('part');
			this.setState({
				entire_company: false,
				part_of_company_bool: false,
				partOfCompanyFieldColor: 'green',
			})
		}
	},
	scanFrequencySelection(e){
		if(e.target.value === 'one_time'){
			this.setState({})
		}
	},
	 handleIndustrialSegmentChange(event, index, value){
		 this.setState({
			 industrialSegment:index,
			 industry: 'Accomodation and Food Service'
		 })
		 console.log(this.state.industrialSegment);
		//	this.setState({industrialSegment}),

	 } ,
	handleIndustryChange(event, index, value){
		this.setState({industry:value})
	},
	handlePartofCompanyChange(e, cb){this.setState({partOfCompanyValue: e.target.value}, () => cb())},
	handleVendorChange(e, cb) { this.setState({vendorName: e.target.value}, () => cb()) },
	render: function(){

		const seedHostnamesRow = this.state.seedHostnames.map((seedHostname, x) => {
			return(
				<TableRow key={x}>
					<TableRowColumn>{seedHostname.name}</TableRowColumn>
					<TableRowColumn><ContentRemoveCircle onClick={this.removeSeedHostnames.bind(null, x)} key={x} className="remove-circle" style={{fill:'#8d8c8c'}} /></TableRowColumn>
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
					<FloatingActionButton onClick={this.addNetblockIntell} style={{fontSize:'16px', position:'absolute', top:'8px', right:'0'}} mini={true}>
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
								<TableHeaderColumn style={{width:'70px'}}>&nbsp;</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableRowColumn>asdffd</TableRowColumn>
								<TableRowColumn>John Smith</TableRowColumn>
								<TableRowColumn>10.0.0.1/24</TableRowColumn>
								<TableRowColumn>10.0.0.1</TableRowColumn>
								<TableRowColumn>10.0.0.1</TableRowColumn>
								<TableRowColumn><ContentRemoveCircle onClick={this.removeNetblockIntell} className="remove-circle" style={{fill:'#8d8c8c'}} /></TableRowColumn>
							</TableRow>
							<TableRow>
								<TableRowColumn>asdffd</TableRowColumn>
								<TableRowColumn>John Smith</TableRowColumn>
								<TableRowColumn>10.0.0.1/24</TableRowColumn>
								<TableRowColumn>10.0.0.1</TableRowColumn>
								<TableRowColumn>10.0.0.1</TableRowColumn>
								<TableRowColumn><ContentRemoveCircle onClick={this.removeNetblockIntell} className="remove-circle" style={{fill:'#8d8c8c'}} /></TableRowColumn>
							</TableRow>
							<TableRow>
								<TableRowColumn>asdffd</TableRowColumn>
								<TableRowColumn>John Smith</TableRowColumn>
								<TableRowColumn>10.0.0.1/24</TableRowColumn>
								<TableRowColumn>10.0.0.1</TableRowColumn>
								<TableRowColumn>10.0.0.1</TableRowColumn>
								<TableRowColumn><ContentRemoveCircle onClick={this.removeNetblockIntell} className="remove-circle" style={{fill:'#8d8c8c'}} /></TableRowColumn>
							</TableRow>
							<TableRow>
								<TableRowColumn>asdffd</TableRowColumn>
								<TableRowColumn>John Smith</TableRowColumn>
								<TableRowColumn>10.0.0.1/24</TableRowColumn>
								<TableRowColumn>10.0.0.1</TableRowColumn>
								<TableRowColumn>10.0.0.1</TableRowColumn>
								<TableRowColumn><ContentRemoveCircle onClick={this.removeNetblockIntell} className="remove-circle" style={{fill:'#8d8c8c'}} /></TableRowColumn>
							</TableRow>
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
