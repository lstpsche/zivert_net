import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { setBaseLayer } from "../../../../store/actions/main_map";
import BaseSelection from "./base_selection";

class BaseMapSelection extends BaseSelection {
  constructor(props) {
    super(props);

    this.onBaseChange = this.onBaseChange.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.renderSectionBody = this.renderSectionBody.bind(this);
  }

  onBaseChange ({ target: { name } }) {
    const { setBaseLayer } = this.props;

    setBaseLayer(name);
  }

  renderSectionLabel () {
    return (
      <h5 className="map-settings-section-header">{ I18n.t("sidebar.tabs.map_settings.base_map.header") }</h5>
    )
  }

  renderRegularMapRadio () {
    return (
      <Form.Check
        type="radio"
        className="map-setting-radio"
        label={ I18n.t("sidebar.tabs.map_settings.base_map.labels.regular_map") }
        id="regular-map-radio"
        name="regularMap"
        onChange={this.onBaseChange}
        checked={this.isChecked("regularMap")}
      />
    )
  }

  renderSectionBody () {
    return (
      <div>
        { this.renderRegularMapRadio() }
      </div>
    )
  }
}

const mapStateToProps = ({ mainMap: { layers } }) => ({
  layers: layers.base
});

const mapDispatchToProps = dispatch => ({
  setBaseLayer: (layerName) => dispatch(setBaseLayer({ layerName }))
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseMapSelection);
