import { connect } from "react-redux";
import { setStaticMeasurements } from "../../store/actions/static_measurements";
import { setFullPageBlock } from "../../store/actions/blocking";
import fetchLink from "../../helpers/fetch_link";

class StaticMeasurementsDataLoader extends React.Component {
  fetchStaticMeasurements () {
    const { setStaticMeasurements, setFullPageBlock } = this.props;

    fetchLink({
      link: "/api/v1/static_measurements",
      onSuccess: (response) => {
        setStaticMeasurements(
          response.staticMeasurements.map(({
                                       data: { attributes: {
                                         id, longitude, latitude, value_urh, value_ush, is_static: isStatic,
                                         station_name: stationName,  user_id: userId, created_at: createdAt
                                       } }
          }) => (
            { id, longitude, latitude, value_urh, value_ush, isStatic, stationName, userId, createdAt }
          ))
        );
      },
      onFailure: (error) => {
        // TODO: add parsing of internal server errors
        throw new Error(error);
      },
      onComplete: () => setFullPageBlock(false)
    })
  }

  componentDidMount () {
    this.props.setFullPageBlock(true);
    this.fetchStaticMeasurements();
  }

  render () {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  setStaticMeasurements: (staticMeasurements) => dispatch(setStaticMeasurements(staticMeasurements)),
  setFullPageBlock: (state) => dispatch(setFullPageBlock({ state }))
});

export default connect(undefined, mapDispatchToProps)(StaticMeasurementsDataLoader);
