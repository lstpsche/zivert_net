import { connect } from "react-redux";
import Marker from "react-leaflet-enhanced-marker";
import MarkerIcon from "./marker/marker_icon";
import generateMarkerClassName from "../../../helpers/generate_marker_class_name";
import roundValue from "../../../helpers/round_value";
import { showSidebar } from "../../../store/actions/sidebar";
import { selectStaticMeasurement } from "../../../store/actions/static_measurements";

class MeasurementMarker extends React.Component {
  constructor (props) {
    super(props);

    this.markerValue = this.markerValue.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  markerValue () {
    const { valueUnits } = this.props;
    const { ["value_" +  valueUnits]: value } = this.props;

    if (value === undefined || _.isString(value))
      return value;

    return roundValue(value, 2);
  }

  onMarkerClick () {
    const { id, isStatic, selectStaticMeasurement, showStaticMeasurementSidebar } = this.props;

    if (!isStatic)
      return

    selectStaticMeasurement(id);
    showStaticMeasurementSidebar();
  }

  render () {
    const { id, value_urh, value_ush, latitude, longitude, draggable, onMarkerDrag } = this.props;
    const text = this.markerValue();

    return (
      <Marker
        ref={el => this.marker = el}
        measurementId={id}
        measurementValue_urh={value_urh}
        measurementValue_ush={value_ush}
        draggable={draggable}
        icon={<MarkerIcon text={text?.toString()} className={generateMarkerClassName(value_urh)} />}
        position={[latitude, longitude]}
        riseOnHover={true}
        onDrag={() => onMarkerDrag(this.marker.markerRef.leafletElement)}
        onClick={() => this.onMarkerClick()}
      />
    )
  }
}

MeasurementMarker.propTypes = {
  id: PropTypes.number,
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
  value_urh: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value_ush: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  valueUnits: PropTypes.string,
  isStatic: PropTypes.bool,
  draggable: PropTypes.bool,
  onMarkerDrag: PropTypes.func
}

MeasurementMarker.defaultProps = {
  draggable: false
}

const mapDispatchToProps = dispatch => ({
  selectStaticMeasurement: (id) => dispatch(selectStaticMeasurement({ id })),
  showStaticMeasurementSidebar: () => dispatch(showSidebar({ selectedTabId: "station-measurement-details-tab" }))
});

export default connect(undefined, mapDispatchToProps)(MeasurementMarker);
