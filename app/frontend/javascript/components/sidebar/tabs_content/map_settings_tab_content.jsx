import BaseMapSelection from "./map_settings/base_map_selection";
import OverlaysLayersSelection from "./map_settings/overlays_layers_selection";

class MapSettingsTabContent extends React.Component {
  render () {
    return (
      <div id="map-settings-tab-content">
        <BaseMapSelection />

        <hr />

        <OverlaysLayersSelection />
      </div>
    )
  }
}

export default MapSettingsTabContent;
