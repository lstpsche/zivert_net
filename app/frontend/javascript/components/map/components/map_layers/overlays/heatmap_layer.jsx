import { connect } from "react-redux";
import HeatmapLayer from "react-leaflet-heatmap-layer";

class CustomHeatmapLayer extends React.Component {
  constructor(props) {
    super(props);

    // gradient matching markers colors
    this.gradient = {
      0.0: '#f5e180', 0.2: '#ffd402', 0.5: '#f58d23', 1.0: '#ef1717'
    };

    // gradient yellow-to-red; leaving here just in case
    // this.gradient = {
    //   0.1: '#f8da8c', 0.2: '#f6c52e', 0.4: '#eca41c',
    //   0.6: '#ec8302', 0.8: '#db5427', 1.0: '#d21919'
    // };

    // gradient blue-to-red; half default, half more red; leaving here just in case
    // this.gradient = {
    //   0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
    //   0.6: '#f1e275', 0.8: '#e3b536', 1.0: '#e73a2f'
    // };

    this.options = {
      max: 100.0,
      minOpacity: 0.4,
      maxZoom: 15,
      radius: 30,
      blur: 10,
      gradient: this.gradient,
      latitudeExtractor: point => point.latitude,
      longitudeExtractor: point => point.longitude,
      intensityExtractor: point => parseFloat(point.value)
    }
  }

  points () {
    const { measurements } = this.props;

    if (measurements === [])
      return [];

    return measurements.map(measurement => {
      const { latitude, longitude, value_urh } = measurement;

      return { latitude, longitude, value: value_urh };
    })
  }

  render () {
    return (
      <HeatmapLayer
        points={this.points()}
        {...this.options}
      />
    )
  }
}

const mapStateToProps = ({
  measurementsInPeriod: measurements,
}) => ({
  measurements
});

export default connect(mapStateToProps)(CustomHeatmapLayer);
