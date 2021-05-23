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
    return super.renderSectionLabel(I18n.t("sidebar.tabs.map_settings.overlay_layers.header"))
  }

  renderOverlayCheck (name) {
    return (
      <Form.Check
        type="checkbox"
        className="map-setting-checkbox"
        label={ I18n.t("sidebar.tabs.map_settings.overlay_layers.labels." + name) }
        id={name + "-layer-checkbox"}
        name={name}
        onChange={this.onOverlayChange}
        checked={this.isChecked(name)}
      />
    )
  }

  renderSectionBody () {
    return (
      <>
        { this.renderOverlayCheck("dimmer") }
        { this.renderOverlayCheck("measurements") }
        { this.renderOverlayCheck("heatmap") }
        { this.renderOverlayCheck("hexagons") }
      </>
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
