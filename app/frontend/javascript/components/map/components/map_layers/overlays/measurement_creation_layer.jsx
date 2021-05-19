import { connect } from "react-redux";
import MeasurementMarker from "../../measurement_marker";
import { setMeasurementCreationCoordinates } from "../../../../../store/actions/user_actions";

class MeasurementCreationLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      centerLat: "",
      centerLng: ""
    }

    this.renderMarker = this.renderMarker.bind(this);
    this.onMarkerDrag = this.onMarkerDrag.bind(this);
  }

  renderMarker () {
    const { centerLat, centerLng } = this.state;

    return (
      <MeasurementMarker
        draggable={true}
        onMarkerDrag={this.onMarkerDrag}
        latitude={centerLat}
        longitude={centerLng}
      />
    )
  }

  onMarkerDrag (leafletMarker) {
    const { setMeasurementCreationCoordinates } = this.props;
    const { lat, lng } = leafletMarker.getLatLng();

    setMeasurementCreationCoordinates({ latitude: lat.toString(), longitude: lng.toString() });
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {
    const { measurementCreationState, mainMapRef, setMeasurementCreationCoordinates } = this.props;

    if (!prevProps.measurementCreationState && measurementCreationState) {
      let { lat, lng } = mainMapRef.getCenter();
      lat = lat.toString();
      lng = lng.toString();

      this.setState({ centerLat: lat, centerLng: lng });
      setMeasurementCreationCoordinates({ latitude: lat, longitude: lng });
    }
  }

  render () {
    return this.renderMarker()
  }
}

const mapStateToProps = ({
  mainMap: { ref: mainMapRef },
  userActions: { measurementCreation: { state: measurementCreationState } }
}) => ({
  mainMapRef,
  measurementCreationState
});

const mapDispatchToProps = dispatch => ({
  setMeasurementCreationCoordinates: ({ value, latitude, longitude }) => dispatch(setMeasurementCreationCoordinates({ value, latitude, longitude }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementCreationLayer);
