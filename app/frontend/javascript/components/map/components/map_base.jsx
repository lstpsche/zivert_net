import { connect } from "react-redux";

// TODO: refactor during ZN-70
// import { unselectGeoPoints } from "../../../store/actions/geo_points";

import { hideSidebar } from "../../../store/actions/sidebar";
import { Map as MapLeaflet, LayersControl } from "react-leaflet";
import RegularMapLayer from "./map_layers/base_layers/regular_map_layer";
import DimmedLayer from "./map_layers/overlays/dimmed_layer";
import MeasurementsLayer from "./map_layers/overlays/measurements_layer";

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
  }

  handleMapSnglClick () {
    // TODO: refactor during ZN-70
    // this.props.unselectGeoPoints();
    this.props.hideSidebar();
  }

  render () {
    const { center, zoom, regularMapSelected, dimmedLayerSelected, measurementsLayerSelected } = this.props;

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

          <LayersControl.Overlay checked={measurementsLayerSelected} name={I18n.t("map.layers.overlay.measurements")}>
            <MeasurementsLayer />
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
  measurementsLayerSelected: layers.overlays.measurements.selected
});

const mapDispatchToProps = dispatch => ({
  // unselectGeoPoints: () => dispatch(unselectGeoPoints()),
  hideSidebar: () => dispatch(hideSidebar())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBase);
