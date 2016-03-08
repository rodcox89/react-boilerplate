import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import DebounceInput from 'react-debounce-input'
import Griddle from 'griddle-react'
//injectTapEventPlugin();

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import Popover from 'material-ui/lib/popover/popover'
import RaisedButton from 'material-ui/lib/raised-button';




var ndata

let Domain = React.createClass({
  getDefaultProps(){
    return {
      index: '',
      domain: {
        analyst_edit_registrant_org: '',
        start_ip: '',
        unique_key: '',
        analysis_id: '',
        },

      more_info: {
        ip: "",
        hostname: "",
        city: "",
        region: "",
        country: "",
        loc: "",
        org: "",
        postal: "",
        },
    }
  },
  getInitialState(){
    return {
      isInput: false,
      activePopover: '',
      anchorOrigin: {
        'horizontal': 'middle',
        'vertical': 'bottom',
      },
      targetOrigin: {
          'vertical': 'top',
          'horizontal': 'middle',
      },
      ipdata: '',

    }
  },
  onEdit(e){
    e.preventDefault()
    this.setState({isInput: true})
  },

  handleOrgChange(e){
    let index = this.props.index
    let org = this.props.domain.analyst_edit_registrant_org
    this.props.handleOrgChange(org, e, index)
  },
  onSave(e){
    let newdomain = {
      analyst_edit_registrant_org: this.props.domain.analyst_edit_registrant_org,
      unique_key: this.props.domain.unique_key,
      analysis_id: this.props.domain.analysis_id,
    }

    $.ajax({
    type: 'PUT',
    url: Constants.api_base_url + Constants.api_version + '/domains',
    crossDomain: true,
    data: JSON.stringify(newdomain),
    dataType: 'json',
    contentType: 'application/json',
    success: (data) => {
      this.setState({isInput: false})
    },
    error: function () {
      // this.state
      // this.setState({
      //   analyst_comments: this.state[temp.analyst_comments],
      //   analyst_confidence: this.state.temp.analyst_confidence,
      //   analyst_status: this.state.temp.analyst_status,
      //
      // })
    },
  });

},
  openNewWindow(e){
    let url = "http://whois.domaintools.com/"+this.props.domain.start_ip
    window.open(url,'_blank');
  },
  debounce(fn, delay) {
   var timer = null;
   return function () {
     var context = this, args = arguments;
     clearTimeout(timer);
     timer = setTimeout(function () {
       fn.apply(context, args);
     }, delay);
   }
 },
 show(key, e) {
   $.ajax({
   type: 'get',
   url: 'http://ipinfo.io/'+this.props.domain.start_ip,
   dataType: 'json',
   contentType: 'application/json',
   success: (data) => {
     ndata = data
     this.setState({ipdata:ndata})
   },
   error: function () {

   },
 });


  this.setState({
    activePopover:key,
    anchorEl:e.currentTarget,
  });
},

closePopover(key) {
  if (this.state.activePopover !== key)
    return
  this.setState({
    activePopover:'none',
  });
},
setAnchor(positionElement, position, e) {
  let {anchorOrigin} = this.state;
  anchorOrigin[positionElement] = position;

  this.setState({
      anchorOrigin:anchorOrigin,
  });
},

setTarget(positionElement, position, e) {
  let {targetOrigin} = this.state;
  targetOrigin[positionElement] = position;

  this.setState({
      targetOrigin:targetOrigin,
  });
},

    render: function(){
      let ipdata
      var el
      var input = this.state.isInput
      if(input){
        el = <tr className="domain-row">
              <td>{this.props.domain.registrant_name}</td>
              <td><DebounceInput minLenth={3} debounceTimeout={200} onChange={event=>this.handleOrgChange(event)} value={this.props.domain.analyst_edit_registrant_org}/></td>
              <td>{this.props.domain.registrant_email}</td>
              <td>{this.props.domain.admin_name}</td>
              <td>{this.props.domain.admin_org}</td>
              <td>{this.props.domain.admin_email}</td>
              <td>{this.props.domain.tech_name}</td>
              <td>{this.props.domain.tech_org}</td>
              <td>{this.props.domain.tech_email}</td>
              <td>{this.props.domain.registrar_abuse_email}</td>
              <td><RaisedButton onClick={this.onSave} primary={true} label="Save"/></td>
            </tr>

      }
      else {
        el = <tr className="domain-row">
          <td>{this.props.domain.registrant_name}</td>
          <td>{this.props.domain.analyst_edit_registrant_org}</td>
          <td>{this.props.domain.registrant_email}</td>
          <td>{this.props.domain.admin_name}</td>
          <td>{this.props.domain.admin_org}</td>
          <td>{this.props.domain.admin_email}</td>
          <td>{this.props.domain.tech_name}</td>
          <td>{this.props.domain.tech_org}</td>
          <td>{this.props.domain.tech_email}</td>
          <td>{this.props.domain.registrar_abuse_email}</td>
          <td><RaisedButton label="Edit" primary={true} onClick={this.onEdit}/></td>
        </tr>

      }
      return(
        el
    )
}
});

export default Domain;
