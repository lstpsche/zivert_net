import { connect } from "react-redux";
import { setMeasurements } from "../../store/actions/measurements";
import { setFullPageBlock } from "../../store/actions/blocking";
import fetchLink from "../../helpers/fetch_link";

class MeasurementsDataLoader extends React.Component {
  fetchMeasurements () {
    fetchLink({
      link: "/api/v1/measurements",
      onSuccess: (response) => {
        this.props.setMeasurements(
          response.measurements.map(({ data: { attributes: { id, user_id: userId, geo_point_id: geoPointId, value } } }) => (
            { id, userId, geoPointId, value }
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
    this.fetchMeasurements();
  }

  render () {
    return null
  }
}

const mapDispatchToProps = dispatch => ({
  setMeasurements: (measurements) => dispatch(setMeasurements(measurements)),
  setFullPageBlock: (state) => dispatch(setFullPageBlock({ state }))
});

export default connect(undefined, mapDispatchToProps)(MeasurementsDataLoader);
