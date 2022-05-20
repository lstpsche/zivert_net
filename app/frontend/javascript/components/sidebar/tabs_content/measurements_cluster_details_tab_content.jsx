import { connect } from "react-redux";
import MeasurementsClusterInfo from "./measurements_cluster_details/measurements_cluster_info";
import MeasurementsClusterMeasurements from "./measurements_cluster_details/measurements_cluster_measurements";
import staticMeasurements from "../../../store/reducers/static_measurements";

class MeasurementsClusterDetailsTabContent extends React.Component {
  renderPlaceholder () {
    return (
      <p>{ I18n.t("sidebar.tabs.measurements_cluster_details.placeholder") }</p>
    )
  }

  renderInformation (measurementsCluster, allMeasurements) {
    const { valueUnits } = this.props;

    return (
      <div id="measurements-cluster-information">
        <MeasurementsClusterInfo measurementsCluster={measurementsCluster} measurements={allMeasurements} valueUnits={valueUnits} />
        <MeasurementsClusterMeasurements measurements={allMeasurements} />
      </div>
    )
  }

  allMeasurementsInCluster () {
    const { measurements, staticMeasurements, clusterMeasurementsIds } = this.props;

    return clusterMeasurementsIds.map(id => measurements.concat(staticMeasurements).find(measurement => measurement.id === id))
  }

  render () {
    const { measurementsCluster } = this.props;
    const allMeasurements = this.allMeasurementsInCluster();

    return (
      <div id="measurements-cluster-details-tab-content">
        {
          allMeasurements.length
            ? this.renderInformation(measurementsCluster, allMeasurements)
            : this.renderPlaceholder()
        }
      </div>
    )
  }
}

const mapStateToProps = ({
  measurements,
  staticMeasurements,
  sidebar: { data: { cluster: measurementsCluster, clusterMeasurements: clusterMeasurementsIds } },
  mainMap: { settings: { units: valueUnits } }
}) => ({
  measurements,
  staticMeasurements,
  measurementsCluster,
  clusterMeasurementsIds,
  valueUnits
});

export default connect(mapStateToProps)(MeasurementsClusterDetailsTabContent);
