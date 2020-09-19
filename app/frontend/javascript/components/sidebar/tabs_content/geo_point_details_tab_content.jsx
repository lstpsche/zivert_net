import { connect } from "react-redux";
import GeoPointInfo from "./geo_point_details/geo_point_info";
import GeoPointMeasurements from "./geo_point_details/geo_point_measurements";

class GeoPointDetailsTabContent extends React.Component {
  selectedGeoPoint () {
    return this.props.geoPoints.find(geoPoint => geoPoint.selected)
  }

  renderPlaceholder () {
    return (
      <p>{ I18n.t("sidebar.tabs.geo_point_details.placeholder") }</p>
    )
  }

  renderInformation (geoPoint) {
    return (
      <div id="geo-point-information">
        <GeoPointInfo geoPoint={geoPoint} />
        <GeoPointMeasurements geoPoint={geoPoint} />
      </div>
    )
  }

  render () {
    const geoPoint = this.selectedGeoPoint();

    return (
      <div id="geo-point-details-tab-content">
        {
          geoPoint
          ? this.renderInformation(geoPoint)
          : this.renderPlaceholder()
        }
      </div>
    )
  }
}

const mapStateToProps = ({ geoPoints }) => ({ geoPoints });

export default connect(mapStateToProps)(GeoPointDetailsTabContent);
