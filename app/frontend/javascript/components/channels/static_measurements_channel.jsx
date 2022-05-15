import { connect } from "react-redux";
import { addStaticMeasurement, updateStaticMeasurement, removeStaticMeasurement } from "../../store/actions/static_measurements";
import BaseChannel from "./base_channel";

class StaticMeasurementsChannel extends BaseChannel {
  constructor (props) {
    super(props);

    const { addStaticMeasurement, updateStaticMeasurement, removeStaticMeasurement } = this.props;

    this.channel = {
      name: "StaticMeasurementsChannel",
      onReceiveActions: {
        create: [addStaticMeasurement],
        update: [updateStaticMeasurement],
        delete: [removeStaticMeasurement]
      }
    }
  }
}

const mapDispatchToProps = dispatch => ({
  addStaticMeasurement: ({ static_measurement }) => dispatch(addStaticMeasurement(static_measurement.data)),
  updateStaticMeasurement: ({ static_measurement }) => dispatch(updateStaticMeasurement(static_measurement.data)),
  removeStaticMeasurement: ({ static_measurement }) => dispatch(removeStaticMeasurement(static_measurement.data)),
});

export default connect(undefined, mapDispatchToProps)(StaticMeasurementsChannel);
