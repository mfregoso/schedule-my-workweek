import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./styles/custom-calendar.css";
//import "react-big-calendar/lib/css/react-big-calendar.css";
import QuickCreateModal from "./components/AddToTemplateModal";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import googleColors from "./data/googleColors";

const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const localizer = BigCalendar.momentLocalizer(moment);

const colorIndex = colorTypes => {
  // transform array of colors into one object (to be used as an index for O(1) efficiency)
  const colorIndex = {};
  const colorKeys = Object.keys(colorTypes[0]).filter(key => key !== "id");
  for (const color of colorTypes) {
    const colorData = {};
    colorKeys.forEach(key => {
      colorData[key] = color[key];
    });
    colorIndex[color.id] = colorData;
  }
  return colorIndex;
};

class App extends Component {
  state = {
    events: [],
    colorIndex: colorIndex(googleColors),
    quickCreateModal: false,
    selectedEvent: {},
    newStartTime: null,
    newEndTime: null,
    pageSettings: {
      daysOfWeek: [
        { id: 0, name: "Sunday", short: "Sun", abbr: "S" },
        { id: 1, name: "Monday", short: "Mon", abbr: "M" },
        { id: 2, name: "Tuesday", short: "Tue", abbr: "T" },
        { id: 3, name: "Wednesday", short: "Wed", abbr: "W" },
        { id: 4, name: "Thursday", short: "Thu", abbr: "T" },
        { id: 5, name: "Friday", short: "Fri", abbr: "F" },
        { id: 6, name: "Saturday", short: "Sat", abbr: "S" }
      ]
    }
  };

  // initiate pre-existing calendar by grabbing from local storage

  updateCalendarFromQuickCreate = newEvent => {
    let event = this.reformatEventData(newEvent);
    this.setState({
      events: [...this.state.events, event],
      quickCreateModal: false
    });
  };

  reformatEventData = event => {
    let startDate = moment("11012015", "MMDDYYYY")
      .add(event.dayOfWeek, "days")
      .format("YYYY-MM-DD");
    if (this.state.colorIndex[event.colorTypeId]) {
      const colorData = this.state.colorIndex[event.colorTypeId];
      let bgColor = colorData.color;
      const updatedEvent = {
        ...event,
        start: new Date(`${startDate} ${event.startTime}`),
        end: new Date(`${startDate} ${event.endTime}`),
        bgColor
      };
      return updatedEvent; // delete this
    } else {
      const updatedEvent = {
        ...event,
        start: new Date(`${startDate} ${event.startTime}`),
        end: new Date(`${startDate} ${event.endTime}`),
        bgColor: "#4286f4"
      };
      return updatedEvent;
    }
  };

