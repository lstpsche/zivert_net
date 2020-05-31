import { connect } from "react-redux";
import { setGeoPoints } from "../../../../../store/actions/geo_points";
import { setMainMapBlock } from "../../../../../store/actions/main_map";
import fetchLink from "../../../../../helpers/fetch_link";
import { FeatureGroup } from "react-leaflet";
import GeoPointMarker from "../../geo_point_marker";
import GeoPointsConsumer from "../../../../channels/geo_points_consumer";

class GeoPointsLayer extends React.Component {
  async toggleMapBlock (state, blockMessage) {
    this.props.setMainMapBlock({ state, blockMessage });
  }

  componentDidMount () {
    this.toggleMapBlock(true, I18n.t("common.screen_block.loading_geo_points"));

    fetchLink({
      link: "/api/v1/geo_points",
      onSuccess: (response) => {
        this.props.setGeoPoints(
          response.geoPoints.map(({ data: { attributes: { id, user_id: userId, longitude, latitude, rad_value: radValue, comment } } }) => (
            { id, userId, longitude, latitude, radValue, comment }
          ))
        );
      },
      onFailure: (error) => {
        // TODO: add parsing of internal server errors
        throw new Error(error);
      },
      onComplete: () => this.toggleMapBlock(false)
    });
  }

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
        <GeoPointsConsumer />
        { this.renderGeoPoints() }
      </FeatureGroup>
    )
  }
}

const mapStateToProps = ({ geoPoints, currentUser: { id: currentUserId } }) => ({ geoPoints, currentUserId });

const mapDispatchToProps = dispatch => ({
  setGeoPoints: (geoPoints) => dispatch(setGeoPoints(geoPoints)),
  setMainMapBlock: (block) => dispatch(setMainMapBlock(block))
});

export default connect(mapStateToProps, mapDispatchToProps)(GeoPointsLayer);
