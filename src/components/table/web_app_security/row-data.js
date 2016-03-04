import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import SoftwarePatchingRowDataSyles from './../row-data.css'
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/DropDownMenu';
import Checkbox from 'material-ui/lib/checkbox';
import MenuItem from 'material-ui/lib/menus/menu-item';
import CircularProgress from 'material-ui/lib/circular-progress';
import DebounceInput from 'react-debounce-input';

const items = [
  <option key={1} id='info' value={'info'} label="Info" primaryText="Info"/>,
  <option key={2} id='pass' value={'pass'} label="Pass" primaryText="Pass"/>,
  <option key={3} id='ignore' value={'ignore'} label="Ignore" primaryText="Ignore"/>,
  <option key={4} id='fail' value={'fail'} label="Fail" primaryText="Fail"/>,
];


let confidence = []

for (var x=0; x <= 100; x += 1){
  confidence[x] = <option key={x} id={x} value={x} label={x} primaryText={x} />

}


const Row = React.createClass({
  getDefaultProps(){
    return {
          index: 0,
          show: false,
          finding: {
            analysis_id: '',
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
            isInput: false,
          }

    }
  },
  getInitialState(){
    return {
      isInput: false,
  }
},
  onSave(e){
    let submission = {
      analyst_comments: this.props.finding.analyst_comments,
      analyst_confidence: this.props.finding.analyst_confidence,
      analyst_status: this.props.finding.analyst_status,
      unique_key: this.props.finding.unique_key,
      analysis_id: this.props.finding.analysis_id,
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
  onEdit(e){
    e.preventDefault()
    this.setState({isInput: true})
    // this.setState({isInput: true})
    // let finding = this.props.finding
    // let index = this.props.index
    // let input = this.props.isInput
    // this.props.onEdit(finding, e, index, input)
  },
  handleStatusChange(e){
    e.preventDefault();
    let status = this.props.finding
    let index = this.props.index
    this.props.handleStatusChange(status, e, index)
  },
  handleConfidenceChange(e){
    e.preventDefault();
    let index = this.props.index
    let choice = this.props.finding
    this.props.handleConfidenceChange(choice, e, index)
   },

   handleCommentChange(event) {
     let index = this.props.index
     let comment = this.props.analyst_comment
     this.props.handleCommentChange(comment, event, index)
   },
  handleExclude(e){
    this.finding.props.finding.analyst_include = e.target.checked
   },

   delete(e){
     e.preventDefault()
     let index = this.props.index
     let finding = this.props.finding
     this.props.delete(finding, e, index)

   },


  render: function () {
    let isChecked;
    if(this.props.finding.analyst_include === 'true') {isChecked = false}
    else {
      isChecked = true
    }
    var el
    if (this.state.isInput){
      el = <tr className="finding-row">
        <td >{this.props.finding.security_criteria}</td>
            <td>{this.props.finding.analyst_type} </td>
            <td>{this.props.finding.analyst_subtype} </td>
            <td>{this.props.finding.analyst_display_name_long} </td>
            <td>{this.props.finding.analyst_data_description} </td>
            <td>{this.props.finding.analyst_data_value}</td>
            <td>{this.props.finding.ip_addr}</td>
            <td>{this.props.finding.host_name} </td>
            <td>
              <select id="analyst_status" defaultValue={this.props.finding.analyst_status} onChange={this.handleStatusChange}>
                { items }
              </select>
            </td>
            <td>
              <select id="analyst_confidence" defaultValue={this.props.finding.analyst_confidence} onChange={this.handleConfidenceChange}>
                { confidence }
                </select>
             </td>
            <td><RaisedButton onClick={this.onSave} label="Save" /></td>
          </tr>
    }
    else {
      el = <tr className="finding-row">
              <td>{this.props.finding.security_criteria}</td>
              <td>{this.props.finding.analyst_type}</td>
              <td>{this.props.finding.analyst_subtype}</td>
              <td>{this.props.finding.analyst_display_name_long}</td>
              <td>{this.props.finding.analyst_data_description}</td>
              <td>{this.props.finding.analyst_data_value}</td>
              <td>{this.props.finding.ip_addr}</td>
              <td>{this.props.finding.host_name}</td>
              <td>{this.props.finding.analyst_status}</td>
              <td>{this.props.finding.analyst_confidence}</td>
              <td>
                <i onClick={this.onEdit}  className="fa fa-edit fa-2x finding-action"></i>
                <i onClick={this.delete}  className="fa fa-trash-o fa-2x finding-action"></i>
              </td>


          </tr>
    }
    return (
      el
    )
  }
})

export default Row;
