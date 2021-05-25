import { connect } from "react-redux";
import BaseSelection from "./base_selection";
import DatePicker from "react-datepicker";
import { setSettingsMeasurementsPeriod } from "../../../../store/actions/main_map";

class MeasurementsTimePeriodSelection extends BaseSelection {
  constructor(props) {
    super(props);

    const { measurementsPeriod: { startDate, endDate } } = this.props;

    this.state = {
      startDate,
      endDate
    }

    this.renderSectionBody = this.renderSectionBody.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  renderDatePicker () {
    const { measurements } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <DatePicker
        onChange={this.onDateChange}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        minDate={this.minDate(measurements)}
        maxDate={this.maxDate()}
        selectsRange
        inline
      />
    )
  }

  onDateChange (dates) {
    let [startDate, endDate] = dates;

    startDate = new Date(startDate.setHours(0, 0, 0, 0));
    endDate = new Date(endDate.setHours(23, 59, 59, 999));

    this.setState({ startDate, endDate });

    if (!!endDate) {
      this.props.setSettingsMeasurementsPeriod({startDate, endDate});
    }
  }

  minDate (measurements) {
    let minDate = measurements.map(m => Date.parse(m.createdAt)).sort()[0]

    return new Date(minDate);
  }

  maxDate () {
    return new Date();
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {
    if (prevProps !== this.props) {
      const { measurementsPeriod: {startDate, endDate} } = this.props;

      this.setState({ startDate, endDate });
    }
  }

  renderSectionLabel () {
    return super.renderSectionLabel(I18n.t("sidebar.tabs.map_settings.time_period.header"));
  }

  renderSectionBody () {
    return (
      <>
        { this.renderDatePicker() }
      </>
    )
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
  setSettingsMeasurementsPeriod: (period) => dispatch(setSettingsMeasurementsPeriod(period))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementsTimePeriodSelection);
