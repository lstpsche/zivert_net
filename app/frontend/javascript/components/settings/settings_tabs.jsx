import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Redirect } from "react-router-dom";

class SettingsTabs extends React.Component {
  constructor(props) {
    super(props);

    this.onTabSelect = this.onTabSelect.bind(this);
  }

  tabsNames () {
    const { tabsList } = this.props;

    return Object.keys(tabsList);
  }

  onTabSelect (tabIndex) {
    const { tabsList } = this.props;

    const tabName = Object.keys(tabsList)[tabIndex];

    this.props.history.push("/settings/" + tabName);
  }

  renderTabsList () {
    const { tabsList } = this.props;

    return this.tabsNames().map((tabName) => {
      const { title: tabTitle } = tabsList[tabName];

      return (
        <Tab key={tabName + "-tab-key"} className="tab">
          { tabTitle }
        </Tab>
      )
    });
  }

  renderTabPanels () {
    const { tabsList } = this.props;

    return this.tabsNames().map((tabName) => {
      const TabPanelBody = tabsList[tabName].component;

      return (
        <TabPanel key={tabName + "-tab-panel-key"} className="tab-panel">
          <TabPanelBody key={tabName + "-tab-panel-body-key"} />
        </TabPanel>
      )
    });
  }

  render () {
    const { selectedTabIndex } = this.props;

    if (selectedTabIndex === -1)
      return <Redirect to={"/settings/" + this.tabsNames()[0]} />
    else
      return (
        <Tabs
          className="settings-index"
          selectedTabClassName="active" selectedTabPanelClassName="tab-panel__selected"
          selectedIndex={selectedTabIndex} onSelect={this.onTabSelect}
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

SettingsTabs.propTypes = {
  selectedTabIndex: PropTypes.number,
  tabsList: PropTypes.object.isRequired
}

export default SettingsTabs;
