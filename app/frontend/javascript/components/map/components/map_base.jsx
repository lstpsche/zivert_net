import { connect } from "react-redux";
import { showGeoPointCreationModal } from "../../../store/actions/modals";
import { unselectGeoPoints } from "../../../store/actions/geo_points";
import { hideSidebar } from "../../../store/actions/sidebar";
import { Map as MapLeaflet, LayersControl } from "react-leaflet";
import RegularMapLayer from "./map_layers/base_layers/regular_map_layer";
import DimmedLayer from "./map_layers/overlays/dimmed_layer";
import GeoPointsLayer from "./map_layers/overlays/geo_points_layer";

class MapBase extends React.Component {
  constructor (props) {
    super(props);

    this.handleMapSnglClick = this.handleMapSnglClick.bind(this);
    this.handleMapDblClick = this.handleMapDblClick.bind(this);
  }

  handleMapDblClick ({ originalEvent: { target: { className: targetClassName } }, latlng }) {
    if (!this.props.signedIn)
      return;

    const targetClasses = targetClassName.split(" ");

    if (targetClasses.includes("marker-icon"))
      return;

    this.props.showCreationModal(latlng);
  }

  handleMapSnglClick () {
    this.props.unselectGeoPoints();
    this.props.hideSidebar();
  }

  render () {
    const { center, zoom, regularMapSelected, dimmedLayerSelected, geoPointsLayerSelected } = this.props;

    return (
      <MapLeaflet
        id="main-map"
        center={center}
        zoom={zoom}
        onClick={this.handleMapSnglClick}
        doubleClickZoom={false}
        ondblclick={this.handleMapDblClick}
      >
        <LayersControl position="topleft">
          <LayersControl.BaseLayer checked={regularMapSelected} name={I18n.t("map.layers.base.map")}>
            <RegularMapLayer />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked={dimmedLayerSelected} name={I18n.t("map.layers.overlay.dim_map")}>
            <DimmedLayer />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked={geoPointsLayerSelected} name={I18n.t("map.layers.overlay.geo_points")}>
            <GeoPointsLayer />
          </LayersControl.Overlay>
        </LayersControl>
      </MapLeaflet>
    )
  }
}

MapBase.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number
}

MapBase.defaultProps = {
  center: [53.900574, 27.558995],  // The center of Minsk city
  zoom: 12  // Zoomed to fully show the whole Minsk city
}

const mapStateToProps = ({ currentUser: { signedIn }, mainMap: { layers } }) => ({
  signedIn,
  regularMapSelected: layers.base.regularMap.selected,
  dimmedLayerSelected: layers.overlays.dimmer.selected,
  geoPointsLayerSelected: layers.overlays.geoPoints.selected
});

const mapDispatchToProps = dispatch => ({
  showCreationModal: ({ lat: latitude, lng: longitude }) => dispatch(showGeoPointCreationModal({ latitude, longitude })),
  unselectGeoPoints: () => dispatch(unselectGeoPoints()),
  hideSidebar: () => dispatch(hideSidebar())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBase);
