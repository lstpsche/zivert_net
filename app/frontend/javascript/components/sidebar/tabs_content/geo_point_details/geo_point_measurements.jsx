import { connect } from "react-redux";
import MeasurementRow from "./geo_point_measurement/measurement_row";

class GeoPointMeasurements extends React.Component {
  geoPointMeasurements () {
    const { measurements, geoPoint: { id: geoPointId } } = this.props;

    return measurements.filter(measurement => measurement.geoPointId === geoPointId)
  }

  renderMeasurementsRows () {
    const measurements = this.geoPointMeasurements();

    return measurements.map(measurement => this.renderMeasurementRow(measurement));
  }

  renderMeasurementRow (measurement) {
    return (
      <MeasurementRow
        key={"measurement-row-" + measurement.id}
        measurement={measurement}
      />
    )
  }

  render () {
    return (
      <div id="geo-point-measurements">
        { this.renderMeasurementsRows() }
      </div>
    )
  }
}

GeoPointMeasurements.propTypes = {
  geoPoint: PropTypes.object.isRequired
}

const mapStateToProps = ({ measurements }) => ({ measurements });

export default connect(mapStateToProps)(GeoPointMeasurements);
