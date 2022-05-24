class StaticMeasurementInfoBase extends React.Component {
  formatDate (date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    date = new Date(date);
    let year = date.getFullYear();
    let month = months[date.getMonth()];
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${hours}:${minutes}, ${month} ${day} ${year}`
  }
}

export default StaticMeasurementInfoBase;
