import { Map as MapLeaflet, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";

class MapBase extends React.Component {
  constructor (props) {
    super(props);

    const { markers } = props;

    this.state = { markers };
  }

  renderMarkers () {
    const { markers } = this.state;

    // TODO: add markers rendering here [#ZN-12]
    return
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
        {this.renderMarkers()}
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
  center: [53.900574, 27.558995],  // Center of Minsk city
  zoom: 12,  // Zoomed to fully show the whole Minsk city
  markers: []
}

export default MapBase;
