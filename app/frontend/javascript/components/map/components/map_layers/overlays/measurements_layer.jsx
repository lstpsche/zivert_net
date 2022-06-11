// Measurements layer consists of both non-static and static measurements --  they both are inside of measurementsInPeriod

import { connect } from "react-redux";
import { showSidebar, setSidebarCluster, setSidebarClusterMeasurements } from "../../../../../store/actions/sidebar";
import MeasurementsLayerBase from "./measurements_layer_base";

class MeasurementsLayer extends MeasurementsLayerBase {
  constructor(props) {
    super(props);

    this.measurementsMarkers = this.measurementsMarkers.bind(this);
    this.clusterIcon = this.clusterIcon.bind(this);
  }

  onClusterClick (cluster) {
    const { setSidebarCluster, setSidebarClusterMeasurements, showClusterSidebar } = this.props;
    const measurementsIds = cluster.getAllChildMarkers().map((marker) => marker.options.measurementId)

    setSidebarCluster(cluster);
    setSidebarClusterMeasurements(measurementsIds);
    showClusterSidebar();
  }

  componentDidMount() {
    this.markerClusterGroup.on('clusterclick', ({ layer: cluster }) => this.onClusterClick(cluster));
  }
}

const mapStateToProps = ({
  measurementsInPeriod: measurements,
  mainMap: {
   settings: { units: valueUnits },
   settingsOptions: { units: unitsOptions }
  }
}) => ({
  measurements,
  valueUnits,
  unitsOptions
});

const mapDispatchToProps = dispatch => ({
  showClusterSidebar: () => dispatch(showSidebar({ selectedTabId: "measurements-cluster-details-tab" })),
  setSidebarCluster: (cluster) => dispatch(setSidebarCluster(cluster)),
  setSidebarClusterMeasurements: (measurementsIds) => dispatch(setSidebarClusterMeasurements(measurementsIds))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementsLayer);
