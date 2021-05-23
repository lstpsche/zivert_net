import { connect } from "react-redux";
import { forwardRef } from "react";
import BaseSelection from "./base_selection";
import DatePicker from "react-datepicker";
import { setSettingsMeasurementsPeriod } from "../../../../store/actions/main_map";

class MeasurementsTimePeriodSelection extends BaseSelection {
  constructor(props) {
    super(props);

    this.renderSectionBody = this.renderSectionBody.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  renderDatePicker () {
    const { measurements, measurementsPeriod: { startDate, endDate } } = this.props;

    return (
      <DatePicker
        onChange={this.onDateChange}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        minDate={this.minDate(measurements)}
        selectsRange
        inline
      />
    )
  }

  onDateChange (dates) {
    const [startDate, endDate] = dates;

    this.props.setSettingsMeasurementsPeriod({ startDate, endDate });
  }

  minDate (measurements) {
    let minDate = measurements.map(m => Date.parse(m.createdAt)).sort()[0]

    return new Date(minDate);
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
