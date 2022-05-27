import { connect } from "react-redux";
import { withLeaflet } from "react-leaflet";
import ReactLeafletD3Hexbin from "../../../../../lib/react-leaflet-d3-hexbin";
import { countRoundedClusterValue } from "../../../../../helpers/count_cluster_value";
const WrappedHexbinLayer = withLeaflet(ReactLeafletD3Hexbin);

class HexagonsLayer extends React.Component {
  constructor(props) {
    super(props);

    this.hexagonPopupContent = this.hexagonPopupContent.bind(this);

    this.options = {
      colorScaleRange: ['#f5e180', '#ffd402', '#f58d23', '#ef1717'],
      latFunc: (measurement) => measurement.latitude,
      lngFunc: (measurement) => measurement.longitude,
      colorValueFunc: (measurement) => this.hexagonColor(measurement),
      tooltip: { tooltipContent: this.hexagonPopupContent }
    };
  }

  hexagonColor (measurements) {
    const measurementValues = measurements.map(({ o: measurement }) => measurement.value_urh);

    return countRoundedClusterValue(measurementValues);
  }

  hexagonPopupContent (data) {
    const { valueUnits } = this.props;

    const text = countRoundedClusterValue(data.map(({ o }) => o["value_" + valueUnits]), 4)

    return 'Overall value: ' + text;
  }

  measurementsLatLng () {
    const { measurements } = this.props;

    return measurements.map (measurement => (
      [
        measurement.longitude,
        measurement.latitude
      ]
    ));
  }

  render () {
    return (
      <WrappedHexbinLayer data={this.props.measurements} {...this.options} />
    )
  }
}

const mapStateToProps = ({
  measurementsInPeriod: measurements,
  mainMap: {
    settings: { units }
  }
}) => ({
  measurements,
  valueUnits: units
});

export default connect(mapStateToProps)(HexagonsLayer);
