class GeoPointInfo extends React.Component {
  render () {
    const { geoPoint: { latitude, longitude, radValue, measurements } } = this.props;

    // TODO: overall-value: add classes (one-digit | two-digit | three-digit) with needed font-size according to radValue digits count

    return (
      <div className="geo-point-info">
        <div className="geo-point-info-row">
          <div className="overall">
            <div className="overall-value">{ radValue }</div>
            <div className="overall-label label-text">Overall</div>
          </div>

          <div className="geo-point-coordinates">
            <div className="latitude">
              <span className="coordinate-label">latitude: </span>
              <span>{ latitude }</span>
            </div>
            <div className="longitude">
              <span className="coordinate-label">longitude: </span>
              <span>{ longitude }</span>
            </div>
          </div>
        </div>

        <div className="measurements-count">
          <span>Measurements ({ measurements.length })</span>
        </div>
      </div>
    )
  }
}

GeoPointInfo.propTypes = {
  geoPoint: PropTypes.object.isRequired
}

export default GeoPointInfo;
