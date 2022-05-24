import StaticMeasurementInfoBase from "./static_measurement_info_base";
import { CgArrowsH, CgArrowsV } from "react-icons/cg";

class StaticMeasurementCoorsInfo extends StaticMeasurementInfoBase {
  render () {
    const { staticMeasurement: { latitude, longitude } } = this.props;

    return (
      <div className="coors-section">
        <h5 className="coors-title">
          { I18n.t("sidebar.tabs.static_measurement_details.labels.coordinates_title") }
        </h5>

        <div className="coordinates">
          <div className="latitude">
            <CgArrowsH/> { I18n.t("sidebar.tabs.static_measurement_details.labels.latitude") }: { latitude }
          </div>

          <div className="longitude">
            <CgArrowsV/> { I18n.t("sidebar.tabs.static_measurement_details.labels.longitude") }: { longitude }
          </div>
        </div>
      </div>
    )
  }
}

StaticMeasurementCoorsInfo.propTypes = {
  staticMeasurement: PropTypes.object.isRequired
}

export default StaticMeasurementCoorsInfo;
