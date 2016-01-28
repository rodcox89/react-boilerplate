import React from 'react'
import ReactDom from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { RouteHandler, Link, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import FloatingLabelInput from './../components/form_elements/floating_label_input/floating_label_input'
import TextField from 'material-ui/lib/text-field';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import Css from './../styles/pages/new_toe.scss'
injectTapEventPlugin();
var inputStyle = {
  outline: 'none !important',
  border: 'none',
  boxShadow: 'none',
  clear:'left',
  display:'block',
  width: '80%',
}
let NewToe = React.createClass({
  getInitialState: function() {
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
    //  this.setState({industrialSegment}),

   } ,
  handleIndustryChange(event, index, value){
    this.setState({industry:value})
  },
  handlePartofCompanyChange(e, cb){this.setState({partOfCompanyValue: e.target.value}, () => cb())},
  handleVendorChange(e, cb) { this.setState({vendorName: e.target.value}, () => cb()) },
  render: function(){
    let industryMenuItems
    if(this.state.industrialSegment === 'services'){
      console.log('ser');
      console.log(this.state.industrialSegment);
      industryMenuItems = <div>
                             <MenuItem value={'Accomodation and Food Service'} primaryText="Accommodation and Food Service"/>
                             <MenuItem value={'services_producing'} primaryText="Arts, Entertainment, and Recreation"/>
                             <MenuItem value={'services_producing'} primaryText="Business Support"/>
                             <MenuItem value={'services_producing'} primaryText="Content Creation and Mass Communication"/>
                             <MenuItem value={'services_producing'} primaryText="Education"/>
                             <MenuItem value={'services_producing'} primaryText="Finance and Insurance"/>
                             <MenuItem value={'services_producing'} primaryText="Government and Defense"/>
                             <MenuItem value={'services_producing'} primaryText="Human Health"/>
                             <MenuItem value={'services_producing'} primaryText="Information Technology"/>
                             <MenuItem value={'services_producing'} primaryText="Real Estate"/>
                             <MenuItem value={'services_producing'} primaryText="Retail Trade (B2B)"/>
                             <MenuItem value={'services_producing'} primaryText="Transportation and Storage"/>
                             <MenuItem value={'services_producing'} primaryText="Wholesale Trade (B2B)"/>
                             <MenuItem value={'services_producing'} primaryText="Vehicles"/>
                         </div>
    }
    else if (this.state.industrialSegment === 'saas') {
        console.log('saas');
        console.log(this.state.industrialSegment);
    }
    else{
        console.log('goods');
        console.log(this.state.industrialSegment);
      industryMenuItems = <div>
                             <MenuItem value={'Accomodation and Food Service'} primaryText="test"/>
                         </div>
    }
    return (
      <div>
      <Card className="card">
        <CardTitle title="Add a New Vendor"></CardTitle>
        <div className="card-container">
          <div className="card-row">
            <FloatingLabelInput label="Vendor Name" value={this.state.vendorName} placeholder="Vendor Name" onChange={this.handleVendorChange} isDisabled={false}></FloatingLabelInput>
          </div>
          <div className="card-row inline_radio2">
            <RadioButtonGroup className="inline-radios" name="part_or_entire" label="What part of the company will you be scanning" onChange={this.partOfCompanySelection} defaultSelected="entire">
                    <RadioButton
                      className="radio"
                      value="entire"
                      label="Assess Entire Company"
                      style={{marginBottom:16}} />
                    <RadioButton
                      className="radio"
                      value="part"
                      label="Assess Part of Company"
                      style={{marginBottom:16}}/>
              </RadioButtonGroup>
            </div>
            <div className="card-row">
              <FloatingLabelInput className="test" value={this.state.partOfCompanyValue} label="Division" color={this.state.partOfCompanyFieldColor} placeholder="If scanning part of company, put the name of the division here" isDisabled={this.state.part_of_company_bool} onChange={this.handlePartofCompanyChange}></FloatingLabelInput>
            </div>
            <div className="card-row inline_radio2">
          <RadioButtonGroup className="inline-radios" name="once_or_recurring" label="Frequency" onChange={this.scanFrequencySelection} defaultSelected={this.state.scanFrequency}>
            <RadioButton
              value="one_time"
              label="One-time"
              style={{marginBottom:16}} />
            <RadioButton
              value="recurring"
              label="Recurring"
              style={{marginBottom:16}}/>
            </RadioButtonGroup>
            </div>
        </div>
      </Card>
      <Card className="card">
        <CardTitle title="Vendor Demographics"></CardTitle>
        <div className="card-container">
          <div className="card-row inline_radio2">
              <RadioButtonGroup className="inline-radios" name="goods_or_services" label="What Industry" onChange={this.handleIndustrialSegmentChange} defaultSelected="saas">
                <RadioButton
                  value="saas"
                  label="SaaS"
                  style={{marginBottom:16,marginTop:16}}/>
                <RadioButton
                  value="goods"
                  label="Goods Producing"
                  style={{marginBottom:16,marginTop:16,width:"80%"}}/>
                <RadioButton
                  value="services"
                  label="Services Producing"
                  style={{marginBottom:16,marginTop:16}}/>
                </RadioButtonGroup>
            </div>
            <div className="card-row inline_radio2">
              <SelectField value={this.state.industrialSegment} onChange={this.handleIndustryChange}>
                { industryMenuItems }
              </SelectField>
            </div>
        </div>
      </Card>
      </div>
    )
  }
})
module.exports = NewToe;

//
 // var goods = ["", "Agriculture, Forestry, and Fishing", "Construction", "Utilities", "Manufacturing", "Mining and Quarrying"];
//   var services = ["", "Accommodation and Food Service", "Arts, Entertainment, and Recreation", "Business Support", "Content Creation and Mass Communication", "Education", "Finance and Insurance", "Government and Defense", "Human Health", "Information Technology", "Real Estate", "Retail Trade (B2B)", "Transportation and Storage", "Wholesale Trade (B2B)", "Vehicles"];

          // <SelectField value={this.state.industrialSegment} onChange={this.handleIndustrialSegmentChange}>
          //   <MenuItem value={'services_producing'} primaryText="Services Producing"/>
          //   <MenuItem value={'goods_producing'} primaryText="Goods Producing"/>
          // </SelectField>
