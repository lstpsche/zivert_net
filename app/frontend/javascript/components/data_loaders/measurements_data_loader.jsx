import { connect } from "react-redux";
import { setMeasurements } from "../../store/actions/measurements";
import { setFullPageBlock } from "../../store/actions/blocking";
import fetchLink from "../../helpers/fetch_link";

class MeasurementsDataLoader extends React.Component {
  fetchMeasurements () {
    const { setMeasurements, setFullPageBlock } = this.props;

    fetchLink({
      link: "/api/v1/measurements",
      onSuccess: (response) => {
        setMeasurements(
          response.measurements.map(({ data: { attributes: { id, longitude, latitude, value, comment, user_id: userId } } }) => (
            { id, longitude, latitude, value, comment, userId }
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
    this.fetchMeasurements();
  }

  render () {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  setMeasurements: (measurements) => dispatch(setMeasurements(measurements)),
  setFullPageBlock: (state) => dispatch(setFullPageBlock({ state }))
});

export default connect(undefined, mapDispatchToProps)(MeasurementsDataLoader);
