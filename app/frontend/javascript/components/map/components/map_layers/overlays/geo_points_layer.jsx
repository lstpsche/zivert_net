import { connect } from "react-redux";
import { FeatureGroup } from "react-leaflet";
import GeoPointMarker from "../../geo_point_marker";

class GeoPointsLayer extends React.Component {
  renderGeoPoints () {
    const { geoPoints } = this.props;

    return geoPoints.map(({ id, latitude, longitude, radValue }) => {
      return (
        <GeoPointMarker
          key={"geo-point-marker-" + id}
          id={id}
          latitude={latitude}
          longitude={longitude}
          radValue={radValue}
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

const mapStateToProps = ({ geoPoints }) => ({ geoPoints });

export default connect(mapStateToProps)(GeoPointsLayer);
