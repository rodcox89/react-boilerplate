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
			rootDomain: '',
			dataLoss: [],
			addingdataLoss: false,
			tempEventDateValid: true,
			tempEventDateStyle: {fontSize:'12px'},
			tempEventDate: '',
			tempShortDesc: '',
			tempResource: '',
			seedHostnames: [],
			addingSeedHostname: false,
			tempAddSeedHostname: '',
			netblockIntell: [],
			addingNetblockIntell: false,
			tempRegistrantOrg: '',
			tempCountry: '',
			tempCidr: '',
			tempStartIp: '',
			tempStartIpValid: true,
			tempStartIpStyle: {fontSize:'12px'},
			tempEndIp: '',
			tempEndIpValid: true,
			tempEndIpStyle: {fontSize:'12px'},
		}
	},
	componentDidMount() {
		if(toeId.length > 0){
			$.ajax({
				url: 'http://localhost:5000/v1/toe/'+toeId,
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
	},
	handleShortNameChange(e, cb) { this.setState({shortName: e.target.value}, () => cb()) },
	handleFormalNameChange(e, cb) { this.setState({formalName: e.target.value}, () => cb()) },
	handleIndustryNameChange(e, cb) { this.setState({industryName: e.target.value}, () => cb()) },
	handleRootDomain(e) { this.setState({rootDomain: e.target.value}) },
	handleTempShortDesc(e) { this.setState({tempShortDesc: e.target.value}) },
	handleTempLongDesc(e) { this.setState({tempLongDesc: e.target.value}) },
	handleTempResource(e) { this.setState({tempResource: e.target.value}) },
	handleTempAddSeedHostname(e, cb) { this.setState({tempAddSeedHostname: e.target.value}, () => cb()) },
	handleTempRegistrantOrg(e) { this.setState({tempRegistrantOrg: e.target.value}) },
	handleTempCountry(e) { this.setState({tempCountry: e.target.value}) },
	handleTempCidr(e) { this.setState({tempCidr: e.target.value}) },

	handleTempEventDate(e) {

		this.setState({tempEventDate: e.target.value});

		let valid = true;
		let temp = e.target.value;
		let mmPattern = /^\d{2}$/;
		let yyyyPattern = /^\d{4}$/;

		temp = temp.split('/');

		if(temp[0] < 1 || temp[0] > 12){ valid = false; }
		if(!mmPattern.test(temp[0])){ valid = false; }
		if(!yyyyPattern.test(temp[1])){ valid = false; }
		if(temp[3]){ valid = false; }

		if(valid){
			this.setState({
				tempEventDateValid: valid,
				tempEventDateStyle: {fontSize:'12px'},
			});
		}else{
			this.setState({
				tempEventDateValid: valid,
				tempEventDateStyle: {fontSize:'12px', border:'1px solid red'}
			});
		}
	},

	handleTempStartIp(e) {

		this.setState({tempStartIp: e.target.value});

		// check to see if we have a valid IP
		if(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(e.target.value)){
			this.setState({
				tempStartIpValid: true,
				tempStartIpStyle: {fontSize:'12px'}
			});
		}else{
			this.setState({
				tempStartIpValid: false,
				tempStartIpStyle: {fontSize:'12px', border:'1px solid red'}
			});
		}
	},

	handleTempEndIp(e) {

		this.setState({tempEndIp: e.target.value})

		// check to see if we have a valid IP
		if(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(e.target.value)){
			this.setState({
				tempEndIpValid: true,
				tempEndIpStyle: {fontSize:'12px'}
			});
		}else{
			this.setState({
				tempEndIpValid: false,
				tempEndIpStyle: {fontSize:'12px', border:'1px solid red'}
			});
		}
	},

	refreshDomainIntell(e){
		console.log('WE WANT TO REFRESH DOMAIN INTELL');
	},

	showAddDataLoss(e){
		this.setState({
			addingDataLoss:true
		});
		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	addDataLoss(){
		console.log('add data loss');
	},

	removeDataLoss(e){
		console.log('remove data loss');
		// let temp = this.state.netblockIntell;
		//
		// temp.splice(e, 1);
		//
		// this.setState({
		// 	netblockIntell: temp
		// });
		//
		// $('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	showAddNetblockIntell(e){
		this.setState({
			addingNetblockIntell:true
		});
		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	addNetblockIntell(e){

		if(this.state.tempRegistrantOrg.length > 0
			&& this.state.tempCountry.length > 0
			&& this.state.tempCidr.length > 0
			&& this.state.tempStartIp.length > 0
			&& this.state.tempStartIpValid
			&& this.state.tempEndIp.length > 0
			&& this.state.tempEndIpValid){

			if(this.NetblockIntellStartEndIpValidation()){

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

				this.setState({
					tempRegistrantOrg: '',
					tempCountry: '',
					tempCidr: '',
					tempStartIp: '',
					tempEndIp: '',
					addingNetblockIntell: false
				});

				$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');

			}else{
				alert('The start IP and end IP appear to be invalid');
			}

		}else{
			alert('There was an error with the new Netblock Intell. Make sure all fields are populated and IPs are valid');
		}

	},

	NetblockIntellStartEndIpValidation(){
		console.log('RUN START AND END CHECK FROM KELLY');
		return true;
	},

	removeNetblockIntell(e){
		let temp = this.state.netblockIntell;

		temp.splice(e, 1);

		this.setState({
			netblockIntell: temp
		});

		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	showAddSeedHostname(e){
		this.setState({
			tempAddSeedHostname: '',
			addingSeedHostname:true
		});
		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	addSeedHostnames(e){

		if(this.state.tempAddSeedHostname.length > 0){
			let temp = this.state.seedHostnames;
			temp.unshift(this.state.tempAddSeedHostname);

			this.setState({
				seedHostnames: temp
			});
		}

		this.setState({
			addingSeedHostname:false
		});
		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	removeSeedHostnames(e){
		let temp = this.state.seedHostnames;

		temp.splice(e, 1);

		this.setState({
			seedHostnames: temp
		});
		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	addUpdateToe(){

		// check if new or updated TOE
		if(toeId.length > 0){
			// updating existing TOE
			let formattedPutObject = {
				"date_created": "2016-02-02 15:02:20.942993",
				"formal_name": this.state.formalName,
				"industry": this.state.industryName,
				"seed_hostnames": this.state.seedHostnames,
				"short_name": this.state.shortName,
				"toe_id": this.state.toe_id,
				"toe_netblocks": this.state.netblockIntell
			}
			// console.log('EXISTING TOE');
			// console.log(formattedPutObject);
			$.ajax({
				url: 'http://localhost:5000/v1/toe',
				type: 'PUT',
				dataType: 'json',
				headers: {
					'Content-Type':'application/json',
				},
				data: JSON.stringify(formattedPutObject),
				success: (data) => {
					//console.log(data);
					window.location.href= "/#/manage_toes";
				}
			});
		}else{
			// NEW TOE CALL
			let formattedPostObject = {
				"formal_name": this.state.formalName,
				"industry": this.state.industryName,
				"seed_hostnames": this.state.seedHostnames,
				"short_name": this.state.shortName,
				"toe_netblocks": this.state.netblockIntell
			}
			$.ajax({
				url: 'http://localhost:5000/v1/toe',
				type: 'POST',
				dataType: 'json',
				headers: {
					'Content-Type':'application/json',
				},
				data: JSON.stringify(formattedPostObject),
				success: (data) => {
					console.log(data);
					window.location.href= "/#/manage_toes";
				}
			});
		}
		// redirect to manage toes page??

	},

	render: function(){

		const dataLossRow = this.state.dataLoss.map((dataLoss, x) => {
			return(
				<TableRow key={x}>
					<TableRowColumn>{dataLoss.event_date}</TableRowColumn>
					<TableRowColumn>{dataLoss.short_desc}</TableRowColumn>
					<TableRowColumn>{dataLoss.long_desc}</TableRowColumn>
					<TableRowColumn>{dataLoss.resource}</TableRowColumn>
					<TableRowColumn style={{width:"90px"}}><ContentRemoveCircle onClick={this.removeDataLoss.bind(null, x)} key={x} className="remove-circle" style={{fill:'#8d8c8c'}} /></TableRowColumn>
				</TableRow>
			)
		}, this);

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
					<div style={{margin:"8px", fontWeight:'bold'}}>Companies Subscribed to this TOE</div>
					<div>
						<Paper style={companiesAssignedPaperStyles} zDepth={1}>COMPANIES ASSIGNED LOGIC HAS NOT BEEN DONE</Paper>
					</div>
				</CardText>
			</Card>
			<Card className="card">
				<CardTitle title={"Governance"}></CardTitle>
				<CardText>
					<div className="clearfix" style={{marginBottom:'20px'}}>
						<div className="clearfix">
							<div style={{float:'left',width:'85%'}}>
								<label style={{display:'block'}} htmlFor="regulatory_requirements"><strong>Regulatory Requirements</strong></label>
								<textarea type="text" name="regulatory_requirements" id="regulatory_requirements" placeholder="Regulatory Requirements" style={{display:'block',fontSize:'12px'}} onChange={this.handleTempRegulatoryRequirements} value={this.state.tempRegulatoryRequirements}></textarea>
							</div>
							<div style={{float:'right',width:'10%'}}>
								<label style={{display:'block'}} htmlFor="regulatory_requirements">Rating</label>
								<select style={{width:'50%',float:'left',fontSize:'12px'}}>
									<option value="10">10</option>
									<option value="9">9</option>
									<option value="8">8</option>
									<option value="7">7</option>
									<option value="6">6</option>
									<option value="5">5</option>
									<option value="4">4</option>
									<option value="3">3</option>
									<option value="2">2</option>
									<option value="1">1</option>
								</select>
								<div style={{width:'35%',float:'right',marginTop:'7px'}}><Brightness1 style={{fill:'#68C13E'}} /></div>
							</div>
						</div>
					</div>
					<div className="clearfix" style={{marginBottom:'20px'}}>
						<div className="clearfix">
							<div style={{float:'left',width:'85%'}}>
								<label style={{display:'block'}} htmlFor="regulatory_requirements"><strong>Regulatory Requirements</strong></label>
								<textarea type="text" name="regulatory_requirements" id="regulatory_requirements" placeholder="Regulatory Requirements" style={{display:'block',fontSize:'12px'}} onChange={this.handleTempRegulatoryRequirements} value={this.state.tempRegulatoryRequirements}></textarea>
							</div>
							<div style={{float:'right',width:'10%'}}>
								<label style={{display:'block'}} htmlFor="regulatory_requirements">Rating</label>
								<select style={{width:'50%',float:'left',fontSize:'12px'}}>
									<option value="10">10</option>
									<option value="9">9</option>
									<option value="8">8</option>
									<option value="7">7</option>
									<option value="6">6</option>
									<option value="5">5</option>
									<option value="4">4</option>
									<option value="3">3</option>
									<option value="2">2</option>
									<option value="1">1</option>
								</select>
								<div style={{width:'35%',float:'right',marginTop:'7px'}}><Brightness1 style={{fill:'#8d8c8c'}} /></div>
							</div>
						</div>
					</div>
					<div className="clearfix">
						<div className="clearfix">
							<div style={{float:'left',width:'85%'}}>
								<label style={{display:'block'}} htmlFor="regulatory_requirements"><strong>Customer Base</strong></label>
								<textarea type="text" name="regulatory_requirements" id="regulatory_requirements" placeholder="Regulatory Requirements" style={{display:'block',fontSize:'12px'}} onChange={this.handleTempRegulatoryRequirements} value={this.state.tempRegulatoryRequirements}></textarea>
							</div>
							<div style={{float:'right',width:'10%'}}>
								<label style={{display:'block'}} htmlFor="regulatory_requirements">Rating</label>
								<select style={{width:'50%',float:'left',fontSize:'12px'}}>
									<option value="10">10</option>
									<option value="9">9</option>
									<option value="8">8</option>
									<option value="7">7</option>
									<option value="6">6</option>
									<option value="5">5</option>
									<option value="4">4</option>
									<option value="3">3</option>
									<option value="2">2</option>
									<option value="1">1</option>
								</select>
								<div style={{width:'35%',float:'right',marginTop:'7px'}}><Brightness1 style={{fill:'#8d8c8c'}} /></div>
							</div>
						</div>
					</div>
				</CardText>
			</Card>

			{/* Data Loss block */}
			<Card className="card">
				<CardTitle title={"Data Loss"}>
					<FloatingActionButton onClick={this.showAddDataLoss} style={{fontSize:'16px', position:'absolute', top:'8px', right:'0'}} mini={true}>
						<ContentAdd />
					</FloatingActionButton>
				</CardTitle>
				<CardText>
					<Table fixedHeader={true}>
						<TableHeader>
							<TableRow>
								<TableHeaderColumn>Event Date</TableHeaderColumn>
								<TableHeaderColumn>Short Desc</TableHeaderColumn>
								<TableHeaderColumn>Long Desc</TableHeaderColumn>
								<TableHeaderColumn>Reference Url</TableHeaderColumn>
								<TableHeaderColumn style={{width:"90px"}}>&nbsp;</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ this.state.addingDataLoss ?
								<TableRow>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="event_date" id="event_date" placeholder="MM/YYYY" style={this.state.tempEventDateStyle} onChange={this.handleTempEventDate} value={this.state.tempEventDate} /></TableRowColumn>
									<TableRowColumn><textarea type="text" name="short_desc" id="short_desc" placeholder="Short Desc" style={{fontSize:'12px'}} onChange={this.handleTempShortDesc} value={this.state.tempShortDesc}></textarea></TableRowColumn>
									<TableRowColumn><textarea type="text" name="long_desc" id="long_desc" placeholder="Long Description" style={{fontSize:'12px'}} onChange={this.handleTempLongDesc} value={this.state.tempLongDesc}></textarea></TableRowColumn>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="resource" id="resource" placeholder="Reference URL" style={{fontSize:'12px'}} onChange={this.handleTempResource} value={this.state.tempResource} /></TableRowColumn>
									<TableRowColumn style={{width:"90px"}}><ContentAddCircle className="add-circle" style={{fill:'#689f38'}} onClick={this.addDataLoss} /></TableRowColumn>
								</TableRow>
						  :null}
							{dataLossRow}
						</TableBody>
					</Table>
				</CardText>
			</Card>

			{/* Seed Hostnames block */}
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

			{/* Netblock Intell block */}
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
								<TableHeaderColumn style={{width:"90px"}}>&nbsp;</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ this.state.addingNetblockIntell ?
								<TableRow>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="registrant_org" id="registrant_org" placeholder="Registrant Org" style={{fontSize:'12px'}} onChange={this.handleTempRegistrantOrg} value={this.state.tempRegistrantOrg} /></TableRowColumn>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="country" id="country" placeholder="Country" style={{fontSize:'12px'}} onChange={this.handleTempCountry} value={this.state.tempCountry} /></TableRowColumn>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="cidr" id="cidr" placeholder="CIDR" style={{fontSize:'12px'}} onChange={this.handleTempCidr} value={this.state.tempCidr} /></TableRowColumn>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="start_ip" id="start_ip" placeholder="Start IP" style={this.state.tempStartIpStyle} onChange={this.handleTempStartIp} value={this.state.tempStartIp} /></TableRowColumn>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="end_ip" id="end_ip" placeholder="End IP" style={this.state.tempEndIpStyle} onChange={this.handleTempEndIp} value={this.state.tempEndIp} /></TableRowColumn>
									<TableRowColumn style={{width:"90px"}}><ContentAddCircle className="add-circle" style={{fill:'#689f38'}} onClick={this.addNetblockIntell} /></TableRowColumn>
								</TableRow>
						  :null}
							{netblockIntellRow}
						</TableBody>
					</Table>
				</CardText>
			</Card>

			{/* Domain Intell block */}
			<Card className="card">
				<CardTitle title="Domain Intell"></CardTitle>
				<CardText>
					<div className="clearfix">
						<label style={{display:'inline-block'}}>Root Domain:</label> <DebounceInput debounceTimeout={300} style={{display:'inline-block',width:'400px'}} type="text" name="rootDomain" id="rootDomain" placeholder="Root Domain" onChange={this.handleRootDomain} value={this.state.rootDomain} />
						<br/><strong>Domain Count:</strong> 753 &nbsp;&nbsp;&nbsp;&nbsp;<strong>Last Load Date:</strong> 12/12/2015
						<span className="domain-intel-refresh-link" onClick={this.refreshDomainIntell}>Refresh/Get</span>
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
