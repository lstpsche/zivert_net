import StaticMeasurementInfoBase from "./static_measurement_info_base";
import {
  BsArrowDown, BsArrowDownLeft, BsArrowDownRight, BsArrowLeft, BsArrowRight, BsArrowUp,
  BsArrowUpLeft, BsArrowUpRight
} from "react-icons/bs";
import {
  WiCloudy, WiDayCloudy, WiDaySnowThunderstorm, WiDaySprinkle, WiDaySunny, WiDaySunnyOvercast, WiHail, WiHumidity,
  WiShowers, WiSleet, WiThunderstorm
} from "react-icons/wi";
import { FaCloudRain, FaTemperatureLow, FaWind } from "react-icons/fa";
import { GiSmashArrows, GiSnowing, GiWindsock } from "react-icons/gi";

class StaticMeasurementWeatherDataInfo extends StaticMeasurementInfoBase {
  windDirectionArrow (windDir) {
    const directionArrows = {
      'w': <BsArrowLeft />,
      'nw': <BsArrowUpLeft />,
      'n': <BsArrowUp />,
      'ne': <BsArrowUpRight />,
      'e': <BsArrowRight />,
      'se': <BsArrowDownRight />,
      's': <BsArrowDown />,
      'sw': <BsArrowDownLeft />
    }

    return directionArrows[windDir]
  }

  formatCondition (condition) {
    const conditionMapping = {
      'clear': 'Clear',
      'partly-cloudy': 'Partly cloudy',
      'cloudy': 'Cloudy',
      'overcast': 'Overcast',
      'drizzle': 'Drizzle',
      'light-rain': 'Light rain',
      'rain': 'Rain',
      'moderate-rain': 'Moderate rain',
      'heavy-rain': 'Heavy rain',
      'continuous-heavy-rain': 'Continuous heavy rain',
      'showers': 'Showers',
      'wet-snow': 'Sleet',
      'light-snow': 'Light snow',
      'snow': 'Snow',
      'snow-showers': 'Snowfall',
      'hail': 'Hail',
      'thunderstorm': 'Thunderstorm',
      'thunderstorm-with-rain': 'Rain, thunderstorm',
      'thunderstorm-with-hail': 'Thunderstorm, hail'
    }

    return conditionMapping[condition];
  }

  conditionIcon (condition) {
    const conditionIconMapping = {
      'clear': <WiDaySunny/>,
      'partly-cloudy': <WiDayCloudy/>,
      'cloudy': <WiCloudy/>,
      'overcast': <WiDaySunnyOvercast/>,
      'drizzle': <WiDaySprinkle/>,
      'light-rain': <FaCloudRain/>,
      'rain': <FaCloudRain/>,
      'moderate-rain': <FaCloudRain/>,
      'heavy-rain': <FaCloudRain/>,
      'continuous-heavy-rain': <FaCloudRain/>,
      'showers': <WiShowers/>,
      'wet-snow': <WiSleet/>,
      'light-snow': <GiSnowing/>,
      'snow': <GiSnowing/>,
      'snow-showers': <GiSnowing/>,
      'hail': <WiHail/>,
      'thunderstorm': <WiThunderstorm/>,
      'thunderstorm-with-rain': <WiThunderstorm/>,
      'thunderstorm-with-hail': <WiDaySnowThunderstorm/>
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
            <FaTemperatureLow/> { I18n.t("sidebar.tabs.static_measurement_details.labels.temperature") }: { weatherData.temperature }
          </div>
          <div className="humidity">
            <WiHumidity/> { I18n.t("sidebar.tabs.static_measurement_details.labels.humidity") }: { weatherData.humidity }
          </div>
          <div className="wind-speed">
            <FaWind/> { I18n.t("sidebar.tabs.static_measurement_details.labels.wind_speed") }: { weatherData.windSpeed }
          </div>
          <div className="wind-direction">
            <GiWindsock/> { I18n.t("sidebar.tabs.static_measurement_details.labels.wind_direction") }: { weatherData.windDirection } { this.windDirectionArrow(weatherData.windDirection) }
          </div>
          <div className="condition">
            { this.conditionIcon(weatherData.condition) } { I18n.t("sidebar.tabs.static_measurement_details.labels.condition") }: { this.formatCondition(weatherData.condition) }
          </div>
          <div className="pressure">
            <GiSmashArrows/> { I18n.t("sidebar.tabs.static_measurement_details.labels.pressure") }: { weatherData.pressureMm } <small>{ I18n.t("sidebar.tabs.static_measurement_details.labels.mmhg") }</small>, { weatherData.pressurePa } <small>{ I18n.t("sidebar.tabs.static_measurement_details.labels.pa") }</small>
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
