import MapDefaultsSettingsForm from "./components/map_defaults_settings_form";
import fetchLink from "../../../../helpers/fetch_link";

class MapDefaultsSettingsPage extends React.Component {
  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit ({ mapSettingsId, baseLayers, overlayLayers, units }) {
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
      onSuccess: () => {







        // TODO: update map_settings store





      }
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

export default MapDefaultsSettingsPage;
