import { connect } from "react-redux";
import { withLeaflet } from "react-leaflet";
import { HexbinLayer } from 'react-leaflet-d3';
const WrappedHexbinLayer = withLeaflet(HexbinLayer);

class HexagonsLayer extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      colorScaleExtent: [1, 4],
      radiusScaleExtent: [1, undefined],
      colorRange: ['#f5e180', '#ef1717'],
      radiusRange: [5, 12]
    };

    this.pointerEvents = this.pointerEvents.bind(this);
    this.onHexagonClick = this.onHexagonClick.bind(this);
  }

  pointerEvents () {

  }

  onHexagonClick () {

  }

  geoJsonFeatureCollection () {
    return {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "EPSG:4326"
        }
      },
      features: this.measurementsData()
    };
  }

  measurementsData () {
    const { measurements } = this.props;

    return measurements.map (measurement => (
      {
        type: "Feature",
        id: measurement.id,
        geometry: {
          type: "Point",
          coordinates: [parseFloat(measurement.longitude), parseFloat(measurement.latitude)]
        },
        properties: {
          OBJECTID: measurement.id
        }
      }
    ));
  }

  render () {
    if (this.props.measurements.length === 0)
      return null;

    return (
      <WrappedHexbinLayer data={this.geoJsonFeatureCollection()} {...this.options} />
    )
  }
}

const mapStateToProps = ({
  measurements
}) => ({
  measurements
});

export default connect(mapStateToProps)(HexagonsLayer);
