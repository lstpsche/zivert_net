import ProfileSettingsPage from "./tabs_panes/profile/profile_settings_page";
import MapDefaultsSettingsPage from "./tabs_panes/profile/map_defaults_settings_page";
import SettingsTabs from "./settings_tabs";
import GeigerCounterSettingsPage from "./tabs_panes/profile/geiger_counter_settings_page";

class SettingsIndex extends React.Component {
  constructor (props) {
    super(props);

    this.tabsList = {
      profile: { title: I18n.t("settings.tabs.profile"), component: ProfileSettingsPage },
      'map-defaults': { title: I18n.t("settings.tabs.map_defaults"), component: MapDefaultsSettingsPage },
      'geiger-counter': { title: I18n.t("settings.tabs.geiger_counter"), component: GeigerCounterSettingsPage }
    }

    this.onTabSelect = this.onTabSelect.bind(this);
  }

  onTabSelect (tabsList, tabIndex) {
    const tabName = Object.keys(tabsList)[tabIndex];

    this.props.history.push("/settings/" + tabName);
  }

  render () {
    const { tab: selectedTab } = this.props.match.params;

    return (
      <SettingsTabs onTabSelect={this.onTabSelect} selectedTab={selectedTab} tabsList={this.tabsList} />
    )
  }
}

export default SettingsIndex;
