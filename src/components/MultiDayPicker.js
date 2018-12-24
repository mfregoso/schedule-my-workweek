import React, { Component } from "react";
import { Label, FormGroup } from "reactstrap";

class MultiDayPicker extends Component {
  state = {
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    selectedDays: []
  };

  dayToggle = e => this.setState({ [e.target.name]: e.target.checked });

  getSelectedDays = () => {
    let selectedDays = [];
    const {
      Sunday,
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday
    } = this.state;

    if (Sunday) selectedDays.push(0);
    if (Monday) selectedDays.push(1);
    if (Tuesday) selectedDays.push(2);
    if (Wednesday) selectedDays.push(3);
    if (Thursday) selectedDays.push(4);
    if (Friday) selectedDays.push(5);
    if (Saturday) selectedDays.push(6);

    return selectedDays;
  };

  setDay = day => {
    if (day) {
      const index = parseInt(day, 10);
      const selectedDay = this.props.listOfDays[index].name;
      this.setState({ [selectedDay]: true });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      let daysOfWeek = this.getSelectedDays();
      this.props.sendSelectedDays(daysOfWeek);
    }
    if (this.props.dayOfWeek !== prevProps.dayOfWeek) {
      this.setDay(this.props.dayOfWeek);
    }
  }

  render() {
    const renderDayButton = day => {
      return (
        <React.Fragment key={day.id}>
          <input
            type="checkbox"
            id={day.name}
            name={day.name}
            checked={this.state[day.name]}
            onChange={this.dayToggle.bind(this)}
            className="weekday"
          />
          <label htmlFor={day.name}>{day.letter}</label>
        </React.Fragment>
      );
    };

    return (
      <div className="weekDays-selector">
        <Label style={{ paddingTop: "0.2em", paddingBottom: "0.2em" }}>
          Select multiple days for a repeating event
        </Label>

        <FormGroup className="d-flex justify-content-center">
          {(this.props.listOfDays || []).map(day => renderDayButton(day))}
        </FormGroup>
        {this.props.valid && (
          <small
            className="text-danger"
            style={{ position: "relative", top: "-1em" }}
          >
            At least one day is required
          </small>
        )}
      </div>
    );
  }
}

export default MultiDayPicker;
