class GeoPointInfo extends React.Component {
  render () {
    const { geoPoint: { latitude, longitude, radValue, measurements } } = this.props;

    return (
      <div className="geo-point-info">
        <p>latitude: { latitude }</p>
        <p>longitude: { longitude }</p>
        <p>Overall Value: { radValue }</p>
        <p>Measurements count: { measurements.length }</p>
      </div>
    )
  }
}

GeoPointInfo.propTypes = {
  geoPoint: PropTypes.object.isRequired
}

export default GeoPointInfo;
