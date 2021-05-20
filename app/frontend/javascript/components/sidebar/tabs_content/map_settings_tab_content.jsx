import { connect } from "react-redux";
import BaseMapSelection from "./map_settings/base_map_selection";
import OverlayLayersSelection from "./map_settings/overlay_layers_selection";
import MapSettingsSelection from "./map_settings/map_settings_selection";

class MapSettingsTabContent extends React.Component {
  render () {
    return (
      <div id="map-settings-tab-content">
        <BaseMapSelection />
        <OverlayLayersSelection />
        <MapSettingsSelection />
      </div>
    )
  }
}

const mapStateToProps = ({ mainMap: { layers, settings, settingsOptions } }) => ({
  layers: { ...layers.base, ...layers.overlays },
  mapSettings: settings,
  settingsOptions
});

export default connect(mapStateToProps)(MapSettingsTabContent);
