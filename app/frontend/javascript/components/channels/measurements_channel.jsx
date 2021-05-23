import { connect } from "react-redux";
import { addMeasurement, updateMeasurement, removeMeasurement } from "../../store/actions/measurements";
import BaseChannel from "./base_channel";

class MeasurementsChannel extends BaseChannel {
  constructor (props) {
    super(props);

    const { addMeasurement, updateMeasurement, removeMeasurement } = this.props;

    this.channel = {
      name: "MeasurementsChannel",
      onReceiveActions: {
        create: [addMeasurement],
        update: [updateMeasurement],
        delete: [removeMeasurement]
      }
    }
  }
}

const mapDispatchToProps = dispatch => ({
  addMeasurement: ({ measurement }) => dispatch(addMeasurement(measurement.data)),
  updateMeasurement: ({ measurement }) => dispatch(updateMeasurement(measurement.data)),
  removeMeasurement: ({ measurement }) => dispatch(removeMeasurement(measurement.data)),
});

export default connect(undefined, mapDispatchToProps)(MeasurementsChannel);
