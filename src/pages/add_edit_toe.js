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


//injectTapEventPlugin();
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

		toeId = '';

		if(typeof this.props.params.toeId != 'undefined'){
			toeId = this.props.params.toeId;
		}

		return {
			toe_id: '',
			shortName: '',
			formalName: '',
			industryName: '',
			addingSubsidiary: false,
			tempSubsidiaryName: '',
			tempSubsidiaryDomains: '',
			subsidiaries: [],
			regulatoryRequirements: '',
			regulatoryRequirementsRating: '10',
			securityCertifications: '',
			securityCertificationsRating: '10',
			customerBase: '',
			customerBaseRating: '10',
			dataLossEvents: [],
			addingDataLoss: false,
			tempEventDateValid: true,
			tempEventDateStyle: {fontSize:'12px'},
			tempEventDate: '',
			tempShortDesc: '',
			tempLongDesc: '',
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
			domainIntellSeedDomain: '',
			domainIntellToeDomainsCount: '',
			domainIntellDateLastLoad: '',
			domainIntellSample: []
		}
	},
	componentDidMount() {
		if(toeId.length > 0){
			//
			//
			$.ajax({
				url: 'http://localhost:5000/v1/toe/'+toeId,
				type: 'GET',
				dataType: 'json',
				success: (data) => {
					//
					this.setState({
						dateCreated: data.date_created,
						toe_id: data.toe_id,
						shortName: data.short_name,
						formalName: data.formal_name,
						industryName: data.industry,
						subsidiaries: (typeof data.toe_subsidiaries != 'undefined' ? data.toe_subsidiaries : [] ),
						regulatoryRequirements: data.governance_regulatory_requirements,
						regulatoryRequirementsRating: data.governance_regulatory_requirements_rating,
						securityCertifications: data.governance_security_certifications,
						securityCertificationsRating: data.governance_security_certifications_rating,
						customerBase: data.governance_customer_base,
						customerBaseRating: data.governance_customer_base_rating,
						dataLossEvents: (typeof data.data_loss_events != 'undefined' ? data.data_loss_events : [] ),
						seedHostnames: (typeof data.seed_hostnames != 'undefined' ? data.seed_hostnames : [] ),
						netblockIntell: (typeof data.toe_netblocks != 'undefined' ? data.toe_netblocks : [] ),
						domainIntellSeedDomain: data.domain_intell_seed_domain,
						domainIntellToeDomainsCount: data.domain_intell_toe_domains_count,
						domainIntellDateLastLoad: data.domain_intell_date_last_load,
						domainIntellSample: data.domain_intell_sample
					});
					this.setGovernanceRatingColor('regulatory_requirements_rating', this.state.regulatoryRequirementsRating);
					this.setGovernanceRatingColor('security_certifications_rating', this.state.securityCertificationsRating);
					this.setGovernanceRatingColor('customer_base_rating', this.state.customerBaseRating);
					$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
				}
			});
		}else{
			this.setGovernanceRatingColor('regulatory_requirements_rating', this.state.regulatoryRequirementsRating);
			this.setGovernanceRatingColor('security_certifications_rating', this.state.securityCertificationsRating);
			this.setGovernanceRatingColor('customer_base_rating', this.state.customerBaseRating);
		}
	},
	handleShortNameChange(e, cb) { this.setState({shortName: e.target.value}, () => cb()) },
	handleFormalNameChange(e, cb) { this.setState({formalName: e.target.value}, () => cb()) },
	handleIndustryNameChange(e, cb) { this.setState({industryName: e.target.value}, () => cb()) },
	handleDomainIntellSeedDomain(e) { this.setState({domainIntellSeedDomain: e.target.value}) },
	handleTempShortDesc(e) { this.setState({tempShortDesc: e.target.value}) },
	handleTempLongDesc(e) { this.setState({tempLongDesc: e.target.value}) },
	handleTempResource(e) { this.setState({tempResource: e.target.value}) },
	handleTempSubsidiaryName(e) { this.setState({tempSubsidiaryName: e.target.value}) },
	handleTempSubsidiaryDomains(e) { this.setState({tempSubsidiaryDomains: e.target.value}) },
	handleRegulatoryRequirements(e) {this.setState({regulatoryRequirements: e.target.value}) },
	handleSecurityCertifications(e) {this.setState({securityCertifications: e.target.value}) },
	handleCustomerBase(e) {this.setState({customerBase: e.target.value}) },
	handleTempAddSeedHostname(e, cb) { this.setState({tempAddSeedHostname: e.target.value}, () => cb()) },
	handleTempRegistrantOrg(e) { this.setState({tempRegistrantOrg: e.target.value}) },
	handleTempCountry(e) { this.setState({tempCountry: e.target.value}) },
	handleTempCidr(e) { this.setState({tempCidr: e.target.value}) },

	handleRegulatoryRequirementsRating(ratingId, e) {
		this.setState({regulatoryRequirementsRating: e.target.value});
		this.setGovernanceRatingColor(ratingId, e.target.value);
	},

	handleSecurityCertificationsRating(ratingId, e) {
		this.setState({securityCertificationsRating: e.target.value});
		this.setGovernanceRatingColor(ratingId, e.target.value);
	},

	handleCustomerBaseRating(ratingId, e) {
		this.setState({customerBaseRating: e.target.value});
		this.setGovernanceRatingColor(ratingId, e.target.value);
	},

	setGovernanceRatingColor(ratingId, rating){
		if(rating >= 8){
			$('#'+ratingId).css('fill', '#6bbf47');
			return
		}
		if(rating == 7 || rating == 6){
			$('#'+ratingId).css('fill', '#70a9d6');
			return
		}
		if(rating == 5 || rating == 4){
			$('#'+ratingId).css('fill', '#f5c304');
			return
		}
		if(rating <= 3){
			$('#'+ratingId).css('fill', '#e53535');
			return
		}
	},

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

	showAddSubsidiary(){
		this.setState({
			addingSubsidiary:true
		});
		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	removeSubsidiary(e){
		let temp = this.state.subsidiaries;

		temp.splice(e, 1);

		this.setState({
			subsidiaries: temp
		});

		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	addSubsidiary(){

		if(this.state.tempSubsidiaryName.length > 0
			&& this.state.tempSubsidiaryDomains.length > 0){

			let newRecord = {
				subsidiary_name: this.state.tempSubsidiaryName,
				subsidiary_domains: []
			}

			// convert temp domains string into array
			newRecord.subsidiary_domains = this.state.tempSubsidiaryDomains.split(',');

			for (var i = 0; i < newRecord.subsidiary_domains.length; i++) {
				newRecord.subsidiary_domains[i] = newRecord.subsidiary_domains[i].trim();
			}

			let temp = this.state.subsidiaries;
			temp.unshift(newRecord);

			this.setState({
				subsidiaries: temp,
				tempSubsidiaryName: '',
				tempSubsidiaryDomains: '',
				addingSubsidiary: false
			});
			$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
		}

		this.setState({
			addingSeedHostname:false
		});
		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	refreshDomainIntell(e){
		if(this.state.domainIntellSeedDomain.length > 0){
			this.setState({
				domainIntellToeDomainsCount: '',
				domainIntellDateLastLoad: '',
				domainIntellSample: []
			});
			$.ajax({
				url: 'http://localhost:5000/v1/toe/domain_intel/'+this.state.domainIntellSeedDomain+'/'+toeId,
				type: 'GET',
				dataType: 'json',
				success: (data) => {
					this.setState({
						domainIntellSeedDomain: data.domain_intell_seed_domain,
						domainIntellToeDomainsCount: data.domain_intell_toe_domains_count,
						domainIntellDateLastLoad: data.domain_intell_date_last_load,
						domainIntellSample: data.domain_intell_sample
					});
					$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
				}
			});
		}else{
			alert('Please enter a Root Domain');
		}
	},

	showAddDataLoss(e){
		this.setState({
			addingDataLoss:true
		});
		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
	},

	addDataLoss(){
		if(this.state.tempEventDate.length > 0
			&& this.state.tempEventDateValid
			&& this.state.tempShortDesc.length > 0
			&& this.state.tempLongDesc.length > 0
			&& this.state.tempResource.length > 0){

			let newRecord = {
				"data_loss_event_date":this.state.tempEventDate,
				"data_loss_event_long_desc":this.state.tempLongDesc,
				"data_loss_event_short_desc":this.state.tempShortDesc,
				"data_loss_event_source_url":this.state.tempResource,
			}

			let temp = this.state.dataLossEvents;
			temp.unshift(newRecord);

			this.setState({
				dataLossEvents: temp
			});

			this.setState({
				tempEventDate: '',
				tempShortDesc: '',
				tempLongDesc: '',
				tempResource: '',
				addingDataLoss: false
			});

			$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');

		}else{
			alert('Please make sure all data loss event fields are populated.');
		}
	},

	removeDataLoss(e){
		let temp = this.state.dataLossEvents;

		temp.splice(e, 1);

		this.setState({
			dataLossEvents: temp
		});

		$('tbody, tfoot, thead, tr').css('-webkit-transform', 'scale(1)').css('border','none');
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

		let startIp = this.state.tempStartIp.split('.')
		let startIpNum = parseInt(startIp[0]) * 16777216 + parseInt(startIp[1]) * 65536 + parseInt(startIp[2]) * 256 + parseInt(startIp[3])

		let endIp = this.state.tempEndIp.split('.')
		let endIpNum = parseInt(endIp[0]) * 16777216 + parseInt(endIp[1]) * 65536 + parseInt(endIp[2]) * 256 + parseInt(endIp[3])

		if(startIp < endIp){
			return true;
		}

		return false;
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
			if(this.state.shortName.length > 0
				&& this.state.formalName.length > 0
				&& this.state.industryName.length > 0
				&& this.state.regulatoryRequirements.length > 0
				&& this.state.securityCertifications.length > 0
				&& this.state.customerBase.length > 0
				&& this.state.domainIntellSeedDomain.length > 0){

				let formattedPutObject = {
					//"date_created": this.state.dateCreated,
					"toe_id": this.state.toe_id,
					"short_name": this.state.shortName,
					"formal_name": this.state.formalName,
					"industry": this.state.industryName,
					"toe_subsidiaries": this.state.subsidiaries,
					"governance_regulatory_requirements": this.state.regulatoryRequirements,
					"governance_regulatory_requirements_rating": this.state.regulatoryRequirementsRating,
					"governance_security_certifications": this.state.securityCertifications,
					"governance_security_certifications_rating": this.state.securityCertificationsRating,
					"governance_customer_base": this.state.customerBase,
					"governance_customer_base_rating": this.state.customerBaseRating,
					"data_loss_events": this.state.dataLossEvents,
					"seed_hostnames": this.state.seedHostnames,
					"toe_netblocks": this.state.netblockIntell,
					"domain_intell_seed_domain": this.state.domainIntellSeedDomain
				}
				$.ajax({
					url: 'http://localhost:5000/v1/toe',
					type: 'PUT',
					dataType: 'json',
					headers: {
						'Content-Type':'application/json',
					},
					data: JSON.stringify(formattedPutObject),
					success: (data) => {
						//
						//
						//window.location.href= "/#/manage_toes";
						window.location.href= "/#/manage_toes";
					}
				});
			}else{
				alert('Please make sure you have a Short Name, Formal Name, Industry Name, Governance text/ratings, and a Domain Intell Seed Domain for the TOE');
			}
		}else{
			// NEW TOE CALL
			if(this.state.shortName.length > 0
				&& this.state.formalName.length > 0
				&& this.state.industryName.length > 0
				&& this.state.regulatoryRequirements.length > 0
				&& this.state.securityCertifications.length > 0
				&& this.state.customerBase.length > 0
				&& this.state.domainIntellSeedDomain.length > 0){
					let formattedPostObject = {
						//"date_created": '',
						"toe_id": this.state.toe_id,
						"short_name": this.state.shortName,
						"formal_name": this.state.formalName,
						"industry": this.state.industryName,
						"toe_subsidiaries": this.state.subsidiaries,
						"governance_regulatory_requirements": this.state.regulatoryRequirements,
						"governance_regulatory_requirements_rating": this.state.regulatoryRequirementsRating,
						"governance_security_certifications": this.state.securityCertifications,
						"governance_security_certifications_rating": this.state.securityCertificationsRating,
						"governance_customer_base": this.state.customerBase,
						"governance_customer_base_rating": this.state.customerBaseRating,
						"data_loss_events": this.state.dataLossEvents,
						"seed_hostnames": this.state.seedHostnames,
						"toe_netblocks": this.state.netblockIntell,
						"domain_intell_seed_domain": this.state.domainIntellSeedDomain

					}
					//
					$.ajax({
						url: 'http://localhost:5000/v1/toe',
						type: 'POST',
						dataType: 'json',
						headers: {
							'Content-Type':'application/json',
						},
						data: JSON.stringify(formattedPostObject),
						success: (data) => {
							//
							window.location.href= "/#/manage_toes";
						}
					});
				}else{
					alert('Please make sure you have a Short Name, Formal Name, Industry Name, Governance text/ratings, and a Domain Intell Seed Domain for the new TOE');
				}
		}
		// redirect to manage toes page??

	},

	render: function(){

		const subsidiaryRow = this.state.subsidiaries.map((subsidiary, x) => {
			return(
				<TableRow key={x}>
					<TableRowColumn>{subsidiary.subsidiary_name}</TableRowColumn>
					<TableRowColumn style={{whiteSpace:'normal'}}>{subsidiary.subsidiary_domains.join(', ')}</TableRowColumn>
					<TableRowColumn style={{width:"90px"}}><ContentRemoveCircle onClick={this.removeSubsidiary.bind(null, x)} key={x} className="remove-circle" style={{fill:'#8d8c8c'}} /></TableRowColumn>
				</TableRow>
			)
		}, this);

		const dataLossRow = this.state.dataLossEvents.map((dataLossEvent, x) => {
			return(
				<TableRow key={x}>
					<TableRowColumn style={{whiteSpace:'normal'}}>{dataLossEvent.data_loss_event_date}</TableRowColumn>
					<TableRowColumn style={{whiteSpace:'normal'}}>{dataLossEvent.data_loss_event_short_desc}</TableRowColumn>
					<TableRowColumn style={{whiteSpace:'normal'}}>{dataLossEvent.data_loss_event_long_desc}</TableRowColumn>
					<TableRowColumn style={{whiteSpace:'normal'}}>{dataLossEvent.data_loss_event_source_url}</TableRowColumn>
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

		const domainIntellSampleRow = this.state.domainIntellSample.map((domainIntell, x) => {
			return(
				<TableRow key={x}>
					<TableRowColumn>{domainIntell}</TableRowColumn>
				</TableRow>
			)
		}, this);

		return (
			<div style={{marginBottom:'200px'}}>
			<Card className="card">
				<CardTitle title={"Manage TOE: " + this.state.formalName}></CardTitle>
				<CardText>
					{ this.state.dateCreated ?
						<div>Created on <strong>{this.state.dateCreated}</strong></div>
					:null}
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

			{/* Subsidiaries block */}
			<Card className="card">
				<CardTitle title={"Subsidiaries"}>
					<FloatingActionButton onClick={this.showAddSubsidiary} style={{fontSize:'16px', position:'absolute', top:'8px', right:'0'}} mini={true}>
						<ContentAdd />
					</FloatingActionButton>
				</CardTitle>
				<CardText>
					<Table fixedHeader={true}>
						<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
							<TableRow>
								<TableHeaderColumn>Subsidiary</TableHeaderColumn>
								<TableHeaderColumn>Domains</TableHeaderColumn>
								<TableHeaderColumn style={{width:"90px"}}>&nbsp;</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false}>
							{ this.state.addingSubsidiary ?
								<TableRow>
									<TableRowColumn><DebounceInput debounceTimeout={300} type="text" name="subsidiary_name" id="subsidiary_name" placeholder="Subsidiary Name" style={{fontSize:'12px'}} onChange={this.handleTempSubsidiaryName} value={this.state.tempSubsidiaryName} /></TableRowColumn>
									<TableRowColumn><textarea type="text" name="subsidiary_domains" id="subsidiary_domains" placeholder="Comma seperated list of domains" style={{fontSize:'12px'}} onChange={this.handleTempSubsidiaryDomains} value={this.state.tempSubsidiaryDomains}></textarea></TableRowColumn>
									<TableRowColumn style={{width:"90px"}}><ContentAddCircle className="add-circle" style={{fill:'#689f38'}} onClick={this.addSubsidiary} /></TableRowColumn>
								</TableRow>
							:null}
							{subsidiaryRow}
						</TableBody>
					</Table>
				</CardText>
			</Card>

			{/* Governance block */}
			<Card className="card">
				<CardTitle title={"Governance"}></CardTitle>
				<CardText>
					<div className="clearfix" style={{marginBottom:'20px'}}>
						<div className="clearfix">
							<div style={{float:'left',width:'85%'}}>
								<label style={{display:'block'}} htmlFor="regulatory_requirements"><strong>Regulatory Requirements</strong></label>
								<textarea type="text" name="regulatory_requirements" id="regulatory_requirements" placeholder="Regulatory Requirements" style={{display:'block',fontSize:'12px'}} onChange={this.handleRegulatoryRequirements} value={this.state.regulatoryRequirements}></textarea>
							</div>
							<div style={{float:'right',width:'10%'}}>
								<label style={{display:'block'}} htmlFor="regulatory_requirements">Rating</label>
								<select style={{width:'50%',float:'left',fontSize:'12px'}} onChange={this.handleRegulatoryRequirementsRating.bind(this, 'regulatory_requirements_rating')} value={this.state.regulatoryRequirementsRating}>
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
								<div style={{width:'35%',float:'right',marginTop:'7px'}}><Brightness1 id="regulatory_requirements_rating" style={{fill:'#8d8c8c'}} /></div>
							</div>
						</div>
					</div>
					<div className="clearfix" style={{marginBottom:'20px'}}>
						<div className="clearfix">
							<div style={{float:'left',width:'85%'}}>
								<label style={{display:'block'}} htmlFor="security_certifications"><strong>Security Certifications</strong></label>
								<textarea type="text" name="security_certifications" id="security_certifications" placeholder="Security Certifications" style={{display:'block',fontSize:'12px'}} onChange={this.handleSecurityCertifications} value={this.state.securityCertifications}></textarea>
							</div>
							<div style={{float:'right',width:'10%'}}>
								<label style={{display:'block'}} htmlFor="security_certifications">Rating</label>
								<select style={{width:'50%',float:'left',fontSize:'12px'}} onChange={this.handleSecurityCertificationsRating.bind(this, 'security_certifications_rating')} value={this.state.securityCertificationsRating}>
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
								<div style={{width:'35%',float:'right',marginTop:'7px'}}><Brightness1 id="security_certifications_rating" style={{fill:'#8d8c8c'}} /></div>
							</div>
						</div>
					</div>
					<div className="clearfix">
						<div className="clearfix">
							<div style={{float:'left',width:'85%'}}>
								<label style={{display:'block'}} htmlFor="customer_base"><strong>Customer Base</strong></label>
								<textarea type="text" name="customer_base" id="customer_base" placeholder="Customer Base" style={{display:'block',fontSize:'12px'}} onChange={this.handleCustomerBase} value={this.state.customerBase}></textarea>
							</div>
							<div style={{float:'right',width:'10%'}}>
								<label style={{display:'block'}} htmlFor="customer_base">Rating</label>
								<select style={{width:'50%',float:'left',fontSize:'12px'}} onChange={this.handleCustomerBaseRating.bind(this, 'customer_base_rating')} value={this.state.customerBaseRating}>
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
								<div style={{width:'35%',float:'right',marginTop:'7px'}}><Brightness1 id="customer_base_rating" style={{fill:'#8d8c8c'}} /></div>
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
						<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
							<TableRow>
								<TableHeaderColumn>Event Date</TableHeaderColumn>
								<TableHeaderColumn>Short Desc</TableHeaderColumn>
								<TableHeaderColumn>Long Desc</TableHeaderColumn>
								<TableHeaderColumn>Reference Url</TableHeaderColumn>
								<TableHeaderColumn style={{width:"90px"}}>&nbsp;</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false}>
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
							<TableBody displayRowCheckbox={false}>
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
						<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
							<TableRow>
								<TableHeaderColumn>Registrant Org</TableHeaderColumn>
								<TableHeaderColumn>Country</TableHeaderColumn>
								<TableHeaderColumn>CIDR</TableHeaderColumn>
								<TableHeaderColumn>Start IP</TableHeaderColumn>
								<TableHeaderColumn>End IP</TableHeaderColumn>
								<TableHeaderColumn style={{width:"90px"}}>&nbsp;</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false}>
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
						<label style={{display:'inline-block'}}>Root Domain:</label> <DebounceInput debounceTimeout={300} style={{display:'inline-block',width:'400px'}} type="text" name="domainIntellSeedDomain" id="domainIntellSeedDomain" placeholder="Root Domain" onChange={this.handleDomainIntellSeedDomain} value={this.state.domainIntellSeedDomain} />
						{ this.state.domainIntellSample.length > 0 ?
						<div>
							<br/><strong>Domain Count:</strong> {this.state.domainIntellToeDomainsCount} &nbsp;&nbsp;&nbsp;&nbsp;<strong>Last Load Date:</strong> {this.state.domainIntellDateLastLoad}
							<span className="domain-intel-refresh-link" onClick={this.refreshDomainIntell}>Refresh/Get</span>
						</div>
						:null}
					</div>
					{ this.state.domainIntellSample.length > 0 ?
					<div className="clearfix">
						<div>
							<Table fixedHeader={true}>
								<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
									<TableRow>
										<TableHeaderColumn>Domain</TableHeaderColumn>
									</TableRow>
								</TableHeader>
								<TableBody displayRowCheckbox={false}>
									{domainIntellSampleRow}
								</TableBody>
							</Table>
						</div>
					</div>
					:null}
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
