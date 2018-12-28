import React, { Component } from "react";
import moment from "moment";
import {
  Input,
  Label,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
  FormFeedback
} from "reactstrap";
import DatePicker from "react-datepicker";
import { handleInputChanges } from "../utilities/inputUtilities";
import { formatToTimeString } from "../utilities/dateTimeFormatter";
import MultiDayPicker from "./MultiDayPicker";
import ColorPicker from "./ColorPicker";
import daysOfWeek from "../data/daysOfWeek";
import "../styles/react-datepicker.css";
import "../styles/zmdi-buttons.css";

class AddToTemplateModal extends Component {
  state = {
    selectedDays: [],
    inEditMode: false,
    colorTypeId: "9",
    dayOfWeek: "",
    headerTextColor: "white",
    defaultBgColor: "#5484ed",
    modalHeaderColor: "",
    title: "",
    addEventTitle: "Add to Your Schedule",
    startDate: moment("11012015", "MMDDYYYY"),
    startTime: moment("11012015 08:00", "MMDDYYYY HH:mm"),
    endTime: moment("11012015 10:00", "MMDDYYYY HH:mm"),
    validation: {
      color: true,
      pickedADay: false,
      pleasePickADay: false,
      title: true
    }
  };

  populateDaysBox = dayOfWeek => {
    return (
      <option key={dayOfWeek.id} value={dayOfWeek.id}>
        {dayOfWeek.name}
      </option>
    );
  };

  setSelectedDays = selectedDays => {
    this.setState({ selectedDays }, () => {
      if (selectedDays.length !== 0 && this.state.validation.pleasePickADay)
        this.validateInputs();
    });
  };

  getFormData = () => {
    let startTime = formatToTimeString(this.state.startTime);
    let endTime = formatToTimeString(this.state.endTime);
    let colorTypeId = parseInt(this.state.colorTypeId);
    const newEventData = {
      colorTypeId,
      startTime,
      endTime,
      dayOfWeek: parseInt(this.state.dayOfWeek),
      title: this.state.title
    };
    return newEventData;
  };

  handleSubmission = event => {
    if (this.state.inEditMode) {
      this.sendUpdatedEvent(this.props.selectedEvent, event);
    } else {
      let newEvents = this.state.selectedDays.map(day => {
        let dayOfWeek = day;
        let { colorTypeId, title, startTime, endTime } = event;
        return { colorTypeId, title, startTime, endTime, dayOfWeek };
      });
      this.sendEventToCalendar(newEvents);
    }
  };

  sendUpdatedEvent = (original, event) => {
    this.resetValues();
    this.props.showUpdatedEvent(original, event);
  };

  sendEventToCalendar = event => {
    this.resetValues();
    this.props.sendEventToCalendar(event);
  };

  resetValues = () => {
    this.setState({
      //colorTypeId: "9",
      dayOfWeek: "",
      //modalHeaderColor: "",
      title: "",
      inEditMode: false,
      selectedDays: [],
      validation: {
        color: true,
        pickedADay: false,
        pleasePickADay: false,
        title: true
      }
    });
  };

  closeHandler = () => {
    this.props.onClose();
    this.resetValues();
  };

  updateInputValue = handleInputChanges.bind(this);

  setSelectedColor = colorTypeId => {
    this.setState({ colorTypeId });
    this.updateModalBgColor(colorTypeId);
  };

  handleDayChange = e => {
    this.updateInputValue(e);
    this.setState({
      startDate: moment("11012015", "MMDDYYYY").add(e.target.value, "days")
    });
  };

  insertDeleteButton = () => {
    if (this.state.inEditMode === true) {
      return (
        <button
          className="btn btn-danger"
          onClick={() => {
            this.props.delete(this.props.selectedEvent);
            this.closeHandler();
          }}
        >
          Delete
        </button>
      );
    }
  };

