import { connect } from "react-redux";

// TODO: refactor during ZN-70
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

    // TODO: refactor during ZN-70
    // selectGeoPoint(id);
    // showGeoPointSidebar();
  }

  markerText () {
    const { value } = this.props;

    return (Math.round((value + Number.EPSILON) * 10) / 10).toString();
  }

  render () {
    const { latitude, longitude } = this.props;

    return (
      <Marker
        icon={<MarkerIcon text={this.markerText()} />}
        position={[latitude.toString(), longitude.toString()]}
        riseOnHover={true}
        onClick={this.onMarkerClick}
      />
    )
  }
}

MeasurementMarker.propTypes = {
  id: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

const mapDispatchToProps = dispatch => ({
  // selectGeoPoint: (geoPointId) => dispatch(selectGeoPoint({ id: geoPointId })),
  // showGeoPointSidebar: () => dispatch(showSidebar({ selectedTabId: "geo-point-details-tab" }))
});

export default connect(undefined, mapDispatchToProps)(MeasurementMarker);
