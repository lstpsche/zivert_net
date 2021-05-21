import truncate from "../../../../helpers/truncate";
import { countClusterValue } from "../../../../helpers/count_cluster_value";
import roundValue from "../../../../helpers/round_value";

class MeasurementsClusterInfo extends React.Component {
  constructor(props) {
    super(props);

    this.overallValue = this.overallValue.bind(this);
  }

  clusterValue () {
    const { measurements, valueUnits } = this.props;
    const measurementsValues = measurements.map(measurement => measurement["value_" + valueUnits]);

    return countClusterValue(measurementsValues)
  }

  overallValue () {
    const value = this.clusterValue();
    const precision = 4 - value.toString().split(".")[0].length;

    return roundValue(value, precision < 0 ? 0 : precision);
  }

  renderInfoOverall () {
    return (
      <div className="overall">
        <div className="overall-value">{ this.overallValue() }</div>
        <div className="overall-label label-text">{ I18n.t("sidebar.tabs.measurements_cluster_details.labels.overall") }</div>
      </div>
    )
  }

  renderDetailsRadValue () {
    return (
      <div className="rad-value">
        <span className="detail-label">{ I18n.t("sidebar.tabs.measurements_cluster_details.labels.rad_value") }</span>
        <span>{ truncate(this.clusterValue(), 4) }</span>
      </div>
    )
  }

  renderDetailsLatitude () {
    const { measurementsCluster } = this.props;
    const lat = measurementsCluster?.getLatLng()?.lat;

    return (
      <div className="latitude">
        <span className="detail-label">{ I18n.t("sidebar.tabs.measurements_cluster_details.labels.latitude") }</span>
        <span>{ truncate(lat, 8) }</span>
      </div>
    )
  }

  renderDetailsLongitude () {
    const { measurementsCluster } = this.props;
    const lng = measurementsCluster?.getLatLng()?.lng;

    return (
      <div className="longitude">
        <span className="detail-label">{ I18n.t("sidebar.tabs.measurements_cluster_details.labels.longitude") }</span>
        <span>{ truncate(lng, 8) }</span>
      </div>
    )
  }

  renderMeasurementsCount () {
    const { measurements } = this.props;
    const measurementsCount = measurements.length;

    return (
      <div className="measurements-count">
        <span>{ I18n.t("sidebar.tabs.measurements_cluster_details.labels.measurements") } ({ measurementsCount })</span>
      </div>
    )
  }

  render () {
    return (
      <div id="measurements-cluster-info">
        <div className="measurements-cluster-info-row">
          { this.renderInfoOverall() }

          <div className="measurements-cluster-details">
            { this.renderDetailsRadValue() }
            { this.renderDetailsLatitude() }
            { this.renderDetailsLongitude() }
          </div>
        </div>

        { this.renderMeasurementsCount() }
      </div>
    )
  }
}

MeasurementsClusterInfo.propTypes = {
  measurementsCluster: PropTypes.object,
  measurements: PropTypes.array.isRequired,
  valueUnits: PropTypes.string.isRequired
}

export default MeasurementsClusterInfo;
