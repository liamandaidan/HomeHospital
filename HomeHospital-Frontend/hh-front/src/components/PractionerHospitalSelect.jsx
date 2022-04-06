import axios from "axios";
import React, { Component } from "react";
import Select from "react-select";
export default class PractionerHospitalSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      id: "",
      name: "",
    };
  }

  async getOptions() {
    //get all hospitals
    const res = await axios.get(
      "http://localhost:4000/api/medicalFacility/viewFacilitiesPractitioner"
    );
    //store all data from hospital request in a list
    const info = res.data.hospitalList;
    //options will be used to set state
    const options = info.map((data) => ({
      _id: data._id,
      hospitalName: data.hospitalName,
    }));
    //setstate selectOptions
    this.setState({ selectOptions: options });
  }
  /**
   * On user select we will setState
   * @param {*} e
   */
  handleSelect(e) {
    this.setState({ id: e._id, name: e.hospitalName });
    alert("State is now: " + e._id + ", " + e.hospitalName);
  }

  componentDidMount() {
    // console.log("Mounted");
    this.getOptions();
  }

  render() {
    /**
     * Here we display our table rows
     */
    const DisplaySelect = this.state.selectOptions.map((data) => {
      return (
        <option key={data._id} id={data._id} name={data.hospitalName}>
          {data.hospitalName}
        </option>
      );
    });

    return (
      <div>
         <Select
          onChange={this.handleSelect.bind(this)}
          options={this.state.selectOptions}
          isClearable={true}
        ></Select> 
      </div>
    );
  }
}
