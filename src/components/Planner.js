import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import QuickCreateModal from "./AddToTemplateModal";
import Modal from "./GenericModal";
import Guide from "./WelcomeGuide";
import googleColors from "../data/googleColors";
import "../styles/custom-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const localizer = BigCalendar.momentLocalizer(moment);

const colorIndex = colorTypes => {
  // transform array of colors into one object (to be used as an index for O(1) lookup)
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
    showWelcomeModal: false
  };

  updateCalendarFromQuickCreate = newEvents => {
    let newEventsArr = newEvents.map(ev => this.reformatEventData(ev));
    this.setState({
      events: [...this.state.events, ...newEventsArr],
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
      return updatedEvent;
    } else {
      // just in edge case
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
    let returningUser = localStorage.getItem("returningUser");
    if (!returningUser) {
      localStorage.setItem("returningUser", true);
      this.setState({ showWelcomeModal: true });
    }
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

  closeModalHandler = () => {
    this.setState({
      quickCreateModal: false,
      selectedEvent: {}
    });
  };

  quickRemoveFromCalendar = event => {
    let events = this.state.events.filter(ev => ev !== event);
    this.setState({ events });
  };

  onMoveEvent = ({ event, start, end }) => {
    let startDate = moment(start).format("DD");
    let endDate = moment(end).format("DD");
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

  renderUpdatedEvent = (original, event) => {
    const { events } = this.state;
    let reformatted = this.reformatEventData(event);
    let remaining = events.filter(ev => ev !== original);
    this.setState({
      events: [...remaining, reformatted],
      quickCreateModal: false,
      selectedEvent: {}
    });
  }

  renderMovedEvent = (original, event, start, end) => {
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
  };

  closeModal = () => this.setState({ showWelcomeModal: false });

  render() {
    let calDateTimeFormatting = {
      dayFormat: (date, culture, localizer) =>
        localizer.format(date, "dddd", culture),
      timeGutterFormat: (date, culture, localizer) =>
        localizer.format(date, "h a", culture)
    };
    return (
      <div className="container-fluid">
        <div className="form-row">
          <div className="col">
            <button
              className="btn btn-lg btn-danger"
              onClick={() => this.setState({ showWelcomeModal: true })}
              style={{
                position: "relative",
                top: "0.5em",
                height: "2.45em",
                lineHeight: "1.1em",
                width: "2.45em",
                borderRadius: "2.45em",
                margin: "0 0em 0.8em 0.5em"
              }}
            >
              <big>?</big>
            </button>
          </div>
          <div className="col text-center">
            <h2
              className="text-center"
              style={{ position: "relative", bottom: "-0.3em" }}
            >
              Week Planner
            </h2>
          </div>
          <div className="col text-right">
            <button
              className="btn btn-lg btn-dark"
              onClick={() => this.setState({ quickCreateModal: true })}
              style={{
                position: "relative",
                top: "0.5em",
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
          onEventDrop={this.onMoveEvent}
          eventPropGetter={this.setEventCellStyling}
          onSelectEvent={this.onCalendarEventSelection}
          onSelectSlot={this.calendarSelectionHandler}
        />
        <QuickCreateModal
          start={this.state.newEventStart}
          selectedEvent={this.state.selectedEvent}
          colorIndex={this.state.colorIndex}
          end={this.state.newEventEnd}
          modalOpen={this.state.quickCreateModal}
          onClose={this.closeModalHandler}
          googleColors={googleColors}
          sendEventToCalendar={this.updateCalendarFromQuickCreate}
          showUpdatedEvent={this.renderUpdatedEvent}
          delete={this.quickRemoveFromCalendar}
        />
        <Modal
          modalOpen={this.state.showWelcomeModal}
          toggle={this.closeModal}
          title="Using Schedule My Workweek"
          size="md"
        >
          <Guide />
        </Modal>
      </div>
    );
  }
}

export default App;
