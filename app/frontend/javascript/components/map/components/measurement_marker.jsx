import { connect } from "react-redux";

// TODO: refactor during ZN-67
// import { selectGeoPoint } from "../../../store/actions/geo_points";
// import { showSidebar } from "../../../store/actions/sidebar";

import Marker from "react-leaflet-enhanced-marker";
import MarkerIcon from "./marker/marker_icon";

class MeasurementMarker extends React.Component {
  constructor (props) {
    super(props);

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.markerText = this.markerText.bind(this);
  }

  onMarkerClick () {
    const { id, selectGeoPoint, showGeoPointSidebar } = this.props;

    // TODO: refactor during ZN-67
    // selectGeoPoint(id);
    // showGeoPointSidebar();
  }

  markerText () {
    const { value } = this.props;

    if (value === undefined || _.isString(value))
      return value;
    return (Math.round((value + Number.EPSILON) * 10) / 10).toString();
  }

  render () {
    const { latitude, longitude, draggable, onMarkerDrag } = this.props;

    return (
      <Marker
        ref={el => this.marker = el}
        draggable={draggable}
        icon={<MarkerIcon text={this.markerText()} />}
        position={[latitude, longitude]}
        riseOnHover={true}
        onClick={this.onMarkerClick}
        onDrag={() => onMarkerDrag(this.marker.markerRef.leafletElement)}
      />
    )
  }
}

MeasurementMarker.propTypes = {
  id: PropTypes.number,
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  draggable: PropTypes.bool,
  onMarkerDrag: PropTypes.func
}

MeasurementMarker.defaultProps = {
  draggable: false
}

const mapDispatchToProps = dispatch => ({
  // TODO: refactor during ZN-67
  // selectGeoPoint: (geoPointId) => dispatch(selectGeoPoint({ id: geoPointId })),
  // showGeoPointSidebar: () => dispatch(showSidebar({ selectedTabId: "geo-point-details-tab" }))
});

export default connect(undefined, mapDispatchToProps)(MeasurementMarker);
