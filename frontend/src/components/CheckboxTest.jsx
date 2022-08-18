import React, { Component } from "react";

export default class Checkbox extends Component {
  render() {
    const { _id, title, name, handleChange, checked } = this.props;

    return (
      <div>
        <input
          id={_id}
          type="checkbox"
          name={name}
          onChange={handleChange}
          checked={checked}
        />
        <label htmlFor={_id}>{title}</label>
      </div>
    );
  }
}