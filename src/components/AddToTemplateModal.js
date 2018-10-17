import React, { Component } from "react";
import moment from "moment";
import {
  Col,
  Input,
  Label,
  FormGroup,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
  Modal,
  ModalBody,
  ModalHeader,
  FormFeedback
} from "reactstrap";
import DatePicker from "react-datepicker";
import "../styles/react-datepicker.css";
import { handleInputChanges } from "../utilities/inputUtilities";
import {
  formatToDateString,
  formatToTimeString
} from "../utilities/dateTimeFormatter";
import "../styles/zmdi-buttons.css";

class AddToTemplateModal extends Component {
  state = {
    repeatingMode: true,
    isSunday: false,
    isMonday: false,
    isTuesday: false,
    isWednesday: false,
    isThursday: false,
    isFriday: false,
    isSaturday: false,
    inEditMode: false,
    colorTypeId: "",
    dayOfWeek: "", //dayOfWeek
    headerTextColor: "white",
    defaultBgColor: "#0f6fbc",
    colorColor: "",
    colorName: "",
    title: "",
    addEventTitle: "Add to Template",
    startDate: moment("11012015", "MMDDYYYY"), // set moment("2018-08-16"),
    startTime: moment("11012015 08:00", "MMDDYYYY HH:mm"), //new Date(new Date().setHours(new Date().getHours() + 1))), //set 24 HR moment("20:00:00.00000", "HH:mm")
    endTime: moment("11012015 10:00", "MMDDYYYY HH:mm"),
    daysDataList: [
      { id: 0, name: "Sunday", short: "Sun", letter: "S" },
      { id: 1, name: "Monday", short: "Mon", letter: "M" },
      { id: 2, name: "Tuesday", short: "Tue", letter: "T" },
      { id: 3, name: "Wednesday", short: "Wed", letter: "W" },
      { id: 4, name: "Thursday", short: "Thu", letter: "T" },
      { id: 5, name: "Friday", short: "Fri", letter: "F" },
      { id: 6, name: "Saturday", short: "Sat", letter: "S" }
    ], //new Date(new Date().setHours(new Date().getHours() + 2)))
    validation: {
      color: true,
      pickedADay: false,
      pleasePickADay: false
    }
  };

  populatecolorBox = color => {
    return (
      <option key={color.id} value={color.id}>
        {color.color}
      </option>
    );
  };

  isRepeating = () => {
    let counter = 0;

    if (this.state.isSunday === true) {
      counter += 1;
    }
    if (this.state.isMonday === true) {
      counter += 1;
    }
    if (this.state.isTuesday === true) {
      counter += 1;
    }
    if (this.state.isWednesday === true) {
      counter += 1;
    }
    if (this.state.isThursday === true) {
      counter += 1;
    }
    if (this.state.isFriday === true) {
      counter += 1;
    }
    if (this.state.isSaturday === true) {
      counter += 1;
    }
    return counter;
  };

  resetDays = () => {
    this.setState({ isSunday: false });
    this.setState({ isMonday: false });
    this.setState({ isTuesday: false });
    this.setState({ isWednesday: false });
    this.setState({ isThursday: false });
    this.setState({ isFriday: false });
    this.setState({ isSaturday: false });
  };

  getFormData = () => {
    let startDate = formatToDateString(this.state.startDate);
    let startTime = formatToTimeString(this.state.startTime);
    let endTime = formatToTimeString(this.state.endTime);
    let colorTypeId = parseInt(this.state.colorTypeId);
    const newEventData = {
      colorTypeId,
      startDate,
      startTime,
      endTime,
      start: new Date(`${startDate} ${startTime}`),
      end: new Date(`${startDate} ${endTime}`),
      dayOfWeek: parseInt(this.state.dayOfWeek),
      title: this.state.colorName
    };
    if (this.props.colorIndex[colorTypeId]) {
      newEventData.categoryId = this.props.colorIndex[colorTypeId].categoryId;
    }
    if (this.state.inEditMode) {
      newEventData.id = parseInt(this.props.selectedEvent.id);
    }
    if (this.isRepeating() >= 2) {
      newEventData.isSunday = this.state.isSunday;
      newEventData.isMonday = this.state.isMonday;
      newEventData.isTuesday = this.state.isTuesday;
      newEventData.isWednesday = this.state.isWednesday;
      newEventData.isThursday = this.state.isThursday;
      newEventData.isFriday = this.state.isFriday;
      newEventData.isSaturday = this.state.isSaturday;
    }
    return newEventData;
  };

  handleSubmission = event => {
    let { colorTypeId, dayOfWeek, startTime, endTime } = event;
    if (this.state.inEditMode) {
      this.sendUpdatedEvent(event);
    } else if (this.isRepeating() >= 2) {
      console.log("repeating event detected");
      this.props.refreshEvents();
      this.props.onClose();
      this.resetDays();
    } else {
      this.sendEventToCalendar(event);
    }
  };

