import { FeatureGroup } from "react-leaflet";
import GeoPointMarker from "../../geo_point_marker";

class GeoPointsLayer extends React.Component {
  renderGeoPoints () {
    const { geoPoints, currentUserId } = this.props;

    return geoPoints.map(({ id, userId, latitude, longitude, radValue, comment }) => {
      return (
        <GeoPointMarker
          key={"geo-point-marker-" + id}
          removable={userId === currentUserId}
          id={id}
          latitude={latitude}
          longitude={longitude}
          radValue={radValue}
          comment={comment}
        />
      )
    })
  }

  render () {
    return (
      <FeatureGroup>
        { this.renderGeoPoints() }
      </FeatureGroup>
    )
  }
}

GeoPointsLayer.propTypes = {
  geoPoints: PropTypes.array.isRequired,
  currentUserId: PropTypes.number
}

export default GeoPointsLayer;
