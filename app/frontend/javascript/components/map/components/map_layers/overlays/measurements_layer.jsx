import { connect } from "react-redux";
import MarkerClusterGroup from "react-leaflet-markercluster";
import MeasurementMarker from "../../measurement_marker";
import generateMarkerClassName from "../../../../../helpers/generate_marker_class_name";

class MeasurementsLayer extends React.Component {
  measurementsMarkers () {
    const { measurements } = this.props;

    return measurements.map(({ id, latitude, longitude, value }) => {
      return (
        <MeasurementMarker
          key={"measurement-marker-" + id}
          id={id}
          latitude={latitude}
          longitude={longitude}
          value={value}
        />
      )
    })
  }

  regionIcon (cluster) {
    let childCount = cluster.getChildCount();
    let childSum = cluster.getAllChildMarkers().map(marker => parseInt(marker.options.text)).reduce((sum, value) => sum + value);

    let clusterValue = (Math.round(((childSum / childCount) + Number.EPSILON) * 10) / 10); // mean value
    let className = generateMarkerClassName(clusterValue);

    return new L.DivIcon({ html: "<div><div>" + clusterValue + "</div></div>", className: "marker-icon " + className });
  }

  render () {
    return (
      <MarkerClusterGroup
        showCoverageOnHover={true}
        zoomToBoundsOnClick={false}
        spiderfyOnMaxZoom={true}
        removeOutsideVisibleBounds={true}
        animate={true}
        animateAddingMarkers={true}
        iconCreateFunction={this.regionIcon}
      >
        { this.measurementsMarkers() }
      </MarkerClusterGroup>
    )
  }
}

const mapStateToProps = ({ measurements }) => ({ measurements });

export default connect(mapStateToProps)(MeasurementsLayer);
