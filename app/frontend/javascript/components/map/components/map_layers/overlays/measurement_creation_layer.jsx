import { connect } from "react-redux";
import MeasurementMarker from "../../measurement_marker";
import { setMeasurementCreationData } from "../../../../../store/actions/user_actions";

class MeasurementCreationLayer extends React.Component {
  constructor(props) {
    super(props);

    this.renderMarker = this.renderMarker.bind(this);
    this.onMarkerDrag = this.onMarkerDrag.bind(this);
  }

  renderMarker () {
    const { mainMapRef, latitude, longitude, measurementCreationState } = this.props;

    let defaultLat;
    let defaultLng;

    if (measurementCreationState === true) {
      const centerCoors = mainMapRef.getCenter();

      defaultLat = centerCoors.lat.toString();
      defaultLng = centerCoors.lng.toString();
    } else {
      defaultLat = undefined;
      defaultLng = undefined;
    }

    return (
      <MeasurementMarker
        draggable={true}
        onMarkerDrag={this.onMarkerDrag}
        latitude={defaultLat || latitude || ""}
        longitude={defaultLng || longitude || ""}
      />
    )
  }

  onMarkerDrag (leafletMarker) {
    const { setMeasurementCreationData, value } = this.props;
    const { lat, lng } = leafletMarker.getLatLng();

    setMeasurementCreationData({ value, latitude: lat.toString(), longitude: lng.toString() });
  }

  render () {
    return this.renderMarker()
  }
}

const mapStateToProps = ({
  mainMap: { ref: mainMapRef },
  userActions: { measurementCreation: { state: measurementCreationState, data: { value, latitude, longitude } } }
}) => ({
  mainMapRef,
  measurementCreationState,
  value, latitude, longitude
});

const mapDispatchToProps = dispatch => ({
  setMeasurementCreationData: ({ value, latitude, longitude }) => dispatch(setMeasurementCreationData({ value, latitude, longitude }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementCreationLayer);
