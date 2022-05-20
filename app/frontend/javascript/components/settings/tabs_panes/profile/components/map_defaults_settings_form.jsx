import FormBase from "../../../../common/form_base";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";

class MapDefaultsSettingsForm extends FormBase {
  constructor (props) {
    super(props);

    const { baseLayers, overlayLayers, units } = this.props;

    this.state = {
      baseLayers,
      overlayLayers,
      units
    }

    this.renderBaseLayerSection = this.renderBaseLayerSection.bind(this);
    this.renderOverlayLayersSection = this.renderOverlayLayersSection.bind(this);

    this.handleBaseLayerChange = this.handleBaseLayerChange.bind(this);
    this.handleOverlayLayerChange = this.handleOverlayLayerChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.renderBaseRegularRadio = this.renderBaseRegularRadio.bind(this);
    this.renderOverlayCheck = this.renderOverlayCheck.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit () {
    const { onSubmit, mapSettingsId } = this.props;
    const { baseLayers, overlayLayers, units } = this.state;

    onSubmit({ mapSettingsId, baseLayers, overlayLayers, units });
  }

  //
  // BASE LAYER SECTION
  //

  renderBaseLayerSection () {
    return (
      <div id="base-layer-section">
        <h4>{ I18n.t("settings.map_defaults.section_titles.base_map") }</h4>

        { this.renderBaseRegularRadio() }
      </div>
    )
  }

  renderBaseRegularRadio () {
    const { baseLayers: { regularMap: { selected } } } = this.state;

    return (
      <Form.Check
        type="radio"
        className="map-setting-radio"
        label={ I18n.t("settings.map_defaults.fields.regular_map") }
        id="regular-map-radio"
        name="regularMap"
        onChange={this.handleBaseLayerChange}
        checked={selected}
      />
    )
  }

  handleBaseLayerChange ({ target: { name } }) {
    let { baseLayers } = this.state;

    Object.keys(baseLayers).map(layerName =>
      baseLayers[layerName].selected = (layerName === name)
    )

    this.setState({ baseLayers })
  }

  //
  // OVERLAY LAYERS SECTION
  //

  renderOverlayLayersSection () {
    return (
      <div id="overlay-layers-section">
        <h4>{ I18n.t("settings.map_defaults.section_titles.overlay_layers") }</h4>

        { this.renderOverlayCheck("dimmer") }
        { this.renderOverlayCheck("measurements") }
        { this.renderOverlayCheck("heatmap") }
        { this.renderOverlayCheck("hexagons") }
      </div>
    )
  }

  renderOverlayCheck (name) {
    const { overlayLayers: { [name]: { selected } } } = this.state;

    return (
      <Form.Check
        type="checkbox"
        className="map-setting-checkbox"
        label={ I18n.t("settings.map_defaults.fields." + name) }
        id={name + "-layer-checkbox"}
        name={name}
        onChange={this.handleOverlayLayerChange}
        checked={selected}
      />
    )
  }

  handleOverlayLayerChange ({ target: { name, checked } }) {
    const { overlayLayers } = this.state;

    this.setState({ overlayLayers: { ...overlayLayers, [name]: { selected: checked } } })
  }

  //
  // UNITS SECTION
  //

  renderUnitsSection() {
    const { units } = this.state;

    return (
      <div id="units-section">
        <h4>{ I18n.t("settings.map_defaults.section_titles.units") }</h4>

        <Form.Group id="map-settings-section-units">
          <Form.Control
            as="select"
            id="map-settings-units-select"
            name="units"
            value={units}
            onChange={this.handleInputChange}
          >
            { this.renderUnitsOptions() }
          </Form.Control>
        </Form.Group>
      </div>
    )
  }

  renderUnitsOptions () {
    const { unitsOptions } = this.props;

    return unitsOptions.map(unitOption => {
      return <option key={unitOption + "-option-key"} value={unitOption}>{ I18n.t('settings.map_defaults.fields.units.' + unitOption) }</option>
    })
  }

  render () {
    return (
      <Form
        ref={el => this.form = el}
        noValidate
        id="map-defaults-settings-form"
      >
        <div className='form-inputs'>
          { this.renderBaseLayerSection() }
          { this.renderOverlayLayersSection() }
          { this.renderUnitsSection() }

          {
            this.renderFormActions({
              submitLabel: "settings.map_defaults.buttons.submit"
            })
          }
        </div>
      </Form>
    )
  }
}

MapDefaultsSettingsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = ({
  mainMap: {
    layers: {
      base,
      overlays
    },
    settings: { id: mapSettingsId, units },
    settingsOptions: { units: unitsOptions }
  }
}) => ({
  baseLayers: base,
  overlayLayers: overlays,
  units,
  unitsOptions,
  mapSettingsId
})

export default connect(mapStateToProps)(MapDefaultsSettingsForm);
