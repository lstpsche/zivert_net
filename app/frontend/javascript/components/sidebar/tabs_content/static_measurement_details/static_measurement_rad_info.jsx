import generateMarkerClassName from "../../../../helpers/generate_marker_class_name";
import StaticMeasurementInfoBase from "./static_measurement_info_base";

class StaticMeasurementRadInfo extends StaticMeasurementInfoBase {
  render () {
    const { staticMeasurement: { stationName, value_urh, value_ush, createdAt } } = this.props;

    return (
      <div className="radiation-section">
        <h5 className="station-name">
          { I18n.t("sidebar.tabs.static_measurement_details.labels.station_name") } <strong>{ stationName }</strong>
        </h5>

        <div className="radiation-measurement">
          <div className={"value " + generateMarkerClassName(value_urh)}>
            <div className="urh">
              { value_urh } <small>{ I18n.t("sidebar.tabs.static_measurement_details.labels.urh") }</small>
            </div>
            <div className="ush">
              { value_ush } <small>{ I18n.t("sidebar.tabs.static_measurement_details.labels.ush") }</small>
            </div>
          </div>

          <div className="measurement-time">
            <div className="fetched-at">{ I18n.t("sidebar.tabs.static_measurement_details.labels.fetched_at") }</div>
            <div className="fetched-date">{ this.formatDate(createdAt) }</div>
            <div className="provided-by">{ I18n.t("sidebar.tabs.static_measurement_details.labels.rad_provided_by") }</div>
          </div>
        </div>
      </div>
    )
  }
}

StaticMeasurementRadInfo.propTypes = {
  staticMeasurement: PropTypes.object.isRequired
}

export default StaticMeasurementRadInfo;
