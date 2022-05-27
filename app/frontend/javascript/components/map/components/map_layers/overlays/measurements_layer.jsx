// Measurements layer consists of both non-static and static measurements --  they both are inside of measurementsInPeriod

import { connect } from "react-redux";
import { showSidebar, setSidebarCluster, setSidebarClusterMeasurements } from "../../../../../store/actions/sidebar";
import generateMarkerClassName from "../../../../../helpers/generate_marker_class_name";
import MarkerClusterGroup from "react-leaflet-markercluster";
import MeasurementMarker from "../../measurement_marker";
import { countRoundedClusterValue } from "../../../../../helpers/count_cluster_value";

class MeasurementsLayer extends React.Component {
  constructor(props) {
    super(props);

    this.clusterIcon = this.clusterIcon.bind(this);
  }

  measurementsMarkers () {
    const { measurements, valueUnits } = this.props;

    return measurements.map(({ id, latitude, longitude, value_urh, value_ush, isStatic }) => {
      return (
        <MeasurementMarker
          key={"measurement-marker-" + id}
          id={id}
          latitude={latitude}
          longitude={longitude}
          value_urh={value_urh}
          value_ush={value_ush}
          valueUnits={valueUnits}
          isStatic={isStatic}
        />
      )
    })
  }

  clusterIcon (cluster) {
    const { valueUnits, unitsOptions } = this.props;
    let clusterValuesInUnits = {};

    unitsOptions.forEach(unitOption => {
      const childrenValues = cluster.getAllChildMarkers().map(marker => marker.options["measurementValue_" + unitOption]);

      return clusterValuesInUnits[unitOption] = countRoundedClusterValue(childrenValues, 2);
    });

    const className = generateMarkerClassName(clusterValuesInUnits.urh);
    const currentClusterValue = clusterValuesInUnits[valueUnits];

    return new L.DivIcon({ html: "<div><div>" + currentClusterValue + "</div></div>", className: "marker-icon " + className });
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
        maxClusterRadius={50}
        showCoverageOnHover={true}
        polygonOptions={{ color: 'orange' }}
        zoomToBoundsOnClick={false}
        spiderfyOnMaxZoom={true}
        removeOutsideVisibleBounds={true}
        animate={true}
        animateAddingMarkers={true}
        iconCreateFunction={this.clusterIcon}
      >
        { this.measurementsMarkers() }
      </MarkerClusterGroup>
    )
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
