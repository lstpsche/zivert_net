import StaticMeasurementInfoBase from "./static_measurement_info_base";
import {
  BsArrowDown, BsArrowDownLeft, BsArrowDownRight, BsArrowLeft, BsArrowRight, BsArrowUp,
  BsArrowUpLeft, BsArrowUpRight
} from "react-icons/bs";
import { WiDayCloudy, WiDaySprinkle, WiDaySunny, WiHumidity, WiThunderstorm, WiTornado } from "react-icons/wi";
import { FaCloudRain, FaTemperatureLow, FaWind } from "react-icons/fa";
import { GiSmashArrows, GiSnowing } from "react-icons/gi";
import { RiMistFill } from "react-icons/ri";
import roundValue from "../../../../helpers/round_value";

class StaticMeasurementWeatherDataInfo extends StaticMeasurementInfoBase {
  windDirectionArrow (windDir) {
    const directionArrows = {
      'w': <BsArrowLeft className="wind-dir" />,
      'nw': <BsArrowUpLeft className="wind-dir" />,
      'n': <BsArrowUp className="wind-dir" />,
      'ne': <BsArrowUpRight className="wind-dir" />,
      'e': <BsArrowRight className="wind-dir" />,
      'se': <BsArrowDownRight className="wind-dir" />,
      's': <BsArrowDown className="wind-dir" />,
      'sw': <BsArrowDownLeft className="wind-dir" />
    }

    return directionArrows[windDir]
  }

  conditionIcon (condition) {
    const conditionIconMapping = {
      'Clear': <WiDaySunny/>,
      'Clouds': <WiDayCloudy/>,
      'Drizzle': <WiDaySprinkle/>,
      'Rain': <FaCloudRain/>,
      'Snow': <GiSnowing/>,
      'Thunderstorm': <WiThunderstorm/>,
      'Mist': <RiMistFill/>,
      'Smoke': <RiMistFill/>,
      'Haze': <RiMistFill/>,
      'Dust': <RiMistFill/>,
      'Fog': <RiMistFill/>,
      'Sand': <RiMistFill/>,
      'Ash': <RiMistFill/>,
      'Squall': <RiMistFill/>,
      'Tornado': <WiTornado/>
    }

    return conditionIconMapping[condition];
  }

  render () {
    const { weatherData } = this.props;

    return (
      <div className="weather-section">
        <h5 className="weather-title">
          { I18n.t("sidebar.tabs.static_measurement_details.labels.weather_title") }
        </h5>

        <div className="weather-data">
          <div className="temperature">
            <FaTemperatureLow/> { I18n.t("sidebar.tabs.static_measurement_details.labels.temperature") }: { weatherData.temperature } <small>°C</small>
          </div>
          <div className="humidity">
            <WiHumidity/> { I18n.t("sidebar.tabs.static_measurement_details.labels.humidity") }: { weatherData.humidity } <small>%</small>
          </div>
          <div className="wind">
            <FaWind/> { I18n.t("sidebar.tabs.static_measurement_details.labels.wind") }: { weatherData.windDirection } { this.windDirectionArrow(weatherData.windDirection) } { weatherData.windSpeed } <small>{ I18n.t("sidebar.tabs.static_measurement_details.labels.wind_units") }</small>
          </div>
          <div className="condition">
            { this.conditionIcon(weatherData.condition) } { I18n.t("sidebar.tabs.static_measurement_details.labels.condition") }: { weatherData.condition }
          </div>
          <div className="pressure">
            <GiSmashArrows/> { I18n.t("sidebar.tabs.static_measurement_details.labels.pressure") }: { roundValue(weatherData.pressureMm) } <small>{ I18n.t("sidebar.tabs.static_measurement_details.labels.mmhg") }</small>, { weatherData.pressurePa } <small>{ I18n.t("sidebar.tabs.static_measurement_details.labels.pa") }</small>
          </div>
        </div>

        <div className="weather-time">
          <div className="fetched-date">
            { I18n.t("sidebar.tabs.static_measurement_details.labels.fetched_at") } { this.formatDate(weatherData.createdAt) }
          </div>

          <div className="provided-by">
            { I18n.t("sidebar.tabs.static_measurement_details.labels.weather_provided_by") }
          </div>
        </div>
      </div>
    )
  }
}

StaticMeasurementWeatherDataInfo.propTypes = {
  weatherData: PropTypes.object.isRequired
}

export default StaticMeasurementWeatherDataInfo;
