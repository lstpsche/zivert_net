import { connect } from "react-redux";
import { withLeaflet } from "react-leaflet";
import ReactLeafletD3Hexbin from "../../../../../lib/react-leaflet-d3-hexbin";
import { countRoundedClusterValue } from "../../../../../helpers/count_cluster_value";
const WrappedHexbinLayer = withLeaflet(ReactLeafletD3Hexbin);

class HexagonsLayer extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      colorScaleRange: ['#f5e180', '#ffd402', '#f58d23', '#ef1717'],
      latFunc: (measurement) => measurement.latitude,
      lngFunc: (measurement) => measurement.longitude,
      colorValueFunc: (measurement) => this.hexagonColor(measurement)
    };
  }

  hexagonColor (hexagonData) {
    const measurementsValues = hexagonData.map(({ o: measurementData }) => measurementData.value_urh);

    return countRoundedClusterValue(measurementsValues);
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
    if (this.props.measurements.length === 0)
      return null;

    return (
      <WrappedHexbinLayer data={this.props.measurements} {...this.options} />
    )
  }
}

const mapStateToProps = ({
  measurements
}) => ({
  measurements
});

export default connect(mapStateToProps)(HexagonsLayer);
