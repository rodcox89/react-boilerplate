import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import SoftwarePatchingRowDataSyles from './row-data.css'
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/DropDownMenu';
import Checkbox from 'material-ui/lib/checkbox';
import MenuItem from 'material-ui/lib/menus/menu-item';
import CircularProgress from 'material-ui/lib/circular-progress';

const items = [
  <option key={1} id='info' value={'info'} label="Info" primaryText="Info"/>,
  <option key={2} id='pass' value={'pass'} label="Pass" primaryText="Pass"/>,
  <option key={3} id='ignore' value={'ignore'} label="Ignore" primaryText="Ignore"/>,
  <option key={4} id='fail' value={'fail'} label="Fail" primaryText="Fail"/>,
];


let confidence = []

for (var i=0; i <= 100; i += 1){
  confidence[i] = <option key={i} id={i} value={i} label={i} primaryText={i} />

}


const Row = React.createClass({
  getDefaultProps(){
    return {
      index: 0,
      ip_addr: '',
      analyst_type: '',
      analyst_subtype: '',
      analyst_display_name_short: '',
      analyst_display_name_long: '',
      analyst_data_description: '',
      analyst_data_value: '',
      analyst_status: '',
      analyst_confidence: '',
      analyst_comments: '',
      analyst_include: '',
      host_name: '',
      domain_name: '',

    }
  },
  getInitialState(){
    return {
      isInput :  false,
      unique_key: this.props.finding.unique_key,
      analysis_id: this.props.finding.analysis_id,
      security_criteria: this.props.finding.security_criteria,
      ip_addr : this.props.finding.ip_addr,
      analyst_type : this.props.finding.analyst_type,
      analyst_subtype : this.props.finding.analyst_subtype,
      analyst_display_name_short : this.props.finding.analyst_display_name_short,
      analyst_display_name_long : this.props.finding.analyst_display_name_long,
      analyst_data_description : this.props.finding.analyst_data_description,
      analyst_data_value : this.props.finding.analyst_data_value,
      analyst_status : this.props.finding.analyst_status,
      analyst_confidence : this.props.finding.analyst_confidence,
      host_name : this.props.finding.host_name,
      domain_name : this.props.finding.domain_name,
      analyst_comments : this.props.finding.analyst_comments,
      analyst_include : this.props.finding.analyst_include,
      checked: true,
      temp : {
        analyst_comments: this.props.finding.analyst_comments,
        analyst_confidence: this.props.finding.analyst_confidence,
        analyst_status: this.props.finding.analyst_status,

      }
    }
  },
  onChange(e) {
    this.setState({[e.target.id]: e.target.value})
  },
  onEdit(e){
    this.setState({isInput: true})

  },
  onSave(e){
    let submission = {
      analyst_comments: this.state.analyst_comments,
      analyst_confidence: this.state.analyst_confidence,
      analyst_status: this.state.analyst_status,
      unique_key: this.state.unique_key,
      analysis_id: this.state.analysis_id,
    }

    $.ajax({
    type: 'PUT',
    url: 'http://opsapi.riskrecon.com:5010/v1/findings',
    crossDomain: true,
    data: JSON.stringify(submission),
    dataType: 'json',
    contentType: 'application/json',
    success: (data) => {
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
  this.setState({isInput: false})
},
  viewRawValue(e){
  },
  handleStatusChange(e){
    this.setState({analyst_status: e.target.selectedOptions[0].id})

  },
  handleConfidenceChange(e){

    this.setState({analyst_confidence: e.target.selectedOptions[0].id})

   },
  handleExclude(e){
    this.finding.props.finding.analyst_include = e.target.checked

   },

   delete(e){
     e.preventDefault();
     let f = this.props

     let f1 = this.props.finding

     this.props.delete(f)

   },


  render: function () {
    let isChecked;
    if(this.state.analyst_include === 'true') {isChecked = false}
    else {
      isChecked = true
    }
    var el
    if (this.state.isInput){
      el = <tr>
        <td >{this.props.finding.security_criteria}</td>
            <td>{this.props.finding.analyst_display_name_long}/> </td>
            <td>{this.props.finding.analyst_data_value}/></td>
            <td>{this.props.finding.host_name} </td>
            <td>{this.props.finding.ip_addr}</td>
            <td>
              <select id="analyst_status" value={this.state.analyst_status} onChange={this.handleStatusChange}>
                { items }
              </select>
            </td>
            <td>
              <select id="analyst_confidence" value={this.state.analyst_confidence} onChange={this.handleConfidenceChange}>
                { confidence }
                </select>
             </td>
            <td><textarea name="analyst_comments" id="analyst_comments" value={this.state.analyst_comments} onChange={this.onChange}/></td>
            <td><RaisedButton onClick={this.onSave} label="Save" /></td>
            <td>
            <RaisedButton onClick={this.delete} label="Delete"/>
            <Checkbox
                onCheck={this.handleExclude}
                defaultChecked={isChecked}/>
            </td>
          </tr>
    }
    else {
      el = <tr>
              <td>{this.state.security_criteria}</td>
              <td>{this.state.analyst_display_name_long}</td>
              <td>{this.state.analyst_data_value}</td>
              <td>{this.state.host_name}</td>
              <td>{this.state.ip_addr}</td>
              <td>{this.state.analyst_status}</td>
              <td>{this.state.analyst_confidence}</td>
              <td>{ this.state.analyst_comments}</td>
              <td><RaisedButton onClick={this.onEdit} label="Edit"/></td>
              <td>
                              <RaisedButton onClick={this.delete} label="Delete"/>
             </td>


          </tr>
    }
    return (
      el
    )
  }
})

export default Row;
