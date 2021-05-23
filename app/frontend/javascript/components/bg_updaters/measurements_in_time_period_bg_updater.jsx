import { connect } from "react-redux";
import { setMeasurementsInPeriod } from "../../store/actions/measurements_in_period";
import getMeasurementsInTimePeriod from "../../helpers/get_measurements_in_time_period";

class MeasurementsInTimePeriodBGUpdater extends React.Component {
  generateMeasurementsInTimePeriod () {
    const { measurements, measurementsPeriod: { startDate, endDate }, setMeasurementsInPeriod } = this.props;
    debugger
    setMeasurementsInPeriod(getMeasurementsInTimePeriod(measurements, startDate, endDate));
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
  mainMap: { settings: { measurementsPeriod } }
}) => ({
  measurements,
  measurementsPeriod
});

const mapDispatchToProps = dispatch => ({
  setMeasurementsInPeriod: (measurementsInPeriod) => dispatch(setMeasurementsInPeriod(measurementsInPeriod))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementsInTimePeriodBGUpdater);
