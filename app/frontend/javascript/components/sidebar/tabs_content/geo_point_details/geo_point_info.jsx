import truncate from "../../../../helpers/truncate";

class GeoPointInfo extends React.Component {
  constructor(props) {
    super(props);

    this.overallValue = this.overallValue.bind(this);
  }

  overallValue () {
    const { geoPoint: { radValue } } = this.props;

    return Math.round(radValue);
  }

  renderInfoOverall () {
    return (
      <div className="overall">
        <div className="overall-value">{ this.overallValue() }</div>
        <div className="overall-label label-text">{ I18n.t("sidebar.tabs.geo_point_details.labels.overall") }</div>
      </div>
    )
  }

  renderDetailsRadValue () {
    const { geoPoint: { radValue } } = this.props;

    return (
      <div className="rad-value">
        <span className="detail-label">{ I18n.t("sidebar.tabs.geo_point_details.labels.rad_value") }</span>
        <span>{ truncate(radValue, 3) }</span>
      </div>
    )
  }

  renderDetailsLatitude () {
    const { geoPoint: { latitude } } = this.props;

    return (
      <div className="latitude">
        <span className="detail-label">{ I18n.t("sidebar.tabs.geo_point_details.labels.latitude") }</span>
        <span>{ truncate(latitude, 8) }</span>
      </div>
    )
  }

  renderDetailsLongitude () {
    const { geoPoint: { longitude } } = this.props;

    return (
      <div className="longitude">
        <span className="detail-label">{ I18n.t("sidebar.tabs.geo_point_details.labels.longitude") }</span>
        <span>{ truncate(longitude, 8) }</span>
      </div>
    )
  }

  renderMeasurementsCount () {
    const { geoPoint: { measurements } } = this.props;

    return (
      <div className="measurements-count">
        <span>{ I18n.t("sidebar.tabs.geo_point_details.labels.measurements") } ({ measurements.length })</span>
      </div>
    )
  }

  render () {
    return (
      <div id="geo-point-info">
        <div className="geo-point-info-row">
          { this.renderInfoOverall() }

          <div className="geo-point-details">
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

GeoPointInfo.propTypes = {
  geoPoint: PropTypes.object.isRequired
}

export default GeoPointInfo;