  componentDidMount() {
    let savedData = localStorage.getItem("schedule");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      const events = parsed.map(ev => this.reformatEventData(ev));
      this.setState({ events });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.events !== prevState.events) {
      const events = JSON.stringify(this.state.events);
      localStorage.setItem("schedule", events);
    }
  }
  // end of didUpate

  closeModalHandler = () => {
    this.setState({
      quickCreateModal: false,
      selectedEvent: {}
    });
  };

  confirmedDeleteEvent = id => {
    this.quickRemoveFromCalendar(id);
  };

  quickRemoveFromCalendar = event => {
    let events = this.state.events.filter(ev => ev !== event);
    this.setState({ events });
  };

  moveEventHandler = this.onMoveEvent.bind(this);

  onMoveEvent({ event, start, end }) {
    let startDate = moment(start).format("DD");
    let endDate = moment(end).format("DD");
    //console.log(event);
    let endDateTime = end;
    if (startDate !== endDate) {
      endDateTime = moment(start)
        .hours(23)
        .minutes(59)
        .toDate();
    }
    this.prepareMovedEventForUpdate(event, start, endDateTime);
  }

  prepareMovedEventForUpdate = (event, newStart, newEnd) => {
    let dayOfWeek = moment(newStart).format("e");
    let startTime = moment(newStart).format("HH:mm");
    let endTime = moment(newEnd).format("HH:mm");
    const updatedEvent = {
      ...event,
      dayOfWeek,
      startTime,
      endTime
    };
    this.renderMovedEvent(event, updatedEvent, newStart, newEnd);
  };

  // sendUpdateToServer = (event, newStart, newEnd) => {
  //   this.renderMovedEvent(event, newStart, newEnd);
  // };

  renderUpdatedEvent(event) {
    const { events } = this.state;
    //console.log(events);
    let reformatted = this.reformatEventData(event);
    let remaining = events.filter(ev => ev.id !== event.id);
    //console.log(remaining);
    this.setState({
      events: [...remaining, reformatted],
      quickCreateModal: false,
      selectedEvent: {}
    });
  }

  renderMovedEvent(original, event, start, end) {
    const { events } = this.state;
    const updatedEvent = { ...event, start, end };
    const remaining = events.filter(ev => ev !== original);
    this.setState({
      events: [...remaining, updatedEvent]
    });
  }

  setEventCellStyling = event => {
    let color = event.bgColor;
    let style = {
      background: `rgba(${parseInt(color.substring(1, 3), 16)}, ${parseInt(
        color.substring(3, 5),
        16
      )}, ${parseInt(color.substring(5, 7), 16)}, 0.99)`
    };
    return { style };
  };

  onCalendarEventSelection = event => {
    this.setState({
      selectedEvent: event,
      quickCreateModal: true
    });
  };

  calendarSelectionHandler = slotInfo => {
    let newEventStart = parseInt(moment(slotInfo.start).format("x"));
    let newEventEnd = parseInt(moment(slotInfo.end).format("x"));

    this.setState({
      newEventStart,
      newEventEnd,
      quickCreateModal: true
    });
    //console.log(slotInfo);
  };

  customCalendarComps = {
    event: event => {
      let ev = event.event;
      return (
        <React.Fragment>
          <div>{event.title}</div>
          <br />
          <div>
            <p>.</p>
          </div>
        </React.Fragment>
      );
    }
  };

  mapTemplateNames = template => {
    return (
      <DropdownItem
        key={`plan${template.templateId}`}
        value={template.templateId}
        onClick={() => {
          // set background color?
        }}
      >
        {template.templatename}
      </DropdownItem>
    );
  };

  dropdownToggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    //ref={this.componentWidth}
    let calDateTimeFormatting = {
      dayFormat: (date, culture, localizer) =>
        localizer.format(date, "dddd", culture),
      timeGutterFormat: (date, culture, localizer) =>
        localizer.format(date, "h a", culture)
    };
    return (
      <div className="container-fluid">
        <div className="form-row">
          <div className="col" />
          <div className="col text-center">
            <h2
              className="text-center"
              style={{ position: "relative", bottom: "-0.3em" }}
            >
              My Weekly Schedule
            </h2>
          </div>
          <div className="col text-right">
            <button
              className="btn-lg btn-success"
              onClick={() => this.setState({ quickCreateModal: true })}
              style={{
                position: "relative",
                borderRadius: "1.8em",
                margin: "0 1em 0.8em 0"
              }}
            >
              <i className="zmdi zmdi-plus text-white zmdi-hc-lg" />
            </button>
          </div>
        </div>
        <DragAndDropCalendar
          {...this.props}
          localizer={localizer}
          selectable="ignoreEvents"
          events={this.state.events}
          defaultDate={new Date(2015, 10, 1, 0)}
          defaultView={"week"}
          views={["week"]}
          step={15}
          timeslots={4}
          toolbar={false}
          min={moment()
            .hours(5)
            .minutes(0)
            .toDate()}
          formats={calDateTimeFormatting}
          //max={this.state.maxTime}
          onEventDrop={this.moveEventHandler}
          eventPropGetter={this.setEventCellStyling}
          onSelectEvent={this.onCalendarEventSelection}
          onSelectSlot={this.calendarSelectionHandler}
          //components={this.customCalendarComps}
        />

        <QuickCreateModal
          start={this.state.newEventStart}
          selectedEvent={this.state.selectedEvent}
          colorIndex={this.state.colorIndex}
          end={this.state.newEventEnd}
          modalOpen={this.state.quickCreateModal}
          onClose={this.closeModalHandler.bind(this)}
          refreshEvents={this.initiateUserCalendar}
          googleColors={googleColors}
          colorIndex={this.state.colorIndex}
          sendEventToCalendar={this.updateCalendarFromQuickCreate}
          showUpdatedEvent={this.renderUpdatedEvent.bind(this)}
          delete={this.quickRemoveFromCalendar}
        />
      </div>
    );
  }
}

export default App;
