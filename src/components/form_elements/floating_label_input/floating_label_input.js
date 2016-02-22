import './floating_label_input.scss'
import React from 'react'
import DebounceInput from 'react-debounce-input'
import MaterialDom from 'material-ui/lib/utils/dom'

const FloatingLabelInput = React.createClass({
  getDefaultProps() {
    return {
      value: '',
      label: '',
      placeholder: '',
      color: '',
      isDisabled: 'false',
      onChange: function () {}
    }
  },

  showLabel(element) {
    //let label = element.previousSibling;
    if (element.value.length > 0) {
      MaterialDom.addClass(element.parentElement, 'active');
      //element.parentElement.MaterialDom.addClass('active');
      // label.style.opacity = 0.3;
      // label.style.top = 0;
    } else {
      MaterialDom.removeClass(element.parentElement, 'active');
      //element.parentElement.MaterialDom.removeClass('active');
      // label.style.opacity = 0.3;
      // label.style.top = '5px';
    }
  },

  handleChange(e) {
    this.props.onChange(e, () => {
      //
      this.showLabel(e.target);
    });
  },

  render() {
    let type = this.props.type ? this.props.type : 'text'

    return (
      <div className={"Floating-Label-Input " + this.props.wrapperClassName}>
        <label className="control-label">{this.props.label}</label>
        <DebounceInput
          debounceTimeout={300}
          type={type}
          className={"form-control " + this.props.color}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          value={this.props.value}
          disabled={this.props.isDisabled ? "disabled" : false}
           />
      </div>
    )
  }
})

export default FloatingLabelInput
