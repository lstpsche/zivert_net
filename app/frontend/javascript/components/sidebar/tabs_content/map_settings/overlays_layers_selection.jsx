import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { setOverlayLayer } from "../../../../store/actions/main_map";

class OverlaysLayersSelection extends React.Component {
  constructor (props) {
    super(props);

    this.onOverlayChange = this.onOverlayChange.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  onOverlayChange ({ target: { name, checked } }) {
    const { setOverlayLayer } = this.props;

    setOverlayLayer(name, checked);
  }

  isChecked (name) {
    const { overlaysLayers } = this.props;

    return overlaysLayers[name].selected
  }

  renderLabel () {
    return (
      <Form.Label>
        { I18n.t("sidebar.tabs.map_settings.sections.overlay_layers") }
      </Form.Label>
    )
  }

  renderDimmerCheck () {
    return (
      <Form.Check
        type="checkbox"
        className="map-setting-checkbox"
        label={ I18n.t("sidebar.tabs.map_settings.labels.dimmer") }
        id="dimmer-layer-checkbox"
        name="dimmer"
        onChange={this.onOverlayChange}
        checked={this.isChecked("dimmer")}
      />
    )
  }

  renderGeoPointsCheck () {
    return (
      <Form.Check
        type="checkbox"
        className="map-setting-checkbox"
        label={ I18n.t("sidebar.tabs.map_settings.labels.geo_points") }
        id="geo-points-layer-checkbox"
        name="geoPoints"
        onChange={this.onOverlayChange}
        checked={this.isChecked("geoPoints")}
      />
    )
  }

  renderHeatmapCheck () {
    return (
      <Form.Check
        type="checkbox"
        className="map-setting-checkbox"
        label={ I18n.t("sidebar.tabs.map_settings.labels.heatmap") }
        id="heatmap-layer-checkbox"
        name="heatmap"
        onChange={this.onOverlayChange}
        checked={this.isChecked("heatmap")}
      />
    )
  }

  render () {
    return (
      <Form className="overlays-layers-selection">
        { this.renderLabel() }
        { this.renderDimmerCheck() }
        { this.renderGeoPointsCheck() }
        { this.renderHeatmapCheck() }
      </Form>
    )
  }
}

const mapStateToProps = ({ mainMap: { layers: { overlays } } }) => ({
  overlaysLayers: overlays
});

const mapDispatchToProps = dispatch => ({
  setOverlayLayer: (layerName, selected) => dispatch(setOverlayLayer({ layerName, selected }))
});

export default connect(mapStateToProps, mapDispatchToProps)(OverlaysLayersSelection);
