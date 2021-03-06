import axios from "axios";
import React, { Component } from "react";
import Select from "react-select";
/**
 * @name PractitionerSelect
 * @summary this controls the selection element within the app
 * @author Liam McLaughlin
 */
export default class PractionerHospitalSelect extends Component {
  /**
   * @constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      value: "",
      label: "",
    };
  }
/**
 * @function getOptions Here we generate a list of all hospitals and assoicate a name value pair with each.
 */
  async getOptions() {
    //get all hospitals
    const res = await axios.get(
      "http://localhost:4000/api/medicalFacility/viewFacilitiesPractitioner"
    );
    //store all data from hospital request in a list
    const info = res.data.hospitalList;
    //options will be used to set state
    const options = info.map((data) => ({
      value: data._id,
      label: data.hospitalName,
    }));
    //setstate selectOptions

    this.setState({ selectOptions: options });
    //console.log(this.state.selectOptions);
  }
  /**
   * @function handleSelect On user select we will setState
   * @param {*} e
   */
  handleSelect(e) {
    this.setState({ value: e.value, label: e.label });
    //onClick={(e) => childToParent(e.target.value)}
    this.props.childToParent(e.value);
    //alert("State is now: " + e.value + ", " + e.label);
  }

  componentDidMount() {
    // console.log("Mounted");
    this.getOptions();
  }

  render() {

    return (
      <div>
        <Select
          onChange={this.handleSelect.bind(this)}
          options={this.state.selectOptions}
          isSearchable={true}
          autoFocus
          placeholder="Select Hospital"
        ></Select>
      </div>
    );
  }
}
