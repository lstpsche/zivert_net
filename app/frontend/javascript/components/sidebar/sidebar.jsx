import { connect } from "react-redux";
import { showSidebar, hideSidebar } from "../../store/actions/sidebar";
import { Sidebar as SidebarLib, Tab } from "react-leaflet-sidetabs";
import { FaChevronRight, FaTachometerAlt, FaMapMarkerAlt } from "react-icons/fa";
import UserMeasurementsHistoryTabContent from "./tabs_content/user_measurements_history_tab_content";
import GeoPointDetailsTabContent from "./tabs_content/geo_point_details_tab_content";

class Sidebar extends React.Component {
  render () {
    const { sidebarCollapsed, selectedTabId, showSidebar, hideSidebar } = this.props;

    return (
      <SidebarLib
        id="sidebar" position="right"
        collapsed={sidebarCollapsed} selected={selectedTabId}
        onOpen={showSidebar} onClose={hideSidebar}
        closeIcon={<FaChevronRight />}
      >
        <Tab
          id="user-measurements-history-tab"
          header={ I18n.t("sidebar.tabs.headers.user_measurements_history") }
          icon={<FaTachometerAlt />}
          anchor="top"
        >
          <UserMeasurementsHistoryTabContent />
        </Tab>

        <Tab
          id="geo-point-details-tab"
          header={ I18n.t("sidebar.tabs.headers.geo_point_details") }
          icon={<FaMapMarkerAlt />}
          anchor="top"
        >
          <GeoPointDetailsTabContent />
        </Tab>
      </SidebarLib>
    )
  }
}

const mapStateToProps = ({ sidebar: { collapsed, selectedTabId } }) => ({
  sidebarCollapsed: collapsed,
  selectedTabId
});

const mapDispatchToProps = dispatch => ({
  showSidebar: (selectedTabId) => dispatch(showSidebar({ selectedTabId })),
  hideSidebar: () => dispatch(hideSidebar())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
