import { connect } from "react-redux";
import { setMeasurementsInPeriod } from "../../store/actions/measurements_in_period";
import getMeasurementsInTimePeriod from "../../helpers/get_measurements_in_time_period";
import { countRoundedClusterValue } from "../../helpers/count_cluster_value";

class MeasurementsInTimePeriodBGUpdater extends React.Component {
  generateMeasurementsInTimePeriod () {
    const { measurements, staticMeasurements, measurementsPeriod: { startDate, endDate }, setMeasurementsInPeriod } = this.props;

    let measurementsInPeriod = getMeasurementsInTimePeriod(measurements, startDate, endDate);
    let staticMeasurementsInPeriod = getMeasurementsInTimePeriod(staticMeasurements, startDate, endDate);
    let resultMeasurements = measurementsInPeriod.concat(this.calcStaticMeasurements(staticMeasurementsInPeriod));

    setMeasurementsInPeriod(resultMeasurements);
  }

  calcStaticMeasurements(staticMeasurements) {
    let stationsMeasurements = {};

    // group staticMeasurements by stationName
    staticMeasurements.forEach(staticMeasurement => {
      if (stationsMeasurements[staticMeasurement.stationName] === undefined)
        stationsMeasurements[staticMeasurement.stationName] = [staticMeasurement]
      else
        stationsMeasurements[staticMeasurement.stationName].push(staticMeasurement)
    });

    // form new "static" measurements with average rad value for each station
    return Object.entries(stationsMeasurements).map(measurementsSet => {
      let stationMeasurements = measurementsSet[1];
      let staticMeasurementTemplate = stationMeasurements[0];

      return {
        ...staticMeasurementTemplate,
        value_urh: countRoundedClusterValue(stationMeasurements.map(measurement => measurement.value_urh)),
        value_ush: countRoundedClusterValue(stationMeasurements.map(measurement => measurement.value_ush))
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.generateMeasurementsInTimePeriod();
  }

  render () {
    return null;
  }
}

const mapStateToProps = ({
  measurements,
  staticMeasurements,
  mainMap: { settings: { measurementsPeriod } }
}) => ({
  measurements,
  staticMeasurements,
  measurementsPeriod
});

const mapDispatchToProps = dispatch => ({
  setMeasurementsInPeriod: (measurementsInPeriod) => dispatch(setMeasurementsInPeriod(measurementsInPeriod))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementsInTimePeriodBGUpdater);
