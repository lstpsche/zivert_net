class StaticMeasurementInfoBase extends React.Component {
  formatDate (date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    date = new Date(date);
    let year = date.getFullYear();
    let month = months[date.getMonth()];
    let day = date.getDate();
    let hours = this.formatSingleDigitTime(date.getHours() + '');
    let minutes = this.formatSingleDigitTime(date.getMinutes() + '');

    return `${hours}:${minutes}, ${month} ${day} ${year}`
  }

  formatSingleDigitTime (time) {
    if (time.length === 1)
      return '0' + time;

    return time;
  }
}

export default StaticMeasurementInfoBase;
