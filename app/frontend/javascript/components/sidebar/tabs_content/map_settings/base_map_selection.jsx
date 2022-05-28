import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { setBaseLayer } from "../../../../store/actions/main_map";
import BaseSelection from "./base_selection";

class BaseMapSelection extends BaseSelection {
  constructor(props) {
    super(props);

    this.state = this.props.baseLayers;

    this.onRadioChange = this.onRadioChange.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.renderSectionBody = this.renderSectionBody.bind(this);
  }

  onRadioChange ({ target: { name } }) {
    const { setBaseLayer } = this.props;

    setBaseLayer(name);
    super.onRadioChange(name);
  }

  renderSectionLabel () {
    return super.renderSectionLabel(I18n.t("sidebar.tabs.map_settings.base_map.header"));
  }

  renderRegularMapRadio () {
    return (
      <Form.Check
        type="radio"
        className="map-setting-radio"
        label={ I18n.t("sidebar.tabs.map_settings.base_map.labels.regular_map") }
        id="regular-map-radio"
        name="regularMap"
        onChange={this.onRadioChange}
        checked={this.isChecked("regularMap")}
      />
    )
  }

  renderSectionBody () {
    return (
      <>
        { this.renderRegularMapRadio() }
      </>
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
