import TabsBase from "../common/tabs_base";

class SettingsTabs extends TabsBase {
  constructor(props) {
    super(props);

    this.pageName = "settings";
  }
}

SettingsTabs.propTypes = {
  onTabSelect: PropTypes.func.isRequired,
  selectedTab: PropTypes.string,
  tabsList: PropTypes.object.isRequired
}

export default SettingsTabs;
