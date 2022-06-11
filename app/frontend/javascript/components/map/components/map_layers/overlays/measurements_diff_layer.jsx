import { connect } from "react-redux";
import MeasurementsLayerBase from "./measurements_layer_base";

class MeasurementsDiffLayer extends MeasurementsLayerBase {
  constructor(props) {
    super(props);

    this.measurementsMarkers = this.measurementsMarkers.bind(this);
    this.clusterIcon = this.clusterIcon.bind(this);
  }
}

const mapStateToProps = ({
  measurementsDiff: measurements,
  mainMap: {
   settings: { units: valueUnits },
   settingsOptions: { units: unitsOptions }
  }
}) => ({
  measurements,
  valueUnits,
  unitsOptions
});

export default connect(mapStateToProps)(MeasurementsDiffLayer);
