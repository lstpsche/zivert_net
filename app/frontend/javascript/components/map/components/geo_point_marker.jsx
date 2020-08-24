import { connect } from "react-redux";
import { selectGeoPoint } from "../../../store/actions/geo_points";
import { showSidebar } from "../../../store/actions/sidebar";
import Marker from "react-leaflet-enhanced-marker";
import MarkerIcon from "./marker/marker_icon";
import fetchLink from "../../../helpers/fetch_link";

class GeoPointMarker extends React.Component {
  constructor (props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onRemove () {
    const { id } = this.props;

    fetchLink({
      link: "/api/v1/geo_points/" + id,
      method: "DELETE",
      onSuccess: ({ success, errors }) => {
        if (!success) {
          // TODO: add errors handling with alertify or smth
          console.log("Could not remove.");
          console.log(errors);
        }
      },
      onFailure: (error) => {
        // TODO: add errors handling with alertify or smth
        console.log("Internal server error.");
        console.log(error);
      }
    });
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
