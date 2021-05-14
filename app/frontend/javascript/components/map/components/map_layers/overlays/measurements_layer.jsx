import { connect } from "react-redux";
import { showSidebar, setSidebarCluster, setSidebarClusterMeasurements } from "../../../../../store/actions/sidebar";
import generateMarkerClassName from "../../../../../helpers/generate_marker_class_name";
import MarkerClusterGroup from "react-leaflet-markercluster";
import MeasurementMarker from "../../measurement_marker";
import countClusterValue from "../../../../../helpers/count_cluster_value";

class MeasurementsLayer extends React.Component {
  measurementsMarkers () {
    const { measurements } = this.props;

    return measurements.map(({ id, latitude, longitude, value }) => {
      return (
        <MeasurementMarker
          key={"measurement-marker-" + id}
          id={id}
          latitude={latitude}
          longitude={longitude}
          value={value}
        />
      )
    })
  }

  regionIcon (cluster) {
    const childrenValues = cluster.getAllChildMarkers().map(marker => parseInt(marker.options.text));

    const clusterValue = countClusterValue(childrenValues);
    const className = generateMarkerClassName(clusterValue);

    return new L.DivIcon({ html: "<div><div>" + clusterValue + "</div></div>", className: "marker-icon " + className });
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

  render () {
    return (
      <MarkerClusterGroup
        ref={el => this.markerClusterGroup = el?.leafletElement}
        showCoverageOnHover={true}
        zoomToBoundsOnClick={false}
        spiderfyOnMaxZoom={true}
        removeOutsideVisibleBounds={true}
        animate={true}
        animateAddingMarkers={true}
        iconCreateFunction={this.regionIcon}
      >
        { this.measurementsMarkers() }
      </MarkerClusterGroup>
    )
  }
}

const mapStateToProps = ({ measurements }) => ({ measurements });

const mapDispatchToProps = dispatch => ({
  showClusterSidebar: () => dispatch(showSidebar({ selectedTabId: "measurements-cluster-details-tab" })),
  setSidebarCluster: (cluster) => dispatch(setSidebarCluster(cluster)),
  setSidebarClusterMeasurements: (measurementsIds) => dispatch(setSidebarClusterMeasurements(measurementsIds))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementsLayer);
