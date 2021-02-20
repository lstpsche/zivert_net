import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { setBaseLayer } from "../../../../store/actions/main_map";

class BaseMapSelection extends React.Component {
  constructor(props) {
    super(props);

    this.onBaseChange = this.onBaseChange.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  onBaseChange ({ target: { name } }) {
    const { setBaseLayer } = this.props;

    setBaseLayer(name);
  }

  isChecked (name) {
    const { baseLayers } = this.props;

    return baseLayers[name].selected
  }

  renderLabel () {
    return (
      <Form.Label>
        { I18n.t("sidebar.tabs.map_settings.sections.base_map") }
      </Form.Label>
    )
  }

  renderRegularMapRadio () {
    return (
      <Form.Check
        type="radio"
        className="map-setting-radio"
        label={ I18n.t("sidebar.tabs.map_settings.labels.regular_map") }
        id="regular-map-radio"
        name="regularMap"
        onChange={this.onBaseChange}
        checked={this.isChecked("regularMap")}
      />
    )
  }

  render () {
    return (
      <Form className="base-map-selection">
        { this.renderLabel() }
        { this.renderRegularMapRadio() }
      </Form>
    )
  }
}

const mapStateToProps = ({ mainMap: { layers: { base } } }) => ({
  baseLayers: base
});

const mapDispatchToProps = dispatch => ({
  setBaseLayer: (layerName) => dispatch(setBaseLayer({ layerName }))
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseMapSelection);
