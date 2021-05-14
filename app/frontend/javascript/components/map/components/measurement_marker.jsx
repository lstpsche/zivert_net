import Marker from "react-leaflet-enhanced-marker";
import MarkerIcon from "./marker/marker_icon";
import generateMarkerClassName from "../../../helpers/generate_marker_class_name";

class MeasurementMarker extends React.Component {
  constructor (props) {
    super(props);

    this.markerValue = this.markerValue.bind(this);
  }

  markerValue () {
    const { value } = this.props;

    if (value === undefined || _.isString(value))
      return value;
    return (Math.round((value + Number.EPSILON) * 10) / 10);
  }

  render () {
    const { id, latitude, longitude, draggable, onMarkerDrag } = this.props;
    const value = this.markerValue();

    return (
      <Marker
        ref={el => this.marker = el}
        measurementId={id}
        draggable={draggable}
        icon={<MarkerIcon text={value?.toString()} className={generateMarkerClassName(value)} />}
        position={[latitude, longitude]}
        riseOnHover={true}
        onDrag={() => onMarkerDrag(this.marker.markerRef.leafletElement)}
      />
    )
  }
}

MeasurementMarker.propTypes = {
  id: PropTypes.number,
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  draggable: PropTypes.bool,
  onMarkerDrag: PropTypes.func
}

MeasurementMarker.defaultProps = {
  draggable: false
}

export default MeasurementMarker;
