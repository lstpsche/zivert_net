import MarkerClusterGroup from "react-leaflet-markercluster";
import { countRoundedClusterValue } from "../../../../../helpers/count_cluster_value";
import generateMarkerClassName from "../../../../../helpers/generate_marker_class_name";
import MeasurementMarker from "../../measurement_marker";

class MeasurementsLayerBase extends React.Component {
  measurementsMarkers () {
    const { measurements, valueUnits } = this.props;

    return measurements.map(({ id, latitude, longitude, value_urh, value_ush, isStatic }) => {
      return (
        <MeasurementMarker
          key={"measurement-marker-" + id}
          id={id}
          latitude={latitude}
          longitude={longitude}
          value_urh={value_urh}
          value_ush={value_ush}
          valueUnits={valueUnits}
          isStatic={isStatic}
        />
      )
    })
  }

  clusterIcon (cluster) {
    const { valueUnits, unitsOptions } = this.props;
    let clusterValuesInUnits = {};

    unitsOptions.forEach(unitOption => {
      const childrenValues = cluster.getAllChildMarkers().map(marker => marker.options["measurementValue_" + unitOption]);

      return clusterValuesInUnits[unitOption] = countRoundedClusterValue(childrenValues, 2);
    });

    const className = generateMarkerClassName(clusterValuesInUnits.urh);
    const currentClusterValue = clusterValuesInUnits[valueUnits];

    return new L.DivIcon({ html: "<div><div>" + currentClusterValue + "</div></div>", className: "marker-icon " + className });
  }

  render () {
    return (
      <MarkerClusterGroup
        ref={el => this.markerClusterGroup = el?.leafletElement}
        maxClusterRadius={50}
        showCoverageOnHover={true}
        polygonOptions={{ color: 'orange' }}
        zoomToBoundsOnClick={false}
        spiderfyOnMaxZoom={true}
        removeOutsideVisibleBounds={true}
        animate={true}
        animateAddingMarkers={true}
        iconCreateFunction={this.clusterIcon}
      >
        { this.measurementsMarkers() }
      </MarkerClusterGroup>
    )
  }
}

export default MeasurementsLayerBase;
