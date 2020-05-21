import { connect } from "react-redux";
import { Map as MapLeaflet, LayersControl } from "react-leaflet";
import RegularMapLayer from "./map_layers/base_layers/regular_map_layer";
import DimmedLayer from "./map_layers/overlays/dimmed_layer";
import GeoPointsLayer from "./map_layers/overlays/geo_points_layer";

class MapBase extends React.Component {
  constructor (props) {
    super(props);

    this.handleMapDblClick = this.handleMapDblClick.bind(this);
  }

  handleMapDblClick ({ originalEvent: { target: { className: targetClassName } }, latlng }) {
    if (!this.props.signedIn)
      return;

    const targetClasses = targetClassName.split(" ");

    if (targetClasses.includes("marker-icon"))
      return;

    this.props.onDoubleClick(latlng);
  }

  render () {
    const { center, zoom, markers, currentUserId } = this.props;

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
            <GeoPointsLayer geoPoints={markers} currentUserId={currentUserId} />
          </LayersControl.Overlay>
        </LayersControl>
      </MapLeaflet>
    )
  }
}

MapBase.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  markers: PropTypes.array.isRequired,
  currentUserId: PropTypes.number.isRequired
}

MapBase.defaultProps = {
  center: [53.900574, 27.558995],  // The center of Minsk city
  zoom: 12  // Zoomed to fully show the whole Minsk city
}

const mapStateToProps = ({ currentUser: { signedIn } }) => ({ signedIn });

export default connect(mapStateToProps)(MapBase);
