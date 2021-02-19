import ProfileSettingsPage from "./tabs_panes/profile/profile_settings_page";
import SettingsTabs from "./settings_tabs";

class SettingsIndex extends React.Component {
  constructor (props) {
    super(props);

    this.tabsList = {
      profile: { title: I18n.t("settings.tabs.profile"), component: ProfileSettingsPage }
    };
  }

  selectedTabIndex () {
    return Object.keys(this.tabsList).findIndex((el) => el === this.props.match.params.tab);
  }

  render () {
    return (
      <SettingsTabs selectedTabIndex={this.selectedTabIndex()} tabsList={this.tabsList}/>
    )
  }
}

export default SettingsIndex;
