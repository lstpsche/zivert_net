import { connect } from "react-redux";
import fetchLink from "../../helpers/fetch_link";
import {setBaseLayer, setMapSettings, setOverlayLayer, setSettingsOptions} from "../../store/actions/main_map";

class MapSettingsDataLoader extends React.Component {
  fetchMapSettingsData () {
    const { setBaseLayer, setOverlayLayer, setMapSettings, setSettingsOptions } = this.props;

    fetchLink({
      link: "/api/v1/map_settings",
      onSuccess: ({ map_settings: { data: { attributes: { id, user_id, units, base_map, overlay_layers } } }, map_settings_options }) => {
        overlay_layers.forEach((layerName) => {
          setOverlayLayer({ layerName, selected: true })
        });

        setBaseLayer(base_map);
        setMapSettings({ id, user_id, units });
        setSettingsOptions(map_settings_options);
      },
      onFailure: (error) => {
        // TODO: add parsing of internal server errors
        throw new Error(error);
      }
    });
  }

  componentDidMount () {
    this.fetchMapSettingsData();
  }

  render () {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  setBaseLayer: (layerName) => dispatch(setBaseLayer({ layerName })),
  setOverlayLayer: ({ layerName, selected }) => dispatch(setOverlayLayer({ layerName, selected })),
  setMapSettings: (settings) => dispatch(setMapSettings(settings)),
  setSettingsOptions: (settingsOptions) => dispatch(setSettingsOptions(settingsOptions))
});

export default connect(undefined, mapDispatchToProps)(MapSettingsDataLoader);
