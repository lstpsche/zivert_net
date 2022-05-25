import { connect } from "react-redux";
import MapDefaultsSettingsForm from "./components/map_defaults_settings_form";
import fetchLink from "../../../../helpers/fetch_link";
import { setBaseLayer, setMapSettings, setOverlayLayer } from "../../../../store/actions/main_map";

class MapDefaultsSettingsPage extends React.Component {
  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.updateBaseLayerStore = this.updateBaseLayerStore.bind(this);
    this.updateOverlayLayersStore = this.updateOverlayLayersStore.bind(this);
  }

  handleSubmit ({ mapSettingsId, baseLayers, overlayLayers, units }) {
    return new Promise((resolve, reject) => {
      fetchLink({
        link: "/api/v1/map_settings/" + mapSettingsId,
        method: "PUT",
        body: JSON.stringify({
          map_settings: {
            base_map: baseLayers,
            overlay_layers: overlayLayers,
            units
          }
        }),
        onSuccess: ({ error }) => {
          if (error) {
            reject();

            return;
          }

          const { setMapSettings } = this.props;

          resolve();
          this.updateBaseLayerStore(baseLayers);
          this.updateOverlayLayersStore(overlayLayers);
          setMapSettings(units);
        }
      })
    })
  }

  //
  // STORE UPDATERS
  //

  updateBaseLayerStore (baseLayers) {
    const { setBaseLayer } = this.props;

    setBaseLayer(
      Object.entries(baseLayers).filter(([_layerName, { selected }]) => (selected))[0][0]
    )
  }

  updateOverlayLayersStore (overlayLayers) {
    const { setOverlayLayer } = this.props;

    Object.keys(overlayLayers).forEach((layerName) => {
      setOverlayLayer({ layerName, selected: overlayLayers[layerName].selected })
    })
  }

  render () {
    return (
      <div className="map-defaults-settings-page">
        <h2>
          { I18n.t("settings.map_defaults.title") }
        </h2>

        <MapDefaultsSettingsForm
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setBaseLayer: (layerName) => dispatch(setBaseLayer({ layerName })),
  setOverlayLayer: ({ layerName, selected }) => dispatch(setOverlayLayer({ layerName, selected })),
  setMapSettings: (units) => dispatch(setMapSettings({ units }))
});

export default connect(undefined, mapDispatchToProps)(MapDefaultsSettingsPage);
