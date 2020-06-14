class GeoPointInfo extends React.Component {
  render () {
    const { geoPoint: { id, latitude, longitude, radValue } } = this.props;

    return (
      <div className="geo-point-info">
        <p>Geo point info</p>
        <p>latitude: { latitude }</p>
        <p>longitude: { longitude }</p>
        <p>Overall Value: { radValue }</p>
      </div>
    )
  }
}

GeoPointInfo.propTypes = {
  geoPoint: PropTypes.object.isRequired
}

export default GeoPointInfo;
