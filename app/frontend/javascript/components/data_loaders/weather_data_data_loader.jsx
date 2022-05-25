import { connect } from "react-redux";
import { setWeatherData } from "../../store/actions/weather_data";
import { setFullPageBlock } from "../../store/actions/blocking";
import fetchLink from "../../helpers/fetch_link";

class WeatherDataDataLoader extends React.Component {
  fetchWeatherData () {
    const { setWeatherData, setFullPageBlock } = this.props;

    fetchLink({
      link: "/api/v1/weather_data",
      onSuccess: (response) => {
        setWeatherData(
          response.weatherData.map(({
                                data: { attributes: {
                                  id, temperature, pressure_mm: pressureMm, pressure_pa: pressurePa,
                                  wind_speed: windSpeed, humidity, condition, wind_direction: windDirection,
                                  wind_direction_deg: windDirectionDeg,
                                  static_measurement_id: staticMeasurementId, created_at: createdAt
                                } }
          }) => (
            {
              id, temperature, pressureMm, pressurePa, windSpeed,
              humidity, condition, windDirection, windDirectionDeg,
              staticMeasurementId, createdAt
            }
          ))
        )
      },
      onFailure: (error) => {
        throw new Error(error);
      },
      onComplete: () => setFullPageBlock(false)
    })
  }

  componentDidMount () {
    this.props.setFullPageBlock(true);
    this.fetchWeatherData();
  }

  render () {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  setWeatherData: (weatherData) => dispatch(setWeatherData(weatherData)),
  setFullPageBlock: (state) => dispatch(setFullPageBlock({ state }))
});

export default connect(undefined, mapDispatchToProps)(WeatherDataDataLoader);
