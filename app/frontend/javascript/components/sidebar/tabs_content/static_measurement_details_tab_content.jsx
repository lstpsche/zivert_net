import { connect } from "react-redux";
import StaticMeasurementRadInfo from "./static_measurement_details/static_measurement_rad_info";
import StaticMeasurementCoorsInfo from "./static_measurement_details/static_measurement_coors_info";
import StaticMeasurementWeatherDataInfo from "./static_measurement_details/static_measurement_weather_data_info";

class StaticMeasurementDetailsTabContent extends React.Component {
  selectedStaticMeasurement () {
    const { staticMeasurements } = this.props;

    return staticMeasurements.find(staticMeasurements => staticMeasurements.selected);
  }

  findWeatherData (selectedStaticMeasurement) {
    if (selectedStaticMeasurement === undefined)
      return null;

    const { weatherData } = this.props;
    const { id } = selectedStaticMeasurement;

    let measurementWeather = weatherData.sort(({ createdAtA }, { createdAtB }) => (createdAtB - createdAtA))
      .filter(({ staticMeasurementId }) => staticMeasurementId === id);

    if (measurementWeather.length === 0)
      return null;

    return measurementWeather[0];
  }

  renderPlaceholder () {
    return (
      <p>{ I18n.t("sidebar.tabs.static_measurement_details.placeholder") }</p>
    )
  }

  renderInformation (selectedStaticMeasurement, measurementWeatherData) {
    return (
      <>
        <StaticMeasurementRadInfo staticMeasurement={selectedStaticMeasurement} />
        <StaticMeasurementCoorsInfo staticMeasurement={selectedStaticMeasurement} />
        <StaticMeasurementWeatherDataInfo weatherData={measurementWeatherData} />
      </>
    )
  }

  render () {
    const selectedStaticMeasurement = this.selectedStaticMeasurement();
    const measurementWeatherData = this.findWeatherData(selectedStaticMeasurement);

    return (
      <div id="static-measurement-details-tab-content">
        {
          selectedStaticMeasurement
          ? this.renderInformation(selectedStaticMeasurement, measurementWeatherData)
          : this.renderPlaceholder()
        }
      </div>
    )
  }
}

const mapStateToProps = ({ staticMeasurements, weatherData }) => ({ staticMeasurements, weatherData });

export default connect(mapStateToProps)(StaticMeasurementDetailsTabContent);
