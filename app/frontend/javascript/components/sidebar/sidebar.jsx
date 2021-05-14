import { connect } from "react-redux";
import { showSidebar, hideSidebar, clearSidebarData } from "../../store/actions/sidebar";
import {
  enableMeasurementCreation,
  disableMeasurementCreation,
  setMeasurementCreationData
} from "../../store/actions/user_actions";
import { Sidebar as SidebarLib, Tab } from "react-leaflet-sidetabs";
import { FaChevronRight, FaMapMarkerAlt, FaPlusCircle, FaMapMarkedAlt, FaLayerGroup } from "react-icons/fa";
import UserMeasurementsHistoryTabContent from "./tabs_content/user_measurements_history_tab_content";
import MapSettingsTabContent from "./tabs_content/map_settings_tab_content";
import MeasurementCreationTabContent from "./tabs_content/measurement_creation_tab_content";
import MeasurementsClusterDetailsTabContent from "./tabs_content/measurements_cluster_details_tab_content";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.renderUserMeasurementsHistoryTab = this.renderUserMeasurementsHistoryTab.bind(this);
    this.onSidebarClose = this.onSidebarClose.bind(this);
  }

  onSidebarClose () {
    const { hideSidebar, clearSidebarData } = this.props;

    hideSidebar();
    clearSidebarData();
  }

  renderUserMeasurementsHistoryTab () {
    const { userSignedIn } = this.props;

    return (
      <Tab
        id="user-measurements-history-tab"
        header={ I18n.t("sidebar.tabs.headers.user_measurements_history") }
        icon={<FaMapMarkedAlt />}
        anchor="top"
        disabled={!userSignedIn}
      >
        <UserMeasurementsHistoryTabContent />
      </Tab>
    )

  }

  renderMeasurementCreationTab () {
    return (
      <Tab
        id="measurement-creation-tab"
        header={ I18n.t("sidebar.tabs.headers.measurement_creation") }
        icon={<FaPlusCircle />}
        anchor="top"
      >
        <MeasurementCreationTabContent
          closeSidebar={this.onSidebarClose}
        />
      </Tab>
    )
  }

  renderMeasurementsClusterDetailsTab () {
    return (
      <Tab
        id="measurements-cluster-details-tab"
        header={ I18n.t("sidebar.tabs.headers.measurements_cluster_details") }
        icon={<FaMapMarkerAlt />}
        anchor="top"
      >
        <MeasurementsClusterDetailsTabContent />
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

  onMeasurementCreationTabSelected () {
    const { mainMapRef, enableMeasurementCreation, setMeasurementCreationData } = this.props;
    const { lat, lng } = mainMapRef.getCenter();

    setMeasurementCreationData({ value: "", latitude: lat.toString(), longitude: lng.toString() });
    enableMeasurementCreation();
  }

  onMeasurementCreationTabUnselected () {
    const { disableMeasurementCreation, setMeasurementCreationData } = this.props;

    disableMeasurementCreation();
    setMeasurementCreationData({ value: "", latitude: "", longitude: "" });
  }

  componentDidUpdate (_prevProps, _prevState, _snapshot) {
    const { selectedTabId, sidebarCollapsed } = this.props;

    if (selectedTabId === "measurement-creation-tab" && !sidebarCollapsed)
      this.onMeasurementCreationTabSelected();
    else
      this.onMeasurementCreationTabUnselected();
  }

  render () {
    const { sidebarCollapsed, selectedTabId, showSidebar } = this.props;

    return (
      <SidebarLib
        id="sidebar" position="right"
        collapsed={sidebarCollapsed} selected={selectedTabId}
        onOpen={showSidebar} onClose={this.onSidebarClose}
        closeIcon={<FaChevronRight />}
      >
        { this.renderUserMeasurementsHistoryTab() }
        { this.renderMeasurementsClusterDetailsTab() }
        { this.renderMeasurementCreationTab() }
        { this.renderMapSettingsTab() }
      </SidebarLib>
    )
  }
}

const mapStateToProps = ({
  sidebar: { collapsed: sidebarCollapsed, selectedTabId },
  currentUser: { signedIn: userSignedIn },
  mainMap: { ref: mainMapRef }
}) => ({
  sidebarCollapsed,
  selectedTabId,
  userSignedIn,
  mainMapRef
});

const mapDispatchToProps = dispatch => ({
  showSidebar: (selectedTabId) => dispatch(showSidebar({ selectedTabId })),
  hideSidebar: () => dispatch(hideSidebar()),
  clearSidebarData: () => dispatch(clearSidebarData()),
  enableMeasurementCreation: () => dispatch(enableMeasurementCreation()),
  disableMeasurementCreation: () => dispatch(disableMeasurementCreation()),
  setMeasurementCreationData: ({ value, latitude, longitude }) => dispatch(setMeasurementCreationData({ value, latitude, longitude }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
