import { connect } from "react-redux";
import { clearSidebarData, hideSidebar } from "../../../store/actions/sidebar";
import { setMainMapRef } from "../../../store/actions/main_map";
import { disableMeasurementCreation, setMeasurementCreationData } from "../../../store/actions/user_actions";
import { Map as MapLeaflet, LayersControl } from "react-leaflet";
import RegularMapLayer from "./map_layers/base_layers/regular_map_layer";
import TemperatureMapLayer from "./map_layers/weather_overlays/temperature_map_layer";
import WindMapLayer from "./map_layers/weather_overlays/wind_map_layer";
import PrecipitationMapLayer from "./map_layers/weather_overlays/precipitation_map_layer";
import CloudsMapLayer from "./map_layers/weather_overlays/clouds_map_layer";
import DimmedLayer from "./map_layers/overlays/dimmed_layer";
import MeasurementsLayer from "./map_layers/overlays/measurements_layer";
import MeasurementCreationLayer from "./map_layers/overlays/measurement_creation_layer";
import CustomHeatmapLayer from "./map_layers/overlays/heatmap_layer";
import HexagonsLayer from "./map_layers/overlays/hexagons_layer";
import CurrentLocationControl from "react-leaflet-current-location-control";

class MapBase extends React.Component {
  constructor (props) {
    super(props);

    this.handleMapSnglClick = this.handleMapSnglClick.bind(this);
  }

  handleMapSnglClick () {
    const { clearSidebarData, hideSidebar, disableMeasurementCreation, setMeasurementCreationData } = this.props;

    hideSidebar();
    clearSidebarData();
    disableMeasurementCreation();
    setMeasurementCreationData({ value: "", latitude: "", longitude: "" });
  }

  render () {
    const {
      center, zoom, regularMapSelected, setMainMapRef, measurementCreationEnabled,
      temperatureLayerSelected, windLayerSelected, precipitationLayerSelected, cloudsLayerSelected
    } = this.props;
    let { dimmedLayerSelected, measurementsLayerSelected, heatmapLayerSelected, hexagonsLayerSelected } = this.props;

    switch (true) {
      case measurementCreationEnabled:
        dimmedLayerSelected = true
        measurementsLayerSelected = false
        heatmapLayerSelected = false
        hexagonsLayerSelected = false
        break;

      case hexagonsLayerSelected:
        dimmedLayerSelected = false
        measurementsLayerSelected = false
        heatmapLayerSelected = false
        break;
    }

    return (
      <MapLeaflet
        id="main-map"
        ref={el => setMainMapRef(el)}
        center={center}
        zoom={zoom}
        onClick={this.handleMapSnglClick}
        doubleClickZoom={true}
      >
        <CurrentLocationControl position="topleft" />

        <LayersControl position="topleft">
          <LayersControl.BaseLayer checked={regularMapSelected} name={I18n.t("map.layers.base.map")}>
            <RegularMapLayer />
          </LayersControl.BaseLayer>

          {/* WEATHER LAYERS */}
          <LayersControl.Overlay checked={temperatureLayerSelected} name={I18n.t("map.layers.base.temperature")}>
            <TemperatureMapLayer />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked={windLayerSelected} name={I18n.t("map.layers.base.wind")}>
            <WindMapLayer />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked={precipitationLayerSelected} name={I18n.t("map.layers.base.precipitation")}>
            <PrecipitationMapLayer />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked={cloudsLayerSelected} name={I18n.t("map.layers.base.clouds")}>
            <CloudsMapLayer />
          </LayersControl.Overlay>

          {/* MEASUREMENTS LAYERS */}
          <LayersControl.Overlay checked={dimmedLayerSelected} name={I18n.t("map.layers.overlay.dim_map")}>
            <DimmedLayer />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked={measurementsLayerSelected} name={I18n.t("map.layers.overlay.measurements")}>
            <MeasurementsLayer />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked={measurementCreationEnabled} name={I18n.t("map.layers.overlay.measurements")}>
            <MeasurementCreationLayer />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked={heatmapLayerSelected} name={I18n.t("map.layers.overlay.heatmap")}>
            <CustomHeatmapLayer />
          </LayersControl.Overlay>

          {
            // LayersControl.Overlay can't control hexagons layer, so will use this crutch
            hexagonsLayerSelected
              ? <HexagonsLayer />
              : null
          }
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
  // BASE
  regularMapSelected: layers.base.regularMap.selected,
  // MEASUREMENTS
  dimmedLayerSelected: layers.overlays.dimmer.selected,
  measurementsLayerSelected: layers.overlays.measurements.selected,
  heatmapLayerSelected: layers.overlays.heatmap.selected,
  hexagonsLayerSelected: layers.overlays.hexagons.selected,
  // WEATHER
  temperatureLayerSelected: layers.weatherOverlays.temperature.selected,
  windLayerSelected: layers.weatherOverlays.wind.selected,
  precipitationLayerSelected: layers.weatherOverlays.precipitation.selected,
  cloudsLayerSelected: layers.weatherOverlays.clouds.selected,
  measurementCreationEnabled
});

const mapDispatchToProps = dispatch => ({
  hideSidebar: () => dispatch(hideSidebar()),
  clearSidebarData: () => dispatch(clearSidebarData()),
  setMainMapRef: (mapElement) => {
    if (mapElement !== null)
      dispatch(setMainMapRef({ref: mapElement.leafletElement}))
  },
  disableMeasurementCreation: () => dispatch(disableMeasurementCreation()),
  setMeasurementCreationData: ({ value, latitude, longitude }) => dispatch(setMeasurementCreationData({ value, latitude, longitude }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapBase);
