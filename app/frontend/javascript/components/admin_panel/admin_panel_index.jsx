import AdminPanelTabs from "./admin_panel_tabs";
import UsersAdminPanelPage from "./tabs_panes/users/users_admin_panel_page";

class AdminPanelIndex extends React.Component {
  constructor(props) {
    super(props);

    this.tabsList = {
      users: { title: I18n.t("admin_panel.tabs.users.title"), component: UsersAdminPanelPage }
    };

    this.onTabSelect = this.onTabSelect.bind(this);
  }

  onTabSelect (tabsList, tabIndex) {
    const tabName = Object.keys(tabsList)[tabIndex];

    this.props.history.push("/admin_panel/" + tabName);
  }

  render () {
    const { tab: selectedTab } = this.props.match.params;

    return (
      <div className="admin-panel-index">
        <h3 className="admin-panel-title">{ I18n.t("admin_panel.title") }</h3>

        <AdminPanelTabs onTabSelect={this.onTabSelect} selectedTab={selectedTab} tabsList={this.tabsList} />
      </div>
    )
  }
}

export default AdminPanelIndex;
