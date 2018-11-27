import React, { Component } from "react";
import { Label, FormGroup, FormFeedback } from "reactstrap";

class MultiDayPicker extends Component {
  state = {
    isSunday: false,
    isMonday: false,
    isTuesday: false,
    isWednesday: false,
    isThursday: false,
    isFriday: false,
    isSaturday: false,
    selectedDays: []
  };

  dayToggle = e => {
    this.setState({ [e.target.name]: e.target.checked });
    // setTimeout(() => {
    //   this.validateInputs();
    // }, 300);
  };

  resetDays = () => {
    let isSunday = false;
    let isMonday = false;
    let isTuesday = false;
    let isWednesday = false;
    let isThursday = false;
    let isFriday = false;
    let isSaturday = false;
    let selectedDays = [];
    this.setState({
      isSunday,
      isMonday,
      isTuesday,
      isWednesday,
      isThursday,
      isFriday,
      isSaturday,
      selectedDays
    });
  };

  getSelectedDays = () => {
    let selectedDays = [];
    const {
      isSunday,
      isMonday,
      isTuesday,
      isWednesday,
      isThursday,
      isFriday,
      isSaturday
    } = this.state;

    if (isSunday) selectedDays.push(0);
    if (isMonday) selectedDays.push(1);
    if (isTuesday) selectedDays.push(2);
    if (isWednesday) selectedDays.push(3);
    if (isThursday) selectedDays.push(4);
    if (isFriday) selectedDays.push(5);
    if (isSaturday) selectedDays.push(6);

    return selectedDays;
  };

  setDay = day => {
    switch (day) {
      case "0":
        this.setState({ isSunday: true });
        break;
      case "1":
        this.setState({ isMonday: true });
        break;
      case "2":
        this.setState({ isTuesday: true });
        break;
      case "3":
        this.setState({ isWednesday: true });
        break;
      case "4":
        this.setState({ isThursday: true });
        break;
      case "5":
        this.setState({ isFriday: true });
        break;
      case "6":
        this.setState({ isSaturday: true });
        break;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) console.log(this.getSelectedDays());
    if (this.props.dayOfWeek !== prevProps.dayOfWeek) {
      this.setDay(this.props.dayOfWeek);
    }
  }

  render() {
    return (
      <div className="weekDays-selector">
        <Label style={{ paddingBottom: "0.8em" }}>
          Select additional days for a repeating event.
        </Label>

        <FormGroup className="d-flex justify-content-center">
          <input
            type="checkbox"
            id="weekday-sun"
            name="isSunday"
            checked={this.state.isSunday}
            onChange={this.dayToggle}
            className="weekday"
          />
          <label htmlFor="weekday-sun">S</label>
          <input
            type="checkbox"
            id="weekday-mon"
            name="isMonday"
            checked={this.state.isMonday}
            onChange={this.dayToggle}
            className="weekday"
          />
          <label htmlFor="weekday-mon">M</label>
          <input
            type="checkbox"
            id="weekday-tue"
            name="isTuesday"
            checked={this.state.isTuesday}
            onChange={this.dayToggle}
            className="weekday"
          />
          <label htmlFor="weekday-tue">T</label>
          <input
            type="checkbox"
            id="weekday-wed"
            name="isWednesday"
            checked={this.state.isWednesday}
            onChange={this.dayToggle}
            className="weekday"
          />
          <label htmlFor="weekday-wed">W</label>
          <input
            type="checkbox"
            id="weekday-thu"
            name="isThursday"
            checked={this.state.isThursday}
            onChange={this.dayToggle}
            className="weekday"
          />
          <label htmlFor="weekday-thu">TH</label>
          <input
            type="checkbox"
            id="weekday-fri"
            name="isFriday"
            checked={this.state.isFriday}
            onChange={this.dayToggle}
            className="weekday"
          />
          <label htmlFor="weekday-fri">F</label>
          <input
            type="checkbox"
            id="weekday-sat"
            name="isSaturday"
            checked={this.state.isSaturday}
            onChange={this.dayToggle}
            className="weekday"
          />
          <label htmlFor="weekday-sat">S</label>
        </FormGroup>
      </div>
    );
  }
}

export default MultiDayPicker;
