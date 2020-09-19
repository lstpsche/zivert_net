import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Redirect } from "react-router-dom";
import ProfileSettingsPage from "./profile/profile_settings_page";

class SettingsIndex extends React.Component {
  constructor (props) {
    super(props);

    this.tabsList = {
      profile: { title: I18n.t("settings.tabs.profile"), component: ProfileSettingsPage }
    };

    this.onTabSelect = this.onTabSelect.bind(this);
  }

  tabsNames () {
    return Object.keys(this.tabsList);
  }

  selectedTabIndex () {
    return this.tabsNames().findIndex((el) => el === this.props.match.params.tab);
  }

  onTabSelect (tabIndex) {
    const tabName = Object.keys(this.tabsList)[tabIndex];

    this.props.history.push("/settings/" + tabName);
  }

  renderTabsList () {
    return this.tabsNames().map((tabName) => {
      const { title: tabTitle } = this.tabsList[tabName];

      return (
        <Tab key={tabName + "-tab-key"} className="tab">
          { tabTitle }
        </Tab>
      )
    });
  }

  renderTabPanels () {
    return this.tabsNames().map((tabName) => {
      const TabPanelBody = this.tabsList[tabName].component;

      return (
        <TabPanel key={tabName + "-tab-panel-key"} className="tab-panel">
          <TabPanelBody key={tabName + "-tab-panel-body-key"} />
        </TabPanel>
      )
    });
  }

  render () {
    const selectedTab = this.selectedTabIndex();

    if (selectedTab === -1)
      return <Redirect to={"/settings/" + this.tabsNames()[0]} />
    else
      return (
        <Tabs
          className="settings-index"
          selectedTabClassName="active" selectedTabPanelClassName="tab-panel__selected"
          selectedIndex={selectedTab} onSelect={this.onTabSelect}
        >
          <div className="settings-tabs">
            <TabList className="settings-tabs__tabs-list">
              { this.renderTabsList() }
            </TabList>
          </div>

          { this.renderTabPanels() }
        </Tabs>
      )
  }
}

export default SettingsIndex;