  updateModalBgColor = id => {
    let modalHeaderColor = this.props.colorIndex[id].color;
    this.setState({ modalHeaderColor });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.start !== prevProps.start ||
      this.props.end !== prevProps.end
    ) {
      this.setState({
        startDate: moment(this.props.start),
        startTime: moment(this.props.start),
        endTime: moment(this.props.end),
        dayOfWeek: moment(this.props.start).format("e")
      });
    }
    if (this.state.selectedDays !== prevState.selectedDays) {
      //this.validateInputs();
    }
    if (this.props.selectedEvent !== prevProps.selectedEvent) {
      let {
        colorTypeId,
        dayOfWeek,
        start,
        end,
        title
      } = this.props.selectedEvent;
      if (colorTypeId) {
        this.updateModalBgColor(colorTypeId);
        this.setState({
          inEditMode: true,
          title,
          colorTypeId,
          dayOfWeek,
          startTime: moment(start),
          endTime: moment(end)
        });
      }
    }
  }

  renderDayPicker = () => {
    if (this.state.inEditMode === false) {
      return (
        <MultiDayPicker
          dayOfWeek={this.state.dayOfWeek}
          sendSelectedDays={this.setSelectedDays}
          valid={this.state.validation.pleasePickADay}
          listOfDays={daysOfWeek}
        />
      );
    } else {
      return (
        <div className="form-group" style={{ paddingBottom: "0.1em" }}>
          <label>Day of Week</label>
          <select
            className="custom-select form-control mx-auto"
            name="dayOfWeek"
            value={this.state.dayOfWeek}
            onChange={this.handleDayChange}
          >
            {daysOfWeek.map(day => this.populateDaysBox(day))}
          </select>
        </div>
      );
    }
  };

  validateInputs = () => {
    const {
      colorTypeId,
      validation,
      inEditMode,
      selectedDays,
      title
    } = this.state;
    title.length > 0 ? (validation.title = true) : (validation.title = false);
    Number.isInteger(parseInt(colorTypeId))
      ? (validation.color = true)
      : (validation.color = false);
    if (!inEditMode) {
      if (selectedDays.length === 0) {
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
    if (
      !this.state.inEditMode &&
      validation.color &&
      validation.pickedADay &&
      validation.title
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { modalOpen } = this.props;
    return (
      <React.Fragment>
        <Modal
          style={{
            maxWidth: 400,
            minWidth: "25em",
            position: "relative",
            top: "10" // original 25
          }}
          isOpen={modalOpen}
          toggle={() => this.closeHandler()}
          modalTransition={{ timeout: 10 }}
          backdropTransition={{ timeout: 10 }}
          //className={this.props.className} // this will auto-size the modal if enabled
        >
          <ModalHeader
            style={{
              position: "relative",
              paddingTop: "2em",
              width: "100%",
              color: this.state.headerTextColor,
              backgroundColor:
                this.state.modalHeaderColor || this.state.defaultBgColor
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
                &nbsp;
                {(this.state.inEditMode && "Edit Your Saved Event") ||
                  this.state.addEventTitle}
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
                  style={{ marginTop: "0.6em", paddingBottom: "1.4em" }}
                >
                  <FormGroup>
                    <Label>Event Name</Label>
                    <Input
                      type="text"
                      name="title"
                      value={this.state.title}
                      onChange={e => {
                        this.setState({ [e.target.name]: e.target.value }, () =>
                          this.validateInputs()
                        );
                      }}
                      invalid={!this.state.validation.title}
                    />
                    <FormFeedback valid />
                    <FormFeedback>This field is required</FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <ColorPicker
                      colorList={this.props.googleColors}
                      selectedColor={this.state.modalHeaderColor}
                      defaultColor={this.state.defaultBgColor}
                      setSelectedColor={this.setSelectedColor}
                    />
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
                          onChange={startTime => {
                            if (startTime > this.state.endTime) {
                              this.setState({
                                startTime,
                                endTime: moment(startTime).add(15, "minutes")
                              });
                            } else {
                              this.setState({ startTime });
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
                          onChange={endTime => this.setState({ endTime })}
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
                  {this.insertDeleteButton()}
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.validateInputs();
                      if (this.allValid()) {
                        const data = this.getFormData();
                        this.handleSubmission(data);
                      }
                    }}
                  >
                    {(this.state.inEditMode && "Update") || "Add"}
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
