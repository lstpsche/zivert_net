import fetchLink from "../../../../../helpers/fetch_link";
import MeasurementRowInfo from "./measurement_row_info";

class MeasurementRow extends React.Component {
  render () {
    const { measurement } = this.props;

    return (
      <div className="measurement-row-container">
        <div className="measurement-connector-line" />
        <MeasurementRowInfo
          measurement={measurement}
        />
      </div>
    )
  }
}

MeasurementRow.propTypes = {
  measurement: PropTypes.object.isRequired
}

export default MeasurementRow;
