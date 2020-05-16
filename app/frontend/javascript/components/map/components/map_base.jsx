import { Map as MapLeaflet, TileLayer, Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";

class MapBase extends React.Component {
  constructor (props) {
    super(props);
  }

  renderGeoPoint ({ id, latitude, longitude, radValue, comment }) {
    // TODO: try showing 2 Popups (one with radValue, and one with comment) at different places
    // radValue - at the marker, like it's a marker part; comment - higher than marker, like a popup

    return (
      <Marker
        key={"geo-point-marker-" + id}
        position={[latitude, longitude]}
        riseOnHover={true}
      >
        <Popup>
          {comment}
        </Popup>
      </Marker>
    )
  }

  renderGeoPoints () {
    const { geoPoints } = this.props;

    return geoPoints.map(this.renderGeoPoint)
  }

  render () {
    const { center, zoom } = this.props;

    return (
      <MapLeaflet
        id="main-map"
        center={center}
        zoom={zoom}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.renderGeoPoints()}
      </MapLeaflet>
    )
  }
}

MapBase.propTypes = {
  center: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  markers: PropTypes.array.isRequired
}

MapBase.defaultProps = {
  center: [53.900574, 27.558995],  // The center of Minsk city
  zoom: 12,  // Zoomed to fully show the whole Minsk city
  markers: []
}

export default MapBase;
