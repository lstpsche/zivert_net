import { connect } from "react-redux";
import HeatmapLayer from "react-leaflet-heatmap-layer";

class CustomHeatmapLayer extends React.Component {
  constructor(props) {
    super(props);

    this.maxRadValue = 140;

    this.options = {
      max: 8.0,
      maxZoom: 20,
      radius: 30,
      blur: 10,
      gradient: { 0.25: 'yellow', 0.50: 'orange', 0.75: 'red', 1: 'darkred' },
      latitudeExtractor: point => point.latitude,
      longitudeExtractor: point => point.longitude,
      intensityExtractor: point => this.maxRadValue / parseFloat(point.value)
    }
  }

  points () {
    const { geoPoints, measurements } = this.props;

    if (geoPoints === [] || measurements === [])
      return [];

    return measurements.map(({ value, geoPointId }) => {
      const { latitude, longitude } = geoPoints.find(geoPoint => geoPoint.id === geoPointId) || {}

      return { latitude, longitude, value }
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

const mapStateToProps = ({ geoPoints, measurements }) => ({ geoPoints, measurements });

export default connect(mapStateToProps)(CustomHeatmapLayer);
