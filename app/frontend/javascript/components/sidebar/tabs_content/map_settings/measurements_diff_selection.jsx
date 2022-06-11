import { connect } from "react-redux";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { setSettingsMeasurementsDiffPeriod } from "../../../../store/actions/main_map";
import BaseSelection from "./base_selection";

class MeasurementsDiffSelection extends BaseSelection {
  constructor(props) {
    super(props);

    const { measurementsDiffPeriod: { startDate, endDate } } = this.props;

    this.state = {
      startDate,
      endDate
    }

    this.renderSectionBody = this.renderSectionBody.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.renderDatePicker = this.renderDatePicker.bind(this);
  }

  datePickerInput () {
    return forwardRef(({ value, onClick }, ref) => (
      <button className="measurements-diff-period-button" onClick={onClick} ref={ref}>
        {value}
      </button>
    ))
  }

  renderDatePicker (type, options) {
    const CustomInput = this.datePickerInput();

    return (
      <DatePicker
        onChange={(date) => this.onDateChange(type, date)}
        selected={this.state[type]}
        customInput={<CustomInput />}
        { ...options }
      />
    )
  }

  onDateChange (type, date) {
    this.setState({ [type]: date });

    this.props.setSettingsMeasurementsDiffPeriod({ [type]: date })
  }

  renderDiffRangeSelection () {
    const { startDate, endDate } = this.state;

    return (
      <>
        <div className="from-selection">
          <h6 className="selection-label">From</h6>
          { this.renderDatePicker("startDate", { maxDate: endDate }) }
        </div>

        <div className="to-selection">
          <h6 className="selection-label">To</h6>
          { this.renderDatePicker("endDate", { minDate: startDate, maxDate: new Date }) }
        </div>
      </>
    )
  }

  renderSectionLabel () {
    return super.renderSectionLabel(I18n.t("sidebar.tabs.map_settings.diff_period.header"));
  }

  renderSectionBody () {
    return (
      <>
        <div className="measurements-diff-selection">
          { this.renderDiffRangeSelection() }
        </div>
      </>
    )
  }
}

const mapStateToProps = ({
  mainMap: { settings: { measurementsDiffPeriod } }
}) => ({
  measurementsDiffPeriod
});

const mapDispatchToProps = dispatch => ({
  setSettingsMeasurementsDiffPeriod: (period) => dispatch(setSettingsMeasurementsDiffPeriod(period))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementsDiffSelection);
