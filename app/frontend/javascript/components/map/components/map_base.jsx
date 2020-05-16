import { Map as MapLeaflet, TileLayer } from "react-leaflet";
import GeoPointMarker from "./geo_point_marker";

class MapBase extends React.Component {
  constructor (props) {
    super(props);
  }

  renderGeoPoints () {
    const { geoPoints } = this.props;

    return geoPoints.map(({ id, latitude, longitude, radValue, comment }) => {
      return (
        <GeoPointMarker
          key={"geo-point-marker-" + id}
          latitude={latitude}
          longitude={longitude}
          radValue={radValue}
          comment={comment}
        />
      )
    })
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
