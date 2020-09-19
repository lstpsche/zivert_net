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

  renderCreateMeasurementRow () {
    const { userSignedIn, geoPoint: { id: geoPointId } } = this.props;

    if (!userSignedIn)
      return null;

    return <CreateMeasurementRow geoPointId={geoPointId} />
  }

  render () {
    return (
      <div id="geo-point-measurements">
        { this.renderMeasurementsRows() }
        { this.renderCreateMeasurementRow() }
      </div>
    )
  }
}

GeoPointMeasurements.propTypes = {
  geoPoint: PropTypes.object.isRequired
}

const mapStateToProps = ({ measurements, currentUser: { signedIn } }) => ({
  measurements,
  userSignedIn: signedIn
});

export default connect(mapStateToProps)(GeoPointMeasurements);
