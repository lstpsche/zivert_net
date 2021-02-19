import ProfileSettingsPage from "./tabs_panes/profile/profile_settings_page";
import SettingsTabs from "./settings_tabs";

class SettingsIndex extends React.Component {
  constructor (props) {
    super(props);

    this.tabsList = {
      profile: { title: I18n.t("settings.tabs.profile"), component: ProfileSettingsPage }
    };

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
