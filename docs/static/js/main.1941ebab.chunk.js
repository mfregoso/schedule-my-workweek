(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{174:function(e,t,a){e.exports=a(398)},390:function(e,t,a){},392:function(e,t,a){},394:function(e,t,a){},398:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(4),s=a.n(o),i=a(19),l=a(45),d=a(25),c=a(26),m=a(28),u=a(27),h=a(29),y=a(18),p=a(44),v=a.n(p),f=a(3),E=a.n(f),b=a(171),k=a.n(b),g=(a(388),a(390),a(17)),T=a(5),S=a(107),D=(a(392),function(e){var t=e.target.name,a=e.target.value;this.setState(Object(g.a)({},t,a))}),C=function(e){return E()(e).format("HH:mm")},w=(a(394),function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={isSunday:!1,isMonday:!1,isTuesday:!1,isWednesday:!1,isThursday:!1,isFriday:!1,isSaturday:!1,selectedDays:[]},a.dayToggle=function(e){return a.setState(Object(g.a)({},e.target.name,e.target.checked))},a.getSelectedDays=function(){var e=[],t=a.state,n=t.isSunday,r=t.isMonday,o=t.isTuesday,s=t.isWednesday,i=t.isThursday,l=t.isFriday,d=t.isSaturday;return n&&e.push(0),r&&e.push(1),o&&e.push(2),s&&e.push(3),i&&e.push(4),l&&e.push(5),d&&e.push(6),e},a.setDay=function(e){switch(e){case"0":a.setState({isSunday:!0});break;case"1":a.setState({isMonday:!0});break;case"2":a.setState({isTuesday:!0});break;case"3":a.setState({isWednesday:!0});break;case"4":a.setState({isThursday:!0});break;case"5":a.setState({isFriday:!0});break;case"6":a.setState({isSaturday:!0})}},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(e,t){if(this.state!==t){var a=this.getSelectedDays();this.props.sendSelectedDays(a)}this.props.dayOfWeek!==e.dayOfWeek&&this.setDay(this.props.dayOfWeek)}},{key:"render",value:function(){return r.a.createElement("div",{className:"weekDays-selector"},r.a.createElement(T.g,{style:{paddingTop:"0.2em",paddingBottom:"0.2em"}},"Select multiple days for a repeating event"),r.a.createElement(T.e,{className:"d-flex justify-content-center"},r.a.createElement("input",{type:"checkbox",id:"weekday-sun",name:"isSunday",checked:this.state.isSunday,onChange:this.dayToggle,className:"weekday"}),r.a.createElement("label",{htmlFor:"weekday-sun"},"S"),r.a.createElement("input",{type:"checkbox",id:"weekday-mon",name:"isMonday",checked:this.state.isMonday,onChange:this.dayToggle,className:"weekday"}),r.a.createElement("label",{htmlFor:"weekday-mon"},"M"),r.a.createElement("input",{type:"checkbox",id:"weekday-tue",name:"isTuesday",checked:this.state.isTuesday,onChange:this.dayToggle,className:"weekday"}),r.a.createElement("label",{htmlFor:"weekday-tue"},"T"),r.a.createElement("input",{type:"checkbox",id:"weekday-wed",name:"isWednesday",checked:this.state.isWednesday,onChange:this.dayToggle,className:"weekday"}),r.a.createElement("label",{htmlFor:"weekday-wed"},"W"),r.a.createElement("input",{type:"checkbox",id:"weekday-thu",name:"isThursday",checked:this.state.isThursday,onChange:this.dayToggle,className:"weekday"}),r.a.createElement("label",{htmlFor:"weekday-thu"},"TH"),r.a.createElement("input",{type:"checkbox",id:"weekday-fri",name:"isFriday",checked:this.state.isFriday,onChange:this.dayToggle,className:"weekday"}),r.a.createElement("label",{htmlFor:"weekday-fri"},"F"),r.a.createElement("input",{type:"checkbox",id:"weekday-sat",name:"isSaturday",checked:this.state.isSaturday,onChange:this.dayToggle,className:"weekday"}),r.a.createElement("label",{htmlFor:"weekday-sat"},"S")),this.props.valid&&r.a.createElement("small",{className:"text-danger",style:{position:"relative",top:"-1em"}},"At least one day is required"))}}]),t}(n.Component)),M=function(e){var t=e.colorList,a=e.selectedColor,n=e.defaultColor,o=e.setSelectedColor;return r.a.createElement(T.m,{style:{marginTop:"1.5em"}},r.a.createElement(T.c,{caret:!0,style:{backgroundColor:a||n}},"Event Color"),r.a.createElement(T.b,{modifiers:{setMaxHeight:{enabled:!0,order:890,fn:function(e){return Object(i.a)({},e,{styles:Object(i.a)({},e.styles,{overflow:"auto",maxHeight:160})})}}}},(t||[]).map(function(e){return function(e){return r.a.createElement(T.a,{key:e.id,style:{backgroundColor:e.color,height:"2em",marginBottom:"0.15em"},onClick:function(){return o(e.id)},className:"colorBox-cursor"})}(e)})))},O=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={selectedDays:[],inEditMode:!1,colorTypeId:"9",dayOfWeek:"",headerTextColor:"white",defaultBgColor:"#5484ed",modalHeaderColor:"",title:"",addEventTitle:"Add to Your Schedule",startDate:E()("11012015","MMDDYYYY"),startTime:E()("11012015 08:00","MMDDYYYY HH:mm"),endTime:E()("11012015 10:00","MMDDYYYY HH:mm"),daysDataList:[{id:0,name:"Sunday",short:"Sun",letter:"S"},{id:1,name:"Monday",short:"Mon",letter:"M"},{id:2,name:"Tuesday",short:"Tue",letter:"T"},{id:3,name:"Wednesday",short:"Wed",letter:"W"},{id:4,name:"Thursday",short:"Thu",letter:"T"},{id:5,name:"Friday",short:"Fri",letter:"F"},{id:6,name:"Saturday",short:"Sat",letter:"S"}],validation:{color:!0,pickedADay:!1,pleasePickADay:!1,title:!0}},a.populateDaysBox=function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.name)},a.setSelectedDays=function(e){a.setState({selectedDays:e},function(){0!==e.length&&a.state.validation.pleasePickADay&&a.validateInputs()})},a.getFormData=function(){var e=C(a.state.startTime),t=C(a.state.endTime);return{colorTypeId:parseInt(a.state.colorTypeId),startTime:e,endTime:t,dayOfWeek:parseInt(a.state.dayOfWeek),title:a.state.title}},a.handleSubmission=function(e){if(a.state.inEditMode)a.sendUpdatedEvent(a.props.selectedEvent,e);else{var t=a.state.selectedDays.map(function(t){var a=t;return{colorTypeId:e.colorTypeId,title:e.title,startTime:e.startTime,endTime:e.endTime,dayOfWeek:a}});a.sendEventToCalendar(t)}},a.sendUpdatedEvent=function(e,t){a.resetValues(),a.props.showUpdatedEvent(e,t)},a.sendEventToCalendar=function(e){a.resetValues(),a.props.sendEventToCalendar(e)},a.resetValues=function(){a.setState({dayOfWeek:"",title:"",inEditMode:!1,selectedDays:[],validation:{color:!0,pickedADay:!1,pleasePickADay:!1,title:!0}})},a.closeHandler=function(){a.props.onClose(),a.resetValues()},a.updateInputValue=D.bind(Object(y.a)(Object(y.a)(a))),a.setSelectedColor=function(e){a.setState({colorTypeId:e}),a.updateModalBgColor(e)},a.handleDayChange=function(e){a.updateInputValue(e),a.setState({startDate:E()("11012015","MMDDYYYY").add(e.target.value,"days")})},a.insertDeleteButton=function(){if(!0===a.state.inEditMode)return r.a.createElement("button",{className:"btn btn-danger",onClick:function(){a.props.delete(a.props.selectedEvent),a.closeHandler()}},"Delete")},a.updateModalBgColor=function(e){var t=a.props.colorIndex[e].color;a.setState({modalHeaderColor:t})},a.renderDayPicker=function(){return!1===a.state.inEditMode?r.a.createElement(w,{dayOfWeek:a.state.dayOfWeek,sendSelectedDays:a.setSelectedDays,valid:a.state.validation.pleasePickADay}):r.a.createElement("div",{className:"form-group",style:{paddingBottom:"0.1em"}},r.a.createElement("label",null,"Day of Week"),r.a.createElement("select",{className:"custom-select form-control mx-auto",name:"dayOfWeek",value:a.state.dayOfWeek,onChange:a.handleDayChange},(a.state.daysDataList||[]).map(function(e){return a.populateDaysBox(e)})))},a.validateInputs=function(){var e=a.state,t=e.colorTypeId,n=e.validation,r=e.inEditMode,o=e.selectedDays;e.title.length>0?n.title=!0:n.title=!1,Number.isInteger(parseInt(t))?n.color=!0:n.color=!1,r||(0===o.length?(n.pickedADay=!1,n.pleasePickADay=!0):(n.pickedADay=!0,n.pleasePickADay=!1)),a.setState({validation:n})},a.allValid=function(){var e=a.state.validation;return a.state.inEditMode?!!e.color:!(a.state.inEditMode||!e.color||!e.pickedADay||!e.title)},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(e,t){if(this.props.start===e.start&&this.props.end===e.end||this.setState({startDate:E()(this.props.start),startTime:E()(this.props.start),endTime:E()(this.props.end),dayOfWeek:E()(this.props.start).format("e")}),this.state.selectedDays,t.selectedDays,this.props.selectedEvent!==e.selectedEvent){var a=this.props.selectedEvent,n=a.colorTypeId,r=a.dayOfWeek,o=a.start,s=a.end,i=a.title;n&&(this.updateModalBgColor(n),this.setState({inEditMode:!0,title:i,colorTypeId:n,dayOfWeek:r,startTime:E()(o),endTime:E()(s)}))}}},{key:"render",value:function(){var e=this,t=this.props.modalOpen;return r.a.createElement(r.a.Fragment,null,r.a.createElement(T.j,{style:{maxWidth:400,minWidth:"25em",position:"relative",top:"10"},isOpen:t,toggle:function(){return e.closeHandler()},modalTransition:{timeout:10},backdropTransition:{timeout:10}},r.a.createElement(T.l,{style:{position:"relative",paddingTop:"2em",width:"100%",color:this.state.headerTextColor,backgroundColor:this.state.modalHeaderColor||this.state.defaultBgColor}},r.a.createElement("div",{className:"text-center mx-auto",style:{position:"relative",top:"-0.4em",marginBottom:"-0.1em",float:"right"}},r.a.createElement("big",{className:"text-center"},"\xa0",this.state.inEditMode?"Edit Your Saved Event":this.state.addEventTitle))),r.a.createElement(T.k,{style:{position:"relative",top:"-0.5em",marginBottom:"-0.9em"}},r.a.createElement(T.h,null,r.a.createElement(T.i,{className:"border-0"},r.a.createElement("div",{className:"mx-auto",style:{marginTop:"0.6em",paddingBottom:"1.4em"}},r.a.createElement(T.e,null,r.a.createElement(T.g,null,"Event Name"),r.a.createElement(T.f,{type:"text",name:"title",value:this.state.title,onChange:function(t){e.setState(Object(g.a)({},t.target.name,t.target.value),function(){return e.validateInputs()})},invalid:!this.state.validation.title}),r.a.createElement(T.d,{valid:!0}),r.a.createElement(T.d,null,"This field is required")),r.a.createElement(T.e,null,r.a.createElement(M,{colorList:this.props.googleColors,selectedColor:this.state.modalHeaderColor,defaultColor:this.state.defaultBgColor,setSelectedColor:this.setSelectedColor})),this.renderDayPicker(),r.a.createElement("div",{className:"form-group",style:{minWidth:"22em",marginBottom:"-0.0em"}},r.a.createElement("label",null,"Start/End Times"),r.a.createElement("div",{className:"form-row"},r.a.createElement("div",{className:"col",style:{maxWidth:"25%",minWidth:"8em"}},r.a.createElement(S.a,{selected:this.state.startTime,onChange:function(t){t>e.state.endTime?e.setState({startTime:t,endTime:E()(t).add(15,"minutes")}):e.setState({startTime:t})},showTimeSelect:!0,showTimeSelectOnly:!0,timeIntervals:15,className:"form-control text-center",minTime:E()("11012015 05:00","MMDDYYYY HH:mm"),maxTime:E()("11012015 23:30","MMDDYYYY HH:mm"),dateFormat:"LT"})),r.a.createElement("div",{className:"col text-center",style:{maxWidth:"8%",minWidth:"1em",marginTop:"0.6em"}},r.a.createElement("label",null,"to")),r.a.createElement("div",{className:"col",style:{maxWidth:"25%",minWidth:"8em"}},r.a.createElement(S.a,{selected:this.state.endTime,onChange:function(t){return e.setState({endTime:t})},showTimeSelect:!0,showTimeSelectOnly:!0,timeIntervals:15,minTime:E()("11012015 ".concat(E()(this.state.startTime).add(15,"minutes").format("HH:mm")),"MMDDYYYY HH:mm"),maxTime:E()("11012015 23:59","MMDDYYYY HH:mm"),className:"form-control text-center",dateFormat:"LT"}))))),r.a.createElement("div",{className:"text-right"},this.insertDeleteButton(),"\xa0\xa0",r.a.createElement("button",{className:"btn btn-primary",onClick:function(){if(e.validateInputs(),e.allValid()){var t=e.getFormData();e.handleSubmission(t)}}},this.state.inEditMode?"Update":"Add")))))))}}]),t}(n.Component),x=[{color:"#5484ed",id:9},{color:"#a4bdfc",id:1},{color:"#7ae7bf",id:2},{color:"#dbadff",id:3},{color:"#ff887c",id:4},{color:"#fbd75b",id:5},{color:"#ffb878",id:6},{color:"#46d6db",id:7},{color:"#e1e1e1",id:8},{color:"#51b749",id:10},{color:"#dc2127",id:11}],W=k()(v.a),Y=v.a.momentLocalizer(E.a),N=function(e){var t={},a=Object.keys(e[0]).filter(function(e){return"id"!==e}),n=!0,r=!1,o=void 0;try{for(var s,i=function(){var e=s.value,n={};a.forEach(function(t){n[t]=e[t]}),t[e.id]=n},l=e[Symbol.iterator]();!(n=(s=l.next()).done);n=!0)i()}catch(d){r=!0,o=d}finally{try{n||null==l.return||l.return()}finally{if(r)throw o}}return t},I=function(e){function t(){var e,a;Object(d.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={events:[],colorIndex:N(x),quickCreateModal:!1,selectedEvent:{},newStartTime:null,newEndTime:null,pageSettings:{daysOfWeek:[{id:0,name:"Sunday",short:"Sun",abbr:"S"},{id:1,name:"Monday",short:"Mon",abbr:"M"},{id:2,name:"Tuesday",short:"Tue",abbr:"T"},{id:3,name:"Wednesday",short:"Wed",abbr:"W"},{id:4,name:"Thursday",short:"Thu",abbr:"T"},{id:5,name:"Friday",short:"Fri",abbr:"F"},{id:6,name:"Saturday",short:"Sat",abbr:"S"}]}},a.updateCalendarFromQuickCreate=function(e){var t=e.map(function(e){return a.reformatEventData(e)});a.setState({events:Object(l.a)(a.state.events).concat(Object(l.a)(t)),quickCreateModal:!1})},a.reformatEventData=function(e){var t=E()("11012015","MMDDYYYY").add(e.dayOfWeek,"days").format("YYYY-MM-DD");if(a.state.colorIndex[e.colorTypeId]){var n=a.state.colorIndex[e.colorTypeId].color;return Object(i.a)({},e,{start:new Date("".concat(t," ").concat(e.startTime)),end:new Date("".concat(t," ").concat(e.endTime)),bgColor:n})}return Object(i.a)({},e,{start:new Date("".concat(t," ").concat(e.startTime)),end:new Date("".concat(t," ").concat(e.endTime)),bgColor:"#4286f4"})},a.closeModalHandler=function(){a.setState({quickCreateModal:!1,selectedEvent:{}})},a.quickRemoveFromCalendar=function(e){var t=a.state.events.filter(function(t){return t!==e});a.setState({events:t})},a.moveEventHandler=a.onMoveEvent.bind(Object(y.a)(Object(y.a)(a))),a.prepareMovedEventForUpdate=function(e,t,n){var r=E()(t).format("e"),o=E()(t).format("HH:mm"),s=E()(n).format("HH:mm"),l=Object(i.a)({},e,{dayOfWeek:r,startTime:o,endTime:s});a.renderMovedEvent(e,l,t,n)},a.setEventCellStyling=function(e){var t=e.bgColor;return{style:{background:"rgba(".concat(parseInt(t.substring(1,3),16),", ").concat(parseInt(t.substring(3,5),16),", ").concat(parseInt(t.substring(5,7),16),", 0.99)")}}},a.onCalendarEventSelection=function(e){a.setState({selectedEvent:e,quickCreateModal:!0})},a.calendarSelectionHandler=function(e){var t=parseInt(E()(e.start).format("x")),n=parseInt(E()(e.end).format("x"));a.setState({newEventStart:t,newEventEnd:n,quickCreateModal:!0})},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem("schedule");if(t){var a=JSON.parse(t).map(function(t){return e.reformatEventData(t)});this.setState({events:a})}}},{key:"componentDidUpdate",value:function(e,t){if(this.state.events!==t.events){var a=JSON.stringify(this.state.events);localStorage.setItem("schedule",a)}}},{key:"onMoveEvent",value:function(e){var t=e.event,a=e.start,n=e.end,r=n;E()(a).format("DD")!==E()(n).format("DD")&&(r=E()(a).hours(23).minutes(59).toDate()),this.prepareMovedEventForUpdate(t,a,r)}},{key:"renderUpdatedEvent",value:function(e,t){var a=this.state.events,n=this.reformatEventData(t),r=a.filter(function(t){return t!==e});this.setState({events:Object(l.a)(r).concat([n]),quickCreateModal:!1,selectedEvent:{}})}},{key:"renderMovedEvent",value:function(e,t,a,n){var r=this.state.events,o=Object(i.a)({},t,{start:a,end:n}),s=r.filter(function(t){return t!==e});this.setState({events:Object(l.a)(s).concat([o])})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"form-row"},r.a.createElement("div",{className:"col"}),r.a.createElement("div",{className:"col text-center"},r.a.createElement("h2",{className:"text-center",style:{position:"relative",bottom:"-0.3em"}},"My Weekly Schedule")),r.a.createElement("div",{className:"col text-right"},r.a.createElement("button",{className:"btn-lg btn-primary",onClick:function(){return e.setState({quickCreateModal:!0})},style:{position:"relative",top:"0.3em",borderRadius:"1.8em",margin:"0 1em 0.8em 0"}},r.a.createElement("i",{className:"zmdi zmdi-plus text-white zmdi-hc-lg"})))),r.a.createElement(W,Object.assign({},this.props,{localizer:Y,selectable:"ignoreEvents",events:this.state.events,defaultDate:new Date(2015,10,1,0),defaultView:"week",views:["week"],step:15,timeslots:4,toolbar:!1,min:E()().hours(5).minutes(0).toDate(),formats:{dayFormat:function(e,t,a){return a.format(e,"dddd",t)},timeGutterFormat:function(e,t,a){return a.format(e,"h a",t)}},onEventDrop:this.moveEventHandler,eventPropGetter:this.setEventCellStyling,onSelectEvent:this.onCalendarEventSelection,onSelectSlot:this.calendarSelectionHandler})),r.a.createElement(O,{start:this.state.newEventStart,selectedEvent:this.state.selectedEvent,colorIndex:this.state.colorIndex,end:this.state.newEventEnd,modalOpen:this.state.quickCreateModal,onClose:this.closeModalHandler.bind(this),googleColors:x,sendEventToCalendar:this.updateCalendarFromQuickCreate,showUpdatedEvent:this.renderUpdatedEvent.bind(this),delete:this.quickRemoveFromCalendar}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(396);s.a.render(r.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[174,2,1]]]);
//# sourceMappingURL=main.1941ebab.chunk.js.map