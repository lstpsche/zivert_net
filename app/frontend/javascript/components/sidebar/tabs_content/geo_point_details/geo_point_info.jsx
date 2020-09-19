class GeoPointInfo extends React.Component {
  constructor(props) {
    super(props);

    this.overallValue = this.overallValue.bind(this);
  }

  overallValue () {
    const { geoPoint: { radValue } } = this.props;

    return Math.round(radValue);
  }

  render () {
    const { geoPoint: { latitude, longitude, radValue, measurements } } = this.props;

    return (
      <div id="geo-point-info">
        <div className="geo-point-info-row">
          <div className="overall">
            <div className="overall-value">{ this.overallValue() }</div>
            <div className="overall-label label-text">{ I18n.t('sidebar.tabs.geo_point_details.labels.overall') }</div>
          </div>

          <div className="geo-point-details">
            <div className="rad-value">
              <span className="detail-label">{ I18n.t('sidebar.tabs.geo_point_details.labels.rad_value') }</span>
              <span>{ radValue }</span>
            </div>
            <div className="latitude">
              <span className="detail-label">{ I18n.t('sidebar.tabs.geo_point_details.labels.latitude') }</span>
              <span>{ latitude }</span>
            </div>
            <div className="longitude">
              <span className="detail-label">{ I18n.t('sidebar.tabs.geo_point_details.labels.longitude') }</span>
              <span>{ longitude }</span>
            </div>
          </div>
        </div>

        <div className="measurements-count">
          <span>{ I18n.t('sidebar.tabs.geo_point_details.labels.measurements') } ({ measurements.length })</span>
        </div>
      </div>
    )
  }
}

GeoPointInfo.propTypes = {
  geoPoint: PropTypes.object.isRequired
}

export default GeoPointInfo;
