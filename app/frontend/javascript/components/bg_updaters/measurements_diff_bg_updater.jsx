import { connect } from "react-redux";
import { setMeasurementsDiff } from "../../store/actions/measurements_diff";
import roundValue from "../../helpers/round_value";

class MeasurementsDiffBGUpdater extends React.Component {
  generateMeasurementsDiff () {
    // TODO: get measurements at startDate (take latest)
    // TODO: get measurements at endDate (take latest)
    // TODO: group measurements from start with ones from end that have the same coords
    // TODO: value_ush and value_urh == valueEnd - valueStart

    const { measurements, staticMeasurements, measurementsDiffPeriod: { startDate, endDate }, setMeasurementsDiff } = this.props;

    // get measurements at needed dates; take only latest measurements
    let allMeasurements = measurements.concat(staticMeasurements);
    let startDateMeasurements = allMeasurements.filter((measurement) => this.compareDate(measurement.createdAt, startDate)).sort(this.sortByDateFunc).filter(this.filterLatestFunc);
    let endDateMeasurements = allMeasurements.filter((measurement) => this.compareDate(measurement.createdAt, endDate)).sort(this.sortByDateFunc).filter(this.filterLatestFunc);

    if (startDateMeasurements.length === 0 || endDateMeasurements.length === 0) {
      setMeasurementsDiff([]);
      return;
    }

    // group start & end measurements by coordinates
    let groupedByCoords = {};
    startDateMeasurements.forEach((startMeasurement) => {
      let endMeasurement = endDateMeasurements.find((m) => m.latitude === startMeasurement.latitude && m.longitude === startMeasurement.longitude);

      groupedByCoords[[startMeasurement.latitude, startMeasurement.longitude]] = { start: startMeasurement, end: endMeasurement };
    })

    // form new "measurements" with diff values
    let measurementsDiff = Object.values(groupedByCoords).map(measurementsSet => {
      const { start, end } = measurementsSet;

      if (!start || !end)
        return undefined;

      return {
        id: start.id,
        latitude: start.latitude,
        longitude: start.longitude,
        isStatic: start?.isStatic && end?.isStatic,
        stationName: (start?.stationName === end?.stationName) ? start?.stationName : "",
        value_urh: roundValue(end.value_urh - start.value_urh, 2),
        value_ush: roundValue(end.value_ush - start.value_ush, 2)
      }
    }).filter((m) => m !== undefined);

    setMeasurementsDiff(measurementsDiff);
  }

  compareDate (date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);
    let fullDate1 = `${date1.getFullYear()} ${date1.getMonth()} ${date1.getDate()}`;
    let fullDate2 = `${date2.getFullYear()} ${date2.getMonth()} ${date2.getDate()}`;

    return fullDate1 === fullDate2;
  }

  sortByDateFunc (m1, m2) {
    let date1 = new Date(m1.createdAt);
    let date2 = new Date(m2.createdAt);

    return date1 - date2;
  }

  filterLatestFunc (measurement, index, self) {
    let dupMeasurement = self.find((m) => m.latitude === measurement.latitude && m.longitude === measurement.longitude);

    return self.indexOf(dupMeasurement) === index;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.generateMeasurementsDiff();
  }

  render () {
    return null;
  }
}

const mapStateToProps = ({
  measurements,
  staticMeasurements,
  mainMap: { settings: { measurementsDiffPeriod } }
}) => ({
  measurements,
  staticMeasurements,
  measurementsDiffPeriod
});

const mapDispatchToProps = dispatch => ({
  setMeasurementsDiff: (measurementsInPeriod) => dispatch(setMeasurementsDiff(measurementsInPeriod))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementsDiffBGUpdater);
