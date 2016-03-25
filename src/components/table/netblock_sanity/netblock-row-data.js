import Constants from 'constants'

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

let Netblock = React.createClass({
  getDefaultProps(){
    return {
      index: '',
      netblock: {
        analyst_edit_registrant_org: '',
        analyst_edit_registrant_city: '',
        analyst_edit_registrant_state: '',
        analyst_edit_registrant_country: '',
        analyst_edit_include_in_analysis: '',
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
  handleCountryChange(e){

    let index = this.props.index
    let country = this.props.netblock.analyst_edit_registrant_country
    this.props.handleCountryChange(country, e, index)
  },
  handleCityChange(e){
    let index = this.props.index
    let city = this.props.netblock.analyst_edit_registrant_city
    this.props.handleCityChange(city, e, index)
  },
  handleStateChange(e){
    let index = this.props.index
    let state = this.props.netblock.analyst_edit_registrant_state
    this.props.handleStateChange(state, e, index)
  },
  handleOrgChange(e){
    let index = this.props.index
    let org = this.props.netblock.analyst_edit_registrant_org
    this.props.handleOrgChange(org, e, index)
  },
  onSave(e){
    let newnetblock = {
      analyst_edit_registrant_org: this.props.netblock.analyst_edit_registrant_org,
      analyst_edit_registrant_city: this.props.netblock.analyst_edit_registrant_city,
      analyst_edit_registrant_state: this.props.netblock.analyst_edit_registrant_state,
      analyst_edit_registrant_country: this.props.netblock.analyst_edit_registrant_country,
      analyst_edit_include_in_analysis: this.props.netblock.analyst_edit_include_in_analysis,
      netrange: this.props.netrange,
      start_ip: this.props.netblock.start_ip,
      unique_key: this.props.netblock.unique_key,
      analysis_id: this.props.netblock.analysis_id,
    }

    $.ajax({
    type: 'PUT',
    url: Constants.api_base_url + Constants.api_version + '/netblocks',
    crossDomain: true,
    data: JSON.stringify(newnetblock),
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
    let url = "http://whois.domaintools.com/"+this.props.netblock.start_ip
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
   url: 'http://ipinfo.io/'+this.props.netblock.start_ip,
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
      return(
       <tr className="netblock-row">
          <td>{this.props.netblock.netrange}</td>
          <td>{this.props.netblock.analyst_edit_registrant_org}</td>
          <td>{this.props.netblock.analyst_edit_registrant_city}</td>
          <td>{this.props.netblock.analyst_edit_registrant_state}</td>
          <td>{this.props.netblock.analyst_edit_registrant_country}</td>
        </tr>
    )
}
});

export default Netblock;
