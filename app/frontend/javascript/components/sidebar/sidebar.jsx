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
import fetchLink from "../../helpers/fetch_link";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.renderUserMeasurementsHistoryTab = this.renderUserMeasurementsHistoryTab.bind(this);
    this.onSidebarClose = this.onSidebarClose.bind(this);
    this.onEscapePress = this.onEscapePress.bind(this);
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
        disabled={true} //{!userSignedIn} will be disabled until developed
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

  onMapSettingsTabUnselected () {
    // TODO: not working properly with time selector, commenting out - don't have time to fix now
    // const { mapSettings: { id, units } } = this.props;
    //
    // fetchLink({
    //   link: "/api/v1/map_settings/" + id,
    //   method: "PUT",
    //   body: JSON.stringify({
    //     map_settings: { units }
    //   }),
    //   onFailure: (error) => {
    //     // TODO: add parsing of internal server errors
    //     throw new Error(error);
    //   }
    // });
  }

  fieldStateChangedTo (state, fieldName, prevProps) {
    const currentValue = this.props[fieldName];

    return (currentValue === !prevProps[fieldName]) && (currentValue === state)
  }

  onEscapePress ({ key }) {
    if (key === "Escape") {
      this.onSidebarClose();
    }
  }

  componentDidUpdate (prevProps, _prevState, _snapshot) {
    const { selectedTabId, sidebarCollapsed } = this.props;

    if (this.fieldStateChangedTo(false, "sidebarCollapsed", prevProps)) {
      document.addEventListener('keydown', this.onEscapePress);
    }

    if (this.fieldStateChangedTo(true, "sidebarCollapsed", prevProps)) {
      document.removeEventListener('keydown', this.onEscapePress);
    }

    if (selectedTabId === "measurement-creation-tab" && !sidebarCollapsed)
      this.onMeasurementCreationTabSelected();
    else
      switch(prevProps.selectedTabId) {
        case "measurement-creation-tab":
          this.onMeasurementCreationTabUnselected();
          break;

        case "map-settings-tab":
          this.onMapSettingsTabUnselected();
          break;
      }
  }

  render () {
    const { sidebarCollapsed, selectedTabId, showSidebar } = this.props;

    return (
      <SidebarLib
        id="sidebar" position="right"
        collapsed={sidebarCollapsed} selected={selectedTabId}
        onOpen={showSidebar} onClose={this.onSidebarClose}
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
  mainMap: { ref: mainMapRef, settings: mapSettings }
}) => ({
  sidebarCollapsed,
  selectedTabId,
  userSignedIn,
  mainMapRef,
  mapSettings
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
