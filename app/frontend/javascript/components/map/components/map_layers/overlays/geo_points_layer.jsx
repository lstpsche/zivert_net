import { FeatureGroup } from "react-leaflet";
import GeoPointMarker from "../../geo_point_marker";

class GeoPointsLayer extends React.Component {
  renderGeoPoints () {
    const { geoPoints } = this.props;

    return geoPoints.map(({ id, latitude, longitude, radValue, comment }) => {
      return (
        <GeoPointMarker
          key={"geo-point-marker-" + id}
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
  geoPoints: PropTypes.array.isRequired
}

export default GeoPointsLayer;
