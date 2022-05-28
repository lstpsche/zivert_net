import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { setWeatherLayer } from "../../../../store/actions/main_map";
import BaseSelection from "./base_selection";

class WeatherLayersSelection extends BaseSelection {
  constructor(props) {
    super(props);

    this.state = this.props.weatherOverlays;

    this.onRadioChange = this.onRadioChange.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.renderSectionBody = this.renderSectionBody.bind(this);
  }

  onRadioChange ({ target: { name } }) {
    const { setWeatherLayer } = this.props;

    setWeatherLayer(name);
    super.onRadioChange(name);
  }

  renderSectionLabel () {
    return super.renderSectionLabel(I18n.t("sidebar.tabs.map_settings.weather_overlays.header"));
  }

  renderWeatherMapRadio (weatherType) {
    return (
      <Form.Check
        type="radio"
        className="map-setting-radio"
        label={ I18n.t("sidebar.tabs.map_settings.weather_overlays.labels." + weatherType) }
        id={weatherType + "-radio"}
        name={weatherType}
        onChange={this.onRadioChange}
        checked={this.isChecked(weatherType)}
      />
    )
  }

  renderSectionBody () {
    return (
      <>
        { this.renderWeatherMapRadio("none") }
        { this.renderWeatherMapRadio("temperature") }
        { this.renderWeatherMapRadio("wind") }
        { this.renderWeatherMapRadio("precipitation") }
        { this.renderWeatherMapRadio("clouds") }
      </>
    )
  }
}

const mapStateToProps = ({ mainMap: { layers: { weatherOverlays } } }) => ({
  weatherOverlays
});

const mapDispatchToProps = dispatch => ({
  setWeatherLayer: (layerName) => dispatch(setWeatherLayer({ layerName }))
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherLayersSelection);
