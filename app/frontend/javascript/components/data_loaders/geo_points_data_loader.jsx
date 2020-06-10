import { connect } from "react-redux";
import { setGeoPoints } from "../../store/actions/geo_points";
import { setFullPageBlock } from "../../store/actions/blocking";
import fetchLink from "../../helpers/fetch_link";

class GeoPointsDataLoader extends React.Component {
  fetchGeoPoints () {
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
      onComplete: () => this.props.setFullPageBlock(false)
    })
  }

  componentDidMount () {
    this.props.setFullPageBlock(true);
    this.fetchGeoPoints();
  }

  render () {
    return null
  }
}

const mapDispatchToProps = dispatch => ({
  setGeoPoints: (geo_points) => dispatch(setGeoPoints(geo_points)),
  setFullPageBlock: (state) => dispatch(setFullPageBlock({ state }))
});

export default connect(undefined, mapDispatchToProps)(GeoPointsDataLoader);
