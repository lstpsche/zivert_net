import { connect } from "react-redux";
import MeasurementRow from "./geo_point_measurement/measurement_row";
import CreateMeasurementRow from "./geo_point_measurement/create_measurement_row";

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
    const { geoPoint: { id: geoPointId } } = this.props;

    return (
      <div id="geo-point-measurements">
        { this.renderMeasurementsRows() }
        <CreateMeasurementRow geoPointId={geoPointId} />
      </div>
    )
  }
}

GeoPointMeasurements.propTypes = {
  geoPoint: PropTypes.object.isRequired
}

const mapStateToProps = ({ measurements }) => ({ measurements });

export default connect(mapStateToProps)(GeoPointMeasurements);
