import moment from "moment";
const formatToDateString = date => moment(date).format("YYYY-MM-DD");
const formatToTimeString = time => moment(time).format("HH:mm");

export { formatToDateString, formatToTimeString };
