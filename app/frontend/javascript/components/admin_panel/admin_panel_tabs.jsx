import TabsBase from "../common/tabs_base";

class AdminPanelTabs extends TabsBase {
  constructor(props) {
    super(props);

    this.pageName = "admin-panel";
  }
}

AdminPanelTabs.propTypes = {
  onTabSelect: PropTypes.func.isRequired,
  selectedTab: PropTypes.string,
  tabsList: PropTypes.object.isRequired
}

export default AdminPanelTabs;
