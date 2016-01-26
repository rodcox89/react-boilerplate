import './floating_label_textarea.scss'
import React from 'react'

const FloatingLabelTextArea = React.createClass({
  getDefaultProps() {
    return {
      value: '',
      label: '',
      placeholder: '',
      color: '',
      onChange: function () {}
    }
  },

  showLabel(element) {
    let label = element.previousSibling;
    if (element.value.length > 0) {
      label.style.opacity = 1;
      label.style.top = 0;
    } else {
      label.style.opacity = 0;
      label.style.top = '5px';
    }
  },

  handleChange(e) {
    this.props.onChange(e, () => {
      this.showLabel(e.target);
    });
  },

  render() {
    let type = this.props.type ? this.props.type : 'text'

    return (
      <div className="Floating-Label-Input">
        <label className="control-label">{this.props.label}</label>
        <textarea
          type={type}
          className={"form-control " + this.props.color}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          value={this.props.value} />
      </div>
    )
  }
})

export default FloatingLabelTextArea
