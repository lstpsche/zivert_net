import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { setBaseLayer, setOverlayLayer, setMapSettings } from "../../../store/actions/main_map";

class MapSettingsTabContent extends React.Component {
  constructor (props) {
    super(props);

    this.isChecked = this.isChecked.bind(this);
    this.onBaseChange = this.onBaseChange.bind(this);
    this.onOverlayChange = this.onOverlayChange.bind(this);
    this.onMapSettingsChange = this.onMapSettingsChange.bind(this);
  }

  onBaseChange ({ target: { name } }) {
    const { setBaseLayer } = this.props;

    setBaseLayer(name);
  }

  onOverlayChange ({ target: { name, checked } }) {
    const { setOverlayLayer } = this.props;

    setOverlayLayer(name, checked);
  }

  onMapSettingsChange ({ target: { name, value } }) {
    const { setMapSettings } = this.props;
    let { mapSettings } = this.props;

    mapSettings[name] = value;

    setMapSettings(mapSettings);
  }

  isChecked (name) {
    const { layers } = this.props;

    return layers[name].selected
  }

  renderBaseSelection () {
    return (
      <Form className="map-settings-section">
        <h5 className="map-settings-section-header">{ I18n.t("sidebar.tabs.map_settings.base_map.header") }</h5>
        <div className="map-settings-section-body">
          <Form.Check
            type="radio"
            className="map-setting-radio"
            label={ I18n.t("sidebar.tabs.map_settings.base_map.labels.regular_map") }
            id="regular-map-radio"
            name="regularMap"
            onChange={this.onBaseChange}
            checked={this.isChecked("regularMap")}
          />
        </div>
      </Form>
    )
  }

  renderOverlaysSelection () {
    return (
      <Form className="map-settings-section">
        <h5 className="map-settings-section-header">{ I18n.t("sidebar.tabs.map_settings.overlay_layers.header") }</h5>
        <div className="map-settings-section-body">
          <Form.Check
            type="checkbox"
            className="map-setting-checkbox"
            label={ I18n.t("sidebar.tabs.map_settings.overlay_layers.labels.dimmer") }
            id="dimmer-layer-checkbox"
            name="dimmer"
            onChange={this.onOverlayChange}
            checked={this.isChecked("dimmer")}
          />
          <Form.Check
            type="checkbox"
            className="map-setting-checkbox"
            label={ I18n.t("sidebar.tabs.map_settings.overlay_layers.labels.measurements") }
            id="measurements-layer-checkbox"
            name="measurements"
            onChange={this.onOverlayChange}
            checked={this.isChecked("measurements")}
          />
        </div>
      </Form>
    )
  }

  renderUnitsSelection () {
    const { mapSettings: { units } } = this.props;

    return (
      <Form className="map-settings-section">
        <h5 className="map-settings-section-header">{ I18n.t("sidebar.tabs.map_settings.map_settings.header") }</h5>
        <div className="map-settings-section-body">
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
        </div>
      </Form>
    )
  }

  renderUnitsOptions () {
    const { settingsOptions: { units: unitsOptions } } = this.props;

    return unitsOptions.map(unitOption => {
      return <option key={unitOption + "-option-key"} value={unitOption}>{ I18n.t('sidebar.tabs.map_settings.map_settings.options.' + unitOption) }</option>
    })
  }

  render () {
    return (
      <div id="map-settings-tab-content">
        { this.renderBaseSelection() }
        { this.renderOverlaysSelection() }
        { this.renderUnitsSelection() }
      </div>
    )
  }
}

const mapStateToProps = ({ mainMap: { layers, settings, settingsOptions } }) => ({
  layers: { ...layers.base, ...layers.overlays },
  mapSettings: settings,
  settingsOptions
});

const mapDispatchToProps = dispatch => ({
  setBaseLayer: (layerName) => dispatch(setBaseLayer({ layerName })),
  setOverlayLayer: (layerName, selected) => dispatch(setOverlayLayer({ layerName, selected })),
  setMapSettings: (settings) => dispatch(setMapSettings(settings))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapSettingsTabContent);
