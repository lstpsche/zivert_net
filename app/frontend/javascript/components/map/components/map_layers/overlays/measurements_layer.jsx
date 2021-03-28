import { connect } from "react-redux";
import { FeatureGroup } from "react-leaflet";
import MeasurementMarker from "../../measurement_marker";

class MeasurementsLayer extends React.Component {
  renderMeasurements () {
    const { measurements } = this.props;

    return measurements.map(({ id, latitude, longitude, value }) => {
      return (
        <MeasurementMarker
          key={"measurement-marker-" + id}
          id={id}
          latitude={latitude}
          longitude={longitude}
          value={value}
        />
      )
    })
  }

  render () {
    return (
      <FeatureGroup>
        { this.renderMeasurements() }
      </FeatureGroup>
    )
  }
}

const mapStateToProps = ({ measurements }) => ({ measurements });

export default connect(mapStateToProps)(MeasurementsLayer);
