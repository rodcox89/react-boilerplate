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
      start_ip: this.props.netblock.start_ip,
      unique_key: this.props.netblock.unique_key,
      analysis_id: this.props.netblock.analysis_id,
    }

    $.ajax({
    type: 'PUT',
    url: 'http://0.0.0.0:5000/v1/netblocks',
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
      let ipdata
      var el
      var input = this.state.isInput
      if(input){
        el = <tr className="netblock-row">
              <td><DebounceInput minLenth={3} debounceTimeout={200} onChange={event=>this.handleOrgChange(event)} value={this.props.netblock.analyst_edit_registrant_org}/></td>
              <td><DebounceInput minLenth={3} debounceTimeout={200} onChange={event=>this.handleCityChange(event)} value={this.props.netblock.analyst_edit_registrant_city}/></td>
              <td><DebounceInput minLenth={3} debounceTimeout={200} onChange={event=>this.handleStateChange(event)} value={this.props.netblock.analyst_edit_registrant_state}/></td>
              <td><DebounceInput minLenth={3} debounceTimeout={200} onChange={event=>this.handleCountryChange(event)} value={this.props.netblock.analyst_edit_registrant_country} /></td>
              <td><RaisedButton onClick={this.onSave} primary={true} label="Save"/></td>
              <td><RaisedButton label="More Info" disabled={false} primary={true} onClick={this.show.bind(this,"pop")}/>
                  <Popover
                    open={this.state.activePopover === 'pop'}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={this.state.anchorOrigin}
                    targetOrigin={this.state.targetOrigin}
                    onRequestClose={this.closePopover.bind(this, 'pop')} >
                    <div style={{padding:40}}>
                    <table>
                      <tbody>
                        <tr><td>City</td><td>{this.state.ipdata.city}</td></tr>
                        <tr><td>ip</td><td>{this.state.ipdata.ip}</td></tr>
                        <tr><td>hostname</td><td>{this.state.ipdata.hostname}</td></tr>
                        <tr><td>city</td><td>{this.state.ipdata.city}</td></tr>
                        <tr><td>region</td><td>{this.state.ipdata.region}</td></tr>
                        <tr><td>country</td><td>{this.state.ipdata.country}</td></tr>
                        <tr><td>loc</td><td>{this.state.ipdata.loc}</td></tr>
                        <tr><td>org</td><td>{this.state.ipdata.org}</td></tr>
                        <tr><td>postal</td><td>{this.state.ipdata.postal}</td></tr>
                      </tbody>
                    </table>
                    </div>
                </Popover>
              </td>

              <td><RaisedButton label="External Resources" primary={true} onClick={this.openNewWindow}></RaisedButton></td>
            </tr>

      }
      else {
        el = <tr className="netblock-row">
          <td>{this.props.netblock.analyst_edit_registrant_org}</td>
          <td>{this.props.netblock.analyst_edit_registrant_city}</td>
          <td>{this.props.netblock.analyst_edit_registrant_state}</td>
          <td>{this.props.netblock.analyst_edit_registrant_country}</td>
          <td><RaisedButton label="Edit" primary={true} onClick={this.onEdit}/></td>
          <td><RaisedButton label="More Info" disabled={true} primary={true} onClick={this.show.bind(this,"pop")}/>
              <Popover
                open={this.state.activePopover === 'pop'}
                anchorEl={this.state.anchorEl}
                anchorOrigin={this.state.anchorOrigin}
                targetOrigin={this.state.targetOrigin}
                onRequestClose={this.closePopover.bind(this, 'pop')} >
                <div style={{padding:40}}>
                <table>
                  <tbody>
                    <tr><td>City</td><td>{this.state.ipdata.city}</td></tr>
                    <tr><td>ip</td><td>{this.state.ipdata.ip}</td></tr>
                    <tr><td>hostname</td><td>{this.state.ipdata.hostname}</td></tr>
                    <tr><td>city</td><td>{this.state.ipdata.city}</td></tr>
                    <tr><td>region</td><td>{this.state.ipdata.region}</td></tr>
                    <tr><td>country</td><td>{this.state.ipdata.country}</td></tr>
                    <tr><td>loc</td><td>{this.state.ipdata.loc}</td></tr>
                    <tr><td>org</td><td>{this.state.ipdata.org}</td></tr>
                    <tr><td>postal</td><td>{this.state.ipdata.postal}</td></tr>
                  </tbody>
                </table>
                </div>
            </Popover>
          </td>
          <td><RaisedButton label="External Resources" disabled={true}></RaisedButton></td>

        </tr>

      }
      return(
        el
    )
}
});

export default Netblock;
