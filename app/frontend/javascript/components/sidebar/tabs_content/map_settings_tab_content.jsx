import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { setBaseLayer, setOverlayLayer } from "../../../store/actions/main_map";

class MapSettingsTabContent extends React.Component {
  constructor (props) {
    super(props);

    this.isChecked = this.isChecked.bind(this);
    this.onBaseChange = this.onBaseChange.bind(this);
    this.onOverlayChange = this.onOverlayChange.bind(this);
  }

  onBaseChange ({ target: { name } }) {
    const { setBaseLayer } = this.props;

    setBaseLayer(name);
  }

  onOverlayChange ({ target: { name, checked } }) {
    const { setOverlayLayer } = this.props;

    setOverlayLayer(name, checked);
  }

  isChecked (name) {
    const { layers } = this.props;

    return layers[name].selected
  }

  renderBaseSelection () {
    return (
      <Form>
        <Form.Label>Base map</Form.Label>
        <Form.Check
          type="radio"
          label="Regular map"
          id="regular-map-radio"
          name="regularMap"
          onChange={this.onBaseChange}
          checked={this.isChecked("regularMap")}
        />
      </Form>
    )
  }

  renderOverlaysSelection () {
    return (
      <Form>
        <Form.Label>Overlay layers</Form.Label>
        <Form.Check
          type="checkbox"
          label="Dim map"
          id="dimmer-layer-checkbox"
          name="dimmer"
          onChange={this.onOverlayChange}
          checked={this.isChecked("dimmer")}
        />
        <Form.Check
          type="checkbox"
          label="Geo Points"
          id="geo-points-layer-checkbox"
          name="geoPoints"
          onChange={this.onOverlayChange}
          checked={this.isChecked("geoPoints")}
        />
      </Form>
    )
  }

  render () {
    return (
      <div id="map-settings-tab-content">
        { this.renderBaseSelection() }

        <hr />

        { this.renderOverlaysSelection() }
      </div>
    )
  }
}

const mapStateToProps = ({ mainMap: { layers } }) => ({
  layers: { ...layers.base, ...layers.overlays }
});

const mapDispatchToProps = dispatch => ({
  setBaseLayer: (layerName) => dispatch(setBaseLayer({ layerName })),
  setOverlayLayer: (layerName, selected) => dispatch(setOverlayLayer({ layerName, selected }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapSettingsTabContent);
