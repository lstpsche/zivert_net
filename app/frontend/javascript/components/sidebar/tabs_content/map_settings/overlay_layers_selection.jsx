import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { setOverlayLayer } from "../../../../store/actions/main_map";
import BaseSelection from "./base_selection";

class OverlayLayersSelection extends BaseSelection {
  constructor (props) {
    super(props);

    this.onOverlayChange = this.onOverlayChange.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.renderSectionBody = this.renderSectionBody.bind(this);
  }

  onOverlayChange ({ target: { name, checked } }) {
    const { setOverlayLayer } = this.props;

    setOverlayLayer(name, checked);
  }

  renderSectionLabel () {
    return (
      <h5 className="map-settings-section-header">{ I18n.t("sidebar.tabs.map_settings.overlay_layers.header") }</h5>
    )
  }

  renderDimmerCheck () {
    return (
      <Form.Check
        type="checkbox"
        className="map-setting-checkbox"
        label={ I18n.t("sidebar.tabs.map_settings.overlay_layers.labels.dimmer") }
        id="dimmer-layer-checkbox"
        name="dimmer"
        onChange={this.onOverlayChange}
        checked={this.isChecked("dimmer")}
      />
    )
  }

  renderMeasurementsCheck () {
    return (
      <Form.Check
        type="checkbox"
        className="map-setting-checkbox"
        label={ I18n.t("sidebar.tabs.map_settings.overlay_layers.labels.measurements") }
        id="measurements-layer-checkbox"
        name="measurements"
        onChange={this.onOverlayChange}
        checked={this.isChecked("measurements")}
      />
    )
  }

  renderHeatmapCheck () {
    return (
      <Form.Check
        type="checkbox"
        className="map-setting-checkbox"
        label={ I18n.t("sidebar.tabs.map_settings.overlay_layers.labels.heatmap") }
        id="heatmap-layer-checkbox"
        name="heatmap"
        onChange={this.onOverlayChange}
        checked={this.isChecked("heatmap")}
      />
    )
  }

  renderSectionBody () {
    return (
      <div>
        { this.renderDimmerCheck() }
        { this.renderMeasurementsCheck() }
        { this.renderHeatmapCheck() }
      </div>
    )
  }
}

const mapStateToProps = ({ mainMap: { layers } }) => ({
  layers: layers.overlays
});

const mapDispatchToProps = dispatch => ({
  setOverlayLayer: (layerName, selected) => dispatch(setOverlayLayer({ layerName, selected }))
});

export default connect(mapStateToProps, mapDispatchToProps)(OverlayLayersSelection);
