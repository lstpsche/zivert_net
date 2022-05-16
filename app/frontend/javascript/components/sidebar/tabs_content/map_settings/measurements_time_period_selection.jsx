import { connect } from "react-redux";
import BaseSelection from "./base_selection";
import DatePicker from "react-datepicker";
import { setSettingsMeasurementsPeriod } from "../../../../store/actions/main_map";

class MeasurementsTimePeriodSelection extends BaseSelection {
  constructor(props) {
    super(props);

    const { measurementsPeriod: { startDate } } = this.props;

    this.state = {
      startDate
    }

    this.renderSectionBody = this.renderSectionBody.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  renderDatePicker () {
    const { startDate } = this.state;

    return (
      <DatePicker
        onChange={this.onDateChange}
        selected={startDate}
        inline
      />
    )
  }

  onDateChange (date) {
    let startDate = new Date(date.setHours(0, 0, 0, 0));
    let endDate = new Date(date.setHours(23, 59, 59, 999));

    this.setState({ startDate, endDate });

    if (!!endDate) {
      this.props.setSettingsMeasurementsPeriod({startDate, endDate});
    }
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {
    if (prevProps !== this.props) {
      const { measurementsPeriod: { startDate, endDate } } = this.props;

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
  mainMap: { settings: { measurementsPeriod } }
}) => ({
  measurementsPeriod
});

const mapDispatchToProps = dispatch => ({
  setSettingsMeasurementsPeriod: (period) => dispatch(setSettingsMeasurementsPeriod(period))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementsTimePeriodSelection);