  sendUpdatedEvent = event => {
    this.resetValues();
    this.props.showUpdatedEvent(event, event.start, event.end);
  };

  sendEventToCalendar = event => {
    this.resetValues();
    this.props.sendEventToCalendar(event);
  };

  resetValues = () => {
    this.setState({
      colorTypeId: "",
      dayOfWeek: "",
      colorColor: "",
      colorName: "",
      inEditMode: false,
      isSunday: false,
      isMonday: false,
      isTuesday: false,
      isWednesday: false,
      isThursday: false,
      isFriday: false,
      isSaturday: false,
      validation: {
        color: true,
        pickedADay: false,
        pleasePickADay: false
      }
      // startDate: moment("11012015", "MMDDYYYY"),
      // startTime: moment("11012015 08:00", "MMDDYYYY HH:mm"),
      // endTime: moment("11012015 10:00", "MMDDYYYY HH:mm")
    });
  };

  closeHandler = () => {
    this.props.onClose();
    this.resetValues();
  };

  updateInputValue = handleInputChanges.bind(this);

  handlecolorChange = e => {
    this.updateInputValue(e);
    this.updateModalBgColor(parseInt(e.target.value));
  };

  handleDayChange = e => {
    this.updateInputValue(e);
    this.setState({
      startDate: moment("11012015", "MMDDYYYY").add(e.target.value, "days")
    });
  };

  insertDeleteButton = () => {
    return (
      <i
        className="zmdi zmdi-delete zmdi-hc-lg pointer zbtn-lg"
        onClick={() => {
          this.props.delete(this.props.selectedEvent.id);
          this.closeHandler();
        }}
        style={{ padding: "0 0.2em 0 0.2em" }}
      />
    );
  };

  updateModalBgColor = id => {
    const colorData = this.props.colorTypes.filter(type => id === type.id);
    let colorColor = "";
    let colorName = "";
    if (colorData.length > 0) {
      colorColor = `#${colorData[0].color}`;
      colorName = colorData[0].name;
    }
    this.setState({ colorColor, colorName });
  };

  componentDidUpdate(prevProps) {
    if (this.props.start !== prevProps.start) {
      this.setState({
        startDate: moment(this.props.start),
        startTime: moment(this.props.start),
        endTime: moment(this.props.end),
        dayOfWeek: moment(this.props.start).format("e")
      });
      this.setDay(moment(this.props.start).format("e"));
    }
    if (this.props.selectedEvent !== prevProps.selectedEvent) {
      if (this.props.selectedEvent.id) {
        this.updateModalBgColor(this.props.selectedEvent.colorTypeId);
        this.setState({
          inEditMode: true,
          colorTypeId: this.props.selectedEvent.colorTypeId,
          dayOfWeek: this.props.selectedEvent.dayOfWeek,
          startTime: moment(this.props.selectedEvent.start),
          endTime: moment(this.props.selectedEvent.end)
        });
      }
    }
  }

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

