import { connect } from "react-redux";
import { hideSidebar } from "../../../store/actions/sidebar";
import { setMainMapRef } from "../../../store/actions/main_map";
import { disableMeasurementCreation, setMeasurementCreationData } from "../../../store/actions/user_actions";
import { Map as MapLeaflet, LayersControl } from "react-leaflet";
import RegularMapLayer from "./map_layers/base_layers/regular_map_layer";
import DimmedLayer from "./map_layers/overlays/dimmed_layer";
import MeasurementsLayer from "./map_layers/overlays/measurements_layer";
import MeasurementCreationLayer from "./map_layers/overlays/measurement_creation_layer";

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
    const { hideSidebar, disableMeasurementCreation, setMeasurementCreationData } = this.props;

    hideSidebar();
    disableMeasurementCreation();
    setMeasurementCreationData({ value: "", latitude: "", longitude: "" });
  }

  render () {
    const { center, zoom, regularMapSelected, setMainMapRef, measurementCreationEnabled } = this.props;
    let { dimmedLayerSelected, measurementsLayerSelected } = this.props;

    if (measurementCreationEnabled) {
      dimmedLayerSelected = true
      measurementsLayerSelected = false
    }

    return (
      <MapLeaflet
        id="main-map"
        ref={el => setMainMapRef(el)}
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

          <LayersControl.Overlay checked={measurementCreationEnabled} name={I18n.t("map.layers.overlay.measurements")}>
            <MeasurementCreationLayer />
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

const mapStateToProps = ({
  currentUser: { signedIn },
  mainMap: { layers },
  userActions: { measurementCreation: { state: measurementCreationEnabled } }
}) => ({
  signedIn,
  regularMapSelected: layers.base.regularMap.selected,
  dimmedLayerSelected: layers.overlays.dimmer.selected,
  measurementsLayerSelected: layers.overlays.measurements.selected,
  measurementCreationEnabled
});

const mapDispatchToProps = dispatch => ({
  hideSidebar: () => dispatch(hideSidebar()),
  setMainMapRef: (mapElement) => {
    if (mapElement !== null)
      dispatch(setMainMapRef({ref: mapElement.leafletElement}))
  },
  disableMeasurementCreation: () => dispatch(disableMeasurementCreation()),
  setMeasurementCreationData: ({ value, latitude, longitude }) => dispatch(setMeasurementCreationData({ value, latitude, longitude }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBase);
