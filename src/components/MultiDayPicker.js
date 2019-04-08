import React, { Component } from "react";
import { Label, FormGroup } from "reactstrap";

class MultiDayPicker extends Component {
  state = {
    selectedDays: []
  };

  dayToggle = e => this.setState({ [e.target.name]: e.target.checked });

  getSelectedDays = () => {
    let selectedDays = [];
    this.props.listOfDays.forEach(day => {
      if (this.state[day.name]) {
        selectedDays.push(day.id);
      }
    });
    return selectedDays;
  };

  setDay = day => {
    if (day) {
      const index = parseInt(day, 10);
      const selectedDay = this.props.listOfDays[index].name;
      this.setState({ [selectedDay]: true });
    }
  };

  renderDayButton = day => {
    return (
      <React.Fragment key={day.id}>
        <input
          type="checkbox"
          id={day.name}
          name={day.name}
          checked={this.state[day.name] || false}
          onChange={this.dayToggle}
          className="weekday"
        />
        <label htmlFor={day.name}>{day.letter}</label>
      </React.Fragment>
    );
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
    return (
      <div className="weekDays-selector">
        <Label style={{ paddingTop: "0.2em", paddingBottom: "0.2em" }}>
          Select multiple days for a repeating event
        </Label>

        <FormGroup className="d-flex justify-content-center">
          {(this.props.listOfDays || []).map(day => this.renderDayButton(day))}
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
