import { connect } from "react-redux";
import { addMeasurement, updateMeasurement, removeMeasurement } from "../../store/actions/measurements";
import { addMeasurementToGeoPoint } from "../../store/actions/geo_points";
import BaseChannel from "./base_channel";

class MeasurementsChannel extends BaseChannel {
  constructor (props) {
    super(props);

    const { addMeasurement, addMeasurementToGeoPoint, updateMeasurement, removeMeasurement } = this.props;

    this.channel = {
      name: "MeasurementsChannel",
      onReceiveActions: {
        create: [addMeasurement, addMeasurementToGeoPoint],
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
  addMeasurementToGeoPoint: ({ measurement: { data: { attributes: { id, geo_point_id } } } }) => dispatch(addMeasurementToGeoPoint({ id: geo_point_id, measurementId: id }))
});

export default connect(undefined, mapDispatchToProps)(MeasurementsChannel);
