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
    const res = await axios.get(
      "http://localhost:4000/api/medicalFacility/viewFacilitiesPractitioner"
    );
    const info = res.data.hospitalList;
    const options = info.map((data) => ({
      _id: data._id,
      hHame: data.hospitalName,
    }));
    this.setState({ selectOptions: options });
  }
  handleSelect(e) {
    this.setState({ id: e._id, name: e.hName });
  }

  componentDidMount() {
    console.log("Mounted");
    this.getOptions();
  }

  render() {
    //console.clear();
    console.log("here we go: " + this.state.selectOptions);
    return (
      <div>
        {/* <select
          options={this.state.selectOptions}
          onChange={this.handleSelect.bind(this)}
        ></select> */}
      </div>
    );
  }
}
