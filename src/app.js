import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router , Route, IndexRoute, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppBar from 'material-ui/lib/app-bar'
import AssignmentIcon from 'material-ui/lib/svg-icons/action/assignment'
import CheckIcon from 'material-ui/lib/svg-icons/action/check-circle'
import DataTables from 'styles/foundation/css/foundation.min.css'
import Divider from 'material-ui/lib/divider';
import DnsSecurity from 'pages/dns_security'
import FingerprintIcon from 'material-ui/lib/svg-icons/action/fingerprint'
import HourglassIcon from 'material-ui/lib/svg-icons/action/hourglass-empty'
import IconAddCircle from 'material-ui/lib/svg-icons/content/add-circle-outline'
import IconAirlineSeatReclineExtra from 'material-ui/lib/svg-icons/notification/airline-seat-recline-extra'
import IconTagFaces from 'material-ui/lib/svg-icons/image/tag-faces'
import FindInPage from 'material-ui/lib/svg-icons/action/find-in-page'
import IconButton from 'material-ui/lib/icon-button';
import LeftNav from 'material-ui/lib/left-nav'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MyRawTheme from 'styles/theme';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import RaisedButton from 'material-ui/lib/raised-button';
import ScheduleIcon from 'material-ui/lib/svg-icons/action/schedule'
import ThemeManager from 'material-ui/lib/styles/theme-manager';

import Analyses from 'pages/analyses'
import SoftwarePatching from 'pages/software_patching'
import WebAppSecurity from 'pages/web_app_security'
import WebEncryption from 'pages/web_encryption'
import ThreatIntell from 'pages/threat_intell'
import Defensibility from 'pages/defensibility'
import SanityCheck from 'pages/sanity_check'
import EditNetblocks from 'pages/edit_netblocks'
import EditDomains from 'pages/edit_domains'
import AddEditToe from 'pages/add_edit_toe'
import ManageToes from 'pages/manage_toes'
import AddEditCustomer from 'pages/add_edit_customer'
import ManageCustomers from 'pages/manage_customers'
import CreateReports from 'pages/create_reports'
import FinalizeMetrics from 'pages/finalize_metrics'

const App = React.createClass({

	getInitialState: function() {
		return {
			open: false,
		}
	},
	handleToggle: function(){

		if (this.state.open === true){
			this.setState({open: false})
		}
		else{

		this.setState({open: true});
	}
	},

	childContextTypes : {
		muiTheme: React.PropTypes.object,
	},

	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
		};
	},

	render() {
		return(
			<main>
				<AppBar
				 title="RiskRecon Ops App"
				 iconClassNameRight="muidocs-icon-navigation-expand-more"
				 onLeftIconButtonTouchTap={this.handleToggle}
				 />
				 <LeftNav ref="leftNav" open={this.state.open} onRequestChange={this.handleToggle} menuItems={this.menuItems}>
					<AppBar title="Menu" iconElementRight={<IconButton	onTouchTap={this.handleToggle} ><NavigationClose onRightIconButtonTouchTap={this.handleToggle} /></IconButton>} iconElementLeft={<IconButton></IconButton>} />
					<List>
						<ListItem primaryTogglesNestedList={true} primaryText="Scans" nestedItems={[
							<ListItem key={1} containerElement={<Link to="/scans" />} linkButton={true} primaryText="Scans Qeued" rightIcon={<ScheduleIcon/>}></ListItem>,
							<ListItem key={2} containerElement={<Link to="/scans" />} linkButton={true} primaryText="Scans in Progress" rightIcon={<HourglassIcon/>}></ListItem>,
						]}></ListItem>
						<Divider/>
						<ListItem containerElement={<Link to="/analyses" />} linkButton={true} primaryText="Report Administrator" rightIcon={<FingerprintIcon/>}></ListItem>
						<Divider/>
						<ListItem primaryTogglesNestedList={true} primaryText="Report Stages" nestedItems={[
							<ListItem key={1} containerElement={<Link to="/sanity_check" />} linkButton={true} primaryText="Sanity Check" rightIcon={<CheckIcon/>}></ListItem>,
							<ListItem key={2} containerElement={<Link to="/analyses" />} linkButton={true} primaryText="Findings" rightIcon={<FindInPage/>}></ListItem>,
							<ListItem key={3} containerElement={<Link to="/create_reports" />} linkButton={true} primaryText="Finalize" rightIcon={<AssignmentIcon/>}></ListItem>,
						]}></ListItem>
						<Divider/>
						<ListItem containerElement={<Link to="/manage_toes" />} linkButton={true} primaryText="Manage TOEs" rightIcon={<IconAirlineSeatReclineExtra/>}></ListItem>
						<Divider/>
						<ListItem containerElement={<Link to="/manage_customers" />} linkButton={true} primaryText="Manage Customers" rightIcon={<IconTagFaces/>}></ListItem>
					</List>
				 </LeftNav>
				{this.props.children}
			</main>
		)
	}
});
injectTapEventPlugin();
ReactDOM.render((
	<Router>
		<Route path='/' component={App} >
			<Route path='software_patching' component={SoftwarePatching}/>
			<Route path='analyses' component={Analyses}/>
			<Route path='dns_security' component={DnsSecurity}/>
			<Route path='web_app_security' component={WebAppSecurity}/>
			<Route path='threat_intell' component={ThreatIntell}/>
			<Route path='web_encryption' component={WebEncryption}/>
			<Route path='defensibility' component={Defensibility}/>
			<Route path='sanity_check' component={SanityCheck}/>
			<Route path='edit_netblocks' component={EditNetblocks}/>
			<Route path='edit_domains' component={EditDomains}/>
			<Route path='manage_toes' component={ManageToes}/>
			<Route path='add_edit_toe' component={AddEditToe}/>
			<Route path='add_edit_toe/:toeId' component={AddEditToe}/>
			<Route path='manage_customers' component={ManageCustomers}/>
			<Route path='add_edit_customer' component={AddEditCustomer}/>
			<Route path='add_edit_customer/:customerId' component={AddEditCustomer}/>
			<Route path='create_reports' component={CreateReports}/>
			<Route path='finalize_metrics/:analysisId' component={FinalizeMetrics}/>
	</Route>
	</Router>),
document.getElementById('content'));
