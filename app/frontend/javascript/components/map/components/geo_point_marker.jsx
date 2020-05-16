import Marker from "react-leaflet-enhanced-marker";
import MarkerIcon from "./marker/marker_icon";
import MarkerPopup from "./marker/marker_popup";

class GeoPointMarker extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { latitude, longitude, radValue, comment } = this.props;

    return (
      <Marker
        icon={<MarkerIcon text={radValue.toString()} />}
        position={[latitude.toString(), longitude.toString()]}
      >
        {
          comment
          ? (<MarkerPopup text={comment} />)
          : null
        }
      </Marker>
    )
  }
}

GeoPointMarker.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  radValue: PropTypes.number.isRequired,
  comment: PropTypes.string
}

export default GeoPointMarker;
