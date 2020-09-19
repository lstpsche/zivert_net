import { connect } from "react-redux";
import { showSidebar, hideSidebar } from "../../store/actions/sidebar";
import { Sidebar as SidebarLib, Tab } from "react-leaflet-sidetabs";
import { FaChevronRight, FaMapMarkerAlt, FaLayerGroup } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import UserMeasurementsHistoryTabContent from "./tabs_content/user_measurements_history_tab_content";
import GeoPointDetailsTabContent from "./tabs_content/geo_point_details_tab_content";
import MapSettingsTabContent from "./tabs_content/map_settings_tab_content";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.renderUserMeasurementsHistoryTab = this.renderUserMeasurementsHistoryTab.bind(this);
  }

  renderUserMeasurementsHistoryTab () {
    const { userSignedIn } = this.props;

    return (
      <Tab
        id="user-measurements-history-tab"
        header={ I18n.t("sidebar.tabs.headers.user_measurements_history") }
        icon={<MdHistory />}
        anchor="top"
        disabled={!userSignedIn}
      >
        <UserMeasurementsHistoryTabContent />
      </Tab>
    )
  }

  renderGeoPointDetailsTab () {
    return (
      <Tab
        id="geo-point-details-tab"
        header={ I18n.t("sidebar.tabs.headers.geo_point_details") }
        icon={<FaMapMarkerAlt />}
        anchor="top"
      >
        <GeoPointDetailsTabContent />
      </Tab>
    )
  }

  renderMapSettingsTab () {
    return (
      <Tab
        id="map-settings-tab"
        header={ I18n.t("sidebar.tabs.headers.map_settings") }
        icon={<FaLayerGroup />}
        anchor="bottom"
      >
        <MapSettingsTabContent />
      </Tab>
    )
  }

  render () {
    const { sidebarCollapsed, selectedTabId, showSidebar, hideSidebar } = this.props;

    return (
      <SidebarLib
        id="sidebar" position="right"
        collapsed={sidebarCollapsed} selected={selectedTabId}
        onOpen={showSidebar} onClose={hideSidebar}
        closeIcon={<FaChevronRight />}
      >
        { this.renderUserMeasurementsHistoryTab() }
        { this.renderGeoPointDetailsTab() }
        { this.renderMapSettingsTab() }
      </SidebarLib>
    )
  }
}

const mapStateToProps = ({ sidebar: { collapsed, selectedTabId }, currentUser: { signedIn } }) => ({
  sidebarCollapsed: collapsed,
  selectedTabId,
  userSignedIn: signedIn
});

const mapDispatchToProps = dispatch => ({
  showSidebar: (selectedTabId) => dispatch(showSidebar({ selectedTabId })),
  hideSidebar: () => dispatch(hideSidebar())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
