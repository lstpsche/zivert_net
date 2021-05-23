import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import BaseSelection from "./base_selection";
import { setMapSettings } from "../../../../store/actions/main_map";

class MapSettingsSelection extends BaseSelection {
  constructor(props) {
    super(props);

    // needed here, because for some reason redux have stopped re-rendering on store change
    // i don't have time now to look into it, so i've made this crutch
    this.state = {
      units: this.props.mapSettings.units
    }

    this.onMapSettingsChange = this.onMapSettingsChange.bind(this);
    this.renderSectionBody = this.renderSectionBody.bind(this);
  }

  onMapSettingsChange ({ target: { name, value } }) {
    const { setMapSettings } = this.props;
    let { mapSettings } = this.props;

    mapSettings[name] = value;

    this.setState({ [name]: value });
    setMapSettings(mapSettings);
  }

  renderSectionLabel () {
    return (
      <h5 className="map-settings-section-header">{ I18n.t("sidebar.tabs.map_settings.map_settings.header") }</h5>
    )
  }

  renderUnitsOptions () {
    const { settingsOptions: { units: unitsOptions } } = this.props;

    return unitsOptions.map(unitOption => {
      return <option key={unitOption + "-option-key"} value={unitOption}>{ I18n.t('sidebar.tabs.map_settings.map_settings.options.' + unitOption) }</option>
    })
  }

  renderUnitsSelection() {
    const { units } = this.state;

    return (
      <Form.Group id="map-settings-section-units">
        <Form.Label id="map-settings-units-label">{ I18n.t("sidebar.tabs.map_settings.map_settings.labels.units") }</Form.Label>
        <Form.Control
          as="select"
          id="map-settings-units-select"
          name="units"
          value={units}
          onChange={this.onMapSettingsChange}
        >
          { this.renderUnitsOptions() }
        </Form.Control>
      </Form.Group>
    )
  }

  renderSectionBody () {
    return (
      <div>
        { this.renderUnitsSelection() }
      </div>
    )
  }
}

const mapStateToProps = ({
  mainMap: { settings: mapSettings, settingsOptions }
}) => ({
  mapSettings,
  settingsOptions
});

const mapDispatchToProps = dispatch => ({
  setMapSettings: (settings) => dispatch(setMapSettings(settings))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapSettingsSelection);