  renderDayPicker = () => {
    if (this.state.repeatingMode === true && this.state.inEditMode === false) {
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
          {!this.state.inEditMode &&
            this.state.validation.pleasePickADay && (
              <small className="text-red">At least one day is required</small>
            )}
        </div>
      );
    } else {
      return (
        <div className="form-group" style={{ paddingBottom: "0.1em" }}>
          <label>Day of Week</label>
          <select
            className="custom-select form-control mx-auto"
            //style={{ width: "20em" }}
            name="dayOfWeek"
            value={this.state.dayOfWeek}
            onChange={this.handleDayChange}
          >
            {(this.state.daysDataList || []).map(day =>
              this.populatecolorBox(day)
            )}
          </select>
        </div>
      );
    }
  };

  dayToggle = e => {
    this.setState({ [e.target.name]: e.target.checked });
    setTimeout(() => {
      this.validateInputs();
    }, 300);
  };

  validateInputs = () => {
    const { colorTypeId, validation } = this.state;
    Number.isInteger(parseInt(colorTypeId))
      ? (validation.color = true)
      : (validation.color = false);
    if (!this.state.inEditMode) {
      if (this.isRepeating() === 0) {
        validation.pickedADay = false;
        validation.pleasePickADay = true;
      } else {
        validation.pickedADay = true;
        validation.pleasePickADay = false;
      }
    }
    this.setState({ validation });
  };

  allValid = () => {
    const { validation } = this.state;
    if (this.state.inEditMode) {
      if (validation.color) {
        return true;
      } else {
        return false;
      }
    }
    if (!this.state.inEditMode && validation.color && validation.pickedADay) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { modalOpen, colorTypes } = this.props;
    return (
      <React.Fragment>
        <Modal
          style={{
            maxWidth: 400,
            minWidth: "25em",
            position: "relative",
            top: "0" // original 25
          }}
          isOpen={modalOpen}
          toggle={() => this.closeHandler()}
          modalTransition={{ timeout: 10 }}
          backdropTransition={{ timeout: 10 }}
          //className={this.props.className} // this will auto-size the modal if enabled
        >
          <ModalHeader
            style={{
              width: "100%",
              color: this.state.headerTextColor,
              float: "right",
              backgroundColor:
                this.state.colorColor || this.state.defaultBgColor
            }}
          >
            &nbsp;
            {/*NEED THIS TO FLOAT RIGHT*/}
            <div style={{ position: "relative", top: "-0.3em" }}>
              {this.state.inEditMode && this.insertDeleteButton()}
              &nbsp;&nbsp;&nbsp;
              <i
                className="zmdi zmdi-close zmdi-hc-lg pointer zbtn-lg"
                onClick={() => this.closeHandler()}
              />
            </div>
            {/* <span className="text-center mx-auto">{event.title}</span> */}
          </ModalHeader>
          <ModalHeader
            style={{
              position: "relative",
              top: "-1.74em",
              width: "100%",
              color: this.state.headerTextColor,
              backgroundColor:
                this.state.colorColor || this.state.defaultBgColor
            }}
          >
            <div
              className="text-center mx-auto"
              style={{
                position: "relative",
                top: "-0.4em",
                marginBottom: "-0.1em",
                float: "right"
              }}
            >
              <big className="text-center">
                {this.state.colorName || this.state.addEventTitle}
              </big>
            </div>
          </ModalHeader>
          <ModalBody
            style={{
              position: "relative",
              top: "-0.5em",
              marginBottom: "-0.9em"
            }}
          >
            <ListGroup>
              <ListGroupItem className="border-0">
                <div
                  className="mx-auto"
                  style={{ position: "relative", top: "-1em" }}
                >
                  <FormGroup>
                    <Label>Event Title</Label>
                    <Input
                      type="text"
                      name="title"
                      value={this.state.title}
                      onChange={e => {
                        this.setState({ [e.target.name]: e.target.value }, () =>
                          this.validateInputs()
                        );
                      }}
                      invalid={!this.state.validation.color}
                    />
                    <FormFeedback valid />
                    <FormFeedback>This field is required</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>color</Label>
                    <Input
                      type="select"
                      name="colorTypeId"
                      value={this.state.colorTypeId}
                      onChange={e => {
                        this.setState({ [e.target.name]: e.target.value }, () =>
                          this.validateInputs()
                        );
                      }}
                      invalid={!this.state.validation.color}
                    >
                      <option>Select a color</option>
                      {(this.props.googleColors || []).map(color =>
                        this.populatecolorBox(color)
                      )}
                    </Input>
                    <FormFeedback valid />
                    <FormFeedback>This field is required</FormFeedback>
                  </FormGroup>
                  {this.renderDayPicker()}
                  <div
                    className="form-group"
                    style={{ minWidth: "22em", marginBottom: "-0.0em" }}
                  >
                    <label>Start/End Times</label>
                    <div className="form-row">
                      <div
                        className="col"
                        style={{ maxWidth: "25%", minWidth: "8em" }}
                      >
                        <DatePicker
                          selected={this.state.startTime}
                          onChange={time => {
                            if (time > this.state.endTime) {
                              this.setState({
                                startTime: time,
                                endTime: moment(time).add(15, "minutes")
                              });
                            } else {
                              this.setState({
                                startTime: time
                                //endTime: moment(time).add(1, "hour")
                              });
                            }
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          className="form-control text-center"
                          minTime={moment("11012015 05:00", "MMDDYYYY HH:mm")}
                          maxTime={moment("11012015 23:30", "MMDDYYYY HH:mm")}
                          dateFormat="LT"
                        />
                      </div>
                      <div
                        className="col text-center"
                        style={{
                          maxWidth: "8%",
                          minWidth: "1em",
                          marginTop: "0.6em"
                        }}
                      >
                        <label>to</label>
                      </div>
                      <div
                        className="col"
                        style={{ maxWidth: "25%", minWidth: "8em" }}
                      >
                        <DatePicker
                          selected={this.state.endTime}
                          onChange={time =>
                            this.setState({
                              //startTime: time,
                              endTime: time //moment(time).add(1, "hour")
                            })
                          }
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          minTime={moment(
                            `11012015 ${moment(this.state.startTime)
                              .add(15, "minutes")
                              .format("HH:mm")}`,
                            "MMDDYYYY HH:mm"
                          )}
                          maxTime={moment("11012015 23:59", "MMDDYYYY HH:mm")}
                          className="form-control text-center"
                          dateFormat="LT"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.validateInputs();
                      if (this.allValid()) {
                        this.handleSubmission(this.getFormData());
                      }
                    }}
                  >
                    {(this.state.inEditMode && "Save") || "Add"}
                  </button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddToTemplateModal;
