import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Redirect } from "react-router-dom";

class TabsBase extends React.Component {
  tabsNames () {
    const { tabsList } = this.props;

    return Object.keys(tabsList);
  }

  selectedTabIndex () {
    const { selectedTab, tabsList } = this.props;

    return Object.keys(tabsList).findIndex((tabName) => tabName === selectedTab);
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
    const { onTabSelect, tabsList } = this.props;

    if (this.selectedTabIndex() === -1)
      return <Redirect to={"/" + this.pageName + "/" + this.tabsNames()[0]} />
    else
      return (
        <Tabs
          className={this.pageName + "-index"}
          selectedTabClassName="active" selectedTabPanelClassName="tab-panel__selected"
          selectedIndex={this.selectedTabIndex()} onSelect={(selectedId) => onTabSelect(tabsList, selectedId)}
        >
          <div className={this.pageName + "-tabs"}>
            <TabList className={this.pageName + "-tabs__tabs-list"}>
              { this.renderTabsList() }
            </TabList>
          </div>

          { this.renderTabPanels() }
        </Tabs>
      )
  }
}

export default TabsBase;
