import { connect } from "react-redux";

class GeoPointDetailsTabContent extends React.Component {
  selectedGeoPoint () {
    return this.props.geoPoints.find(geoPoint => geoPoint.selected)
  }

  geoPointMeasurements () {
    const geoPointId = this.selectedGeoPoint().id;

    return this.props.measurements.filter(measurement => measurement.id === geoPointId)
  }

  renderPlaceholder () {
    return (
      <span>Pick a point</span>
    )
  }

  renderPoint (geoPoint) {
    return (
      <div>
        { geoPoint.id }
        { geoPoint.radValue }
      </div>
    )
  }

  render () {
    const geoPoint = this.selectedGeoPoint();

    return (
      <div id="geo-point-details-tab-content">
        {
          geoPoint
          ? this.renderPoint(geoPoint)
          : this.renderPlaceholder()
        }
      </div>
    )
  }
}

const mapStateToProps = ({ geoPoints, measurements }) => ({ geoPoints, measurements });

export default connect(mapStateToProps)(GeoPointDetailsTabContent);
