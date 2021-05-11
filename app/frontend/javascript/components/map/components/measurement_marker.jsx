import { connect } from "react-redux";

// TODO: refactor during ZN-67
// import { selectGeoPoint } from "../../../store/actions/geo_points";
// import { showSidebar } from "../../../store/actions/sidebar";

import Marker from "react-leaflet-enhanced-marker";
import MarkerIcon from "./marker/marker_icon";
import generateMarkerClassName from "../../../helpers/generate_marker_class_name";

class MeasurementMarker extends React.Component {
  constructor (props) {
    super(props);

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.markerValue = this.markerValue.bind(this);
  }

  onMarkerClick () {
    const { id, selectGeoPoint, showGeoPointSidebar } = this.props;

    // TODO: refactor during ZN-67
    // selectGeoPoint(id);
    // showGeoPointSidebar();
  }

  markerValue () {
    const { value } = this.props;

    if (value === undefined || _.isString(value))
      return value;
    return (Math.round((value + Number.EPSILON) * 10) / 10);
  }

  render () {
    const { latitude, longitude, draggable, onMarkerDrag } = this.props;
    const value = this.markerValue();

    return (
      <Marker
        ref={el => this.marker = el}
        draggable={draggable}
        icon={<MarkerIcon text={value?.toString()} className={generateMarkerClassName(value)} />}
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
