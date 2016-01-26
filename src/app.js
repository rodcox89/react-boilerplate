import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router , Route, IndexRoute, Link } from 'react-router'

import AppBar from 'material-ui/lib/app-bar'
import AssignmentIcon from 'material-ui/lib/svg-icons/action/assignment'
import CheckIcon from 'material-ui/lib/svg-icons/action/check-circle'
import DataTables from 'styles/foundation/css/foundation.min.css'
import Divider from 'material-ui/lib/divider';
import DnsSecurity from 'pages/dns_security'
import FingerprintIcon from 'material-ui/lib/svg-icons/action/fingerprint'
import HourglassIcon from 'material-ui/lib/svg-icons/action/hourglass-empty'
import IconAddCircle from 'material-ui/lib/svg-icons/content/add-circle-outline'
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
import NewToe from 'pages/new_toe'

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

    console.log('base routes print');

    return(
      <main>
        <AppBar
         title="RiskRecon Ops App"
         iconClassNameRight="muidocs-icon-navigation-expand-more"
         onLeftIconButtonTouchTap={this.handleToggle}
         />
         <LeftNav ref="leftNav" open={this.state.open} onRequestChange={this.handleToggle} menuItems={this.menuItems}>
          <AppBar title="Menu" iconElementRight={<IconButton  onTouchTap={this.handleToggle} ><NavigationClose onRightIconButtonTouchTap={this.handleToggle} /></IconButton>} iconElementLeft={<IconButton></IconButton>} />
          <List>
            <ListItem containerElement={<Link to="/scans" />} linkButton={true} primaryText="Scans Qeued" rightIcon={<ScheduleIcon/>}></ListItem>
            <ListItem containerElement={<Link to="/scans" />} linkButton={true} primaryText="Scans in Progress" rightIcon={<HourglassIcon/>}></ListItem>
            <Divider/>
            <ListItem containerElement={<Link to="/sanity_check" />} linkButton={true} primaryText="Sanity Check" rightIcon={<CheckIcon/>}></ListItem>
            <ListItem containerElement={<Link to="/analyses" />} linkButton={true} primaryText="Findings" rightIcon={<AssignmentIcon/>}></ListItem>
            <Divider/>
            <ListItem containerElement={<Link to="/analyses" />} linkButton={true} primaryText="Administrator" rightIcon={<FingerprintIcon/>}></ListItem>
            <Divider/>
            <ListItem containerElement={<Link to="/new_toe" />} linkButton={true} primaryText="New TOE" rightIcon={<IconAddCircle/>}></ListItem>
          </List>
         </LeftNav>
        {this.props.children}
      </main>
    )
  }
});

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
      <Route path='new_toe' component={NewToe}/>
    </Route>
  </Router>),
document.getElementById('content'));
