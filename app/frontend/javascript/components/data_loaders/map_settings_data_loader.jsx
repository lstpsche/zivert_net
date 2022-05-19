import { connect } from "react-redux";
import fetchLink from "../../helpers/fetch_link";
import { setMapSettings, setSettingsOptions } from "../../store/actions/main_map";

class MapSettingsDataLoader extends React.Component {
  fetchMapSettingsData () {
    const { setMapSettings, setSettingsOptions } = this.props;

    fetchLink({
      link: "/api/v1/map_settings",
      onSuccess: ({ map_settings, map_settings_options }) => {





        // TODO: add loading of ALL map settings (base + layers included)







        setMapSettings(map_settings.data.attributes);
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
  setMapSettings: (settings) => dispatch(setMapSettings(settings)),
  setSettingsOptions: (settingsOptions) => dispatch(setSettingsOptions(settingsOptions))
});

export default connect(undefined, mapDispatchToProps)(MapSettingsDataLoader);
