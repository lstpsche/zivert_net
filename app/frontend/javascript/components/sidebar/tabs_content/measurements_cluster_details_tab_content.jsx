import { connect } from "react-redux";
import MeasurementsClusterInfo from "./measurements_cluster_details/measurements_cluster_info";
import MeasurementsClusterMeasurements from "./measurements_cluster_details/measurements_cluster_measurements";

class MeasurementsClusterDetailsTabContent extends React.Component {
  renderPlaceholder () {
    return (
      <p>{ I18n.t("sidebar.tabs.measurements_cluster_details.placeholder") }</p>
    )
  }

  renderInformation (measurementsCluster, measurements) {
    const { valueUnits } = this.props;

    return (
      <div id="measurements-cluster-information">
        <MeasurementsClusterInfo measurementsCluster={measurementsCluster} measurements={measurements} valueUnits={valueUnits} />
        <MeasurementsClusterMeasurements measurements={measurements} />
      </div>
    )
  }

  measurements () {
    const { measurements, clusterMeasurementsIds } = this.props;

    return clusterMeasurementsIds.map(id => measurements.find(measurement => measurement.id === id))
  }

  render () {
    const { measurementsCluster } = this.props;
    const measurements = this.measurements();

    return (
      <div id="measurements-cluster-details-tab-content">
        {
          measurements.length
            ? this.renderInformation(measurementsCluster, measurements)
            : this.renderPlaceholder()
        }
      </div>
    )
  }
}

const mapStateToProps = ({
  measurements,
  sidebar: { data: { cluster: measurementsCluster, clusterMeasurements: clusterMeasurementsIds } },
  mainMap: { settings: { units: valueUnits } }
}) => ({
  measurements,
  measurementsCluster,
  clusterMeasurementsIds,
  valueUnits
});

export default connect(mapStateToProps)(MeasurementsClusterDetailsTabContent);
