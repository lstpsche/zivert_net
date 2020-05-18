import { Map as MapLeaflet, LayersControl } from "react-leaflet";
import RegularMapLayer from "./map_layers/base_layers/regular_map_layer";
import DimmedLayer from "./map_layers/overlays/dimmed_layer";
import GeoPointsLayer from "./map_layers/overlays/geo_points_layer";

class MapBase extends React.Component {
  constructor (props) {
    super(props);

    this.handleMapDblClick = this.handleMapDblClick.bind(this);
  }

  handleMapDblClick ({ originalEvent: { path: pathToTarget }, latlng }) {
    const classesPath = pathToTarget.map((el) => el.className).join(" ").split(" ");

    if (classesPath.includes("leaflet-marker-icon") || classesPath.includes("marker-popup"))
      return;

    this.props.onDoubleClick(latlng);
  }

  render () {
    const { center, zoom, markers } = this.props;

    return (
      <MapLeaflet
        id="main-map"
        center={center}
        zoom={zoom}
        doubleClickZoom={false}
        ondblclick={this.handleMapDblClick}
      >
        <LayersControl position="topleft">
          <LayersControl.BaseLayer checked name={I18n.t("map.layers.base.map")}>
            <RegularMapLayer />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay name={I18n.t("map.layers.overlay.dim_map")}>
            <DimmedLayer />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name={I18n.t("map.layers.overlay.geo_points")}>
            <GeoPointsLayer geoPoints={markers} />
          </LayersControl.Overlay>
        </LayersControl>
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
