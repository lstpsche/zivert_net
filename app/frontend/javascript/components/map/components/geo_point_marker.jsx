import { connect } from "react-redux";
import { removeGeoPoint } from "../../../store/actions/geo_points";
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
        if (success)
          this.props.removeGeoPoint(id);
        else {
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
    const { latitude, longitude, radValue, comment } = this.props;

    return (
      <Marker
        icon={<MarkerIcon text={radValue.toString()} />}
        position={[latitude.toString(), longitude.toString()]}
        riseOnHover={true}
      >
        <MarkerPopup
          text={comment}
          removalCallback={this.onRemove}
        />
      </Marker>
    )
  }
}

GeoPointMarker.propTypes = {
  id: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  radValue: PropTypes.number.isRequired,
  comment: PropTypes.string
}

GeoPointMarker.defaultProps = {
  comment: ""
}

const mapDispatchToProps = dispatch => ({
  removeGeoPoint: (id) => dispatch(removeGeoPoint({ id }))
})

export default connect(undefined, mapDispatchToProps)(GeoPointMarker);
