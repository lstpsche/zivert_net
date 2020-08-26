import { connect } from "react-redux";
import { selectGeoPoint } from "../../../store/actions/geo_points";
import { showSidebar } from "../../../store/actions/sidebar";
import Marker from "react-leaflet-enhanced-marker";
import MarkerIcon from "./marker/marker_icon";

class GeoPointMarker extends React.Component {
  constructor (props) {
    super(props);

    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick () {
    const { id, selectGeoPoint, showGeoPointSidebar } = this.props;

    selectGeoPoint(id);
    showGeoPointSidebar();
  }

  render () {
    const { latitude, longitude, radValue } = this.props;

    return (
      <Marker
        icon={<MarkerIcon text={radValue.toString()} />}
        position={[latitude.toString(), longitude.toString()]}
        riseOnHover={true}
        onClick={this.onMarkerClick}
      />
    )
  }
}

GeoPointMarker.propTypes = {
  id: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  radValue: PropTypes.number.isRequired
}

const mapDispatchToProps = dispatch => ({
  selectGeoPoint: (geoPointId) => dispatch(selectGeoPoint({ id: geoPointId })),
  showGeoPointSidebar: () => dispatch(showSidebar({ selectedTabId: "geo-point-details-tab" }))
});

export default connect(undefined, mapDispatchToProps)(GeoPointMarker);
