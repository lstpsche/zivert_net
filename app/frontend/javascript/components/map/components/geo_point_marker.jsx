import Marker from "react-leaflet-enhanced-marker";
import MarkerIcon from "./marker/marker_icon";
import MarkerPopup from "./marker/marker_popup";
import fetchLink from "../../../helpers/fetch_link";

class GeoPointMarker extends React.Component {
  constructor (props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
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
        console.log("Internal server error.")
        console.log(error);
      }
    });
  }

  render () {
    const { removable, geoPointUserId, latitude, longitude, radValue, comment } = this.props;

    return (
      <Marker
        icon={<MarkerIcon text={radValue.toString()} />}
        position={[latitude.toString(), longitude.toString()]}
        riseOnHover={true}
      >
        <MarkerPopup
          markerRemovable={removable}
          text={comment}
          geoPointUserId={geoPointUserId}
          removalCallback={this.onRemove}
        />
      </Marker>
    )
  }
}

GeoPointMarker.propTypes = {
  removable: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  radValue: PropTypes.number.isRequired,
  comment: PropTypes.string
}

GeoPointMarker.defaultProps = {
  comment: "",
  removable: false
}

export default GeoPointMarker;
