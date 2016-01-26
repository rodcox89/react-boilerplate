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
var industryMenuItems = <div>
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
     console.log(event);
     console.log(index);
     console.log(value);
     if(value === 'services_producing'){
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


     this.setState({
       industrialSegment:value,
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
    return (
      <div>
      <Card className="card">
        <CardTitle title="Add a New Vendor"></CardTitle>
        <div className="card-container">
          <FloatingLabelInput label="Vendor Name" value={this.state.vendorName} placeholder="Vendor Name" onChange={this.handleVendorChange} isDisabled={false}></FloatingLabelInput>
        <RadioButtonGroup className="input" name="part_or_entire" label="What part of the company will you be scanning" onChange={this.partOfCompanySelection} defaultSelected="entire">
            <RadioButton
              value="entire"
              label="Assess Entire Company"
              style={{marginBottom:16}} />
            <RadioButton
              value="part"
              label="Assess Part of Company"
              style={{marginBottom:16}}/>
            </RadioButtonGroup>
            <FloatingLabelInput className="test" value={this.state.partOfCompanyValue} label="Division" color={this.state.partOfCompanyFieldColor} placeholder="If scanning part of company, put the name of the division here" isDisabled={this.state.part_of_company_bool} onChange={this.handlePartofCompanyChange}></FloatingLabelInput>
          <RadioButtonGroup className="input" name="once_or_recurring" label="Frequency" onChange={this.scanFrequencySelection} defaultSelected={this.state.scanFrequency}>
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
      </Card>
      <Card className="card">
        <CardTitle title="Vendor Demographics"></CardTitle>
        <div className="horizontal-container">
          <SelectField value={this.state.industrialSegment} onChange={this.handleIndustrialSegmentChange}>
            <MenuItem value={'services_producing'} primaryText="Services Producing"/>
            <MenuItem value={'goods_producing'} primaryText="Goods Producing"/>
          </SelectField>
          <SelectField value={this.state.industrialSegment} onChange={this.handleIndustryChange}>
          <MenuItem value={'services_producing'} primaryText="Services Producing"/>
          <MenuItem value={'goods_producing'} primaryText="Goods Producing"/>
          </SelectField>
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
