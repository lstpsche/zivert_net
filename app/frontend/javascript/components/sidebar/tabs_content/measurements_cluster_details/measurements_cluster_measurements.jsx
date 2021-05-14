import MeasurementRow from "./measurement/measurement_row";

class MeasurementsClusterMeasurements extends React.Component {
  renderMeasurementsRows () {
    const { measurements } = this.props;

    return measurements.map(measurement => this.renderMeasurementRow(measurement));
  }

  renderMeasurementRow (measurement) {
    return (
      <MeasurementRow
        key={"measurement-row-" + measurement.id}
        measurement={measurement}
      />
    )
  }

  render () {
    return (
      <div id="measurements-cluster-measurements">
        { this.renderMeasurementsRows() }
      </div>
    )
  }
}

MeasurementsClusterMeasurements.propTypes = {
  measurements: PropTypes.array.isRequired
}

export default MeasurementsClusterMeasurements;
