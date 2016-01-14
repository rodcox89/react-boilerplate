import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router , Route, IndexRoute, Link } from 'react-router'
import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Analyses from 'pages/analyses'
import SoftwarePatching from 'pages/software_patching'
import DnsSecurity from 'pages/dns_security'
import WebAppSecurity from 'pages/web_app_security'
import RaisedButton from 'material-ui/lib/raised-button';
import DataTables from 'styles/foundation/css/foundation.min.css'

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
          <MenuItem></MenuItem>
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
    </Route>
  </Router>),
document.getElementById('content'));
