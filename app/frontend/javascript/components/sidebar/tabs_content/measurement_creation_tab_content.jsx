import { connect } from "react-redux";
import fetchLink from "../../../helpers/fetch_link";
import { FormControl, Col, InputGroup, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { setMeasurementCreationData } from "../../../store/actions/user_actions";

class MeasurementCreationTabContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      units: this.props.defaultUnits
    }

    this.handleValueChange = this.handleValueChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onUnitsChange = this.onUnitsChange.bind(this);
  }

  handleValueChange ({ target: { value } }) {
    const { setMeasurementCreationData, latitude, longitude } = this.props;

    setMeasurementCreationData({ value, latitude, longitude });
    this.setState({ value });
  }

  onMeasurementCreate () {
    const { closeSidebar, setMeasurementCreationData } = this.props;

    closeSidebar();
    setMeasurementCreationData({ value: "", latitude: "", longitude: "" });
  }

  onUnitsChange ({ target: { value } }) {
    this.setState({ units: value });
  }

  renderNote () {
    return (
      <h6>
        { I18n.t("sidebar.tabs.measurement_creation.labels.note_html") }
      </h6>
    )
  }

  renderCoordinatesFields () {
    return (
      <Col>
        <Row>
          { this.renderCoordinateField("latitude") }
        </Row>
        <Row>
          { this.renderCoordinateField("longitude") }
        </Row>
      </Col>
    )
  }

  renderCoordinateField (name) {
    const { [name]: value } = this.props;

    return (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id={name + "-addon"}>
            { I18n.t("sidebar.tabs.measurement_creation.labels." + name) }
          </InputGroup.Text>
        </InputGroup.Prepend>

        <FormControl
          aria-label={name}
          aria-describedby={ name + "-addon" }
          name={name}
          value={value}
          readOnly={true}
        />
      </InputGroup>
    )
  }

  renderValueField () {
    const { value } = this.state;

    return (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="value-prepend">
            { I18n.t("sidebar.tabs.measurement_creation.labels.radiation_value") }
          </InputGroup.Text>
        </InputGroup.Prepend>

        <FormControl
          name="value"
          value={value}
          onChange={this.handleValueChange}
        />

        { this.renderValueAppend() }
      </InputGroup>
    )
  }

  renderValueAppend () {
    const { units } = this.state;

    return (
      <InputGroup.Append>
        <FormControl
          as="select"
          id="value-append-units-select"
          name="units"
          value={units}
          onChange={this.onUnitsChange}
        >
          { this.renderUnitsOptions() }
        </FormControl>
      </InputGroup.Append>
    )
  }

  renderUnitsOptions () {
    const { unitsOptions } = this.props;

    return unitsOptions.map(unitOption => {
      return <option key={unitOption + "-option-key"} value={unitOption}>{ I18n.t('sidebar.tabs.measurement_creation.appends.units.' + unitOption) }</option>
    })
  }

  isSendButtonDisabled () {
    const { value } = this.state;

    return !/^\d+$/.test(value);
  }

  submitForm () {
    const { latitude, longitude } = this.props;
    const { value, units } = this.state;

    fetchLink({
      link: "/api/v1/measurements",
      method: "POST",
      body: JSON.stringify({ measurement: { latitude, longitude, ["value_" + units]: value } }),
      onSuccess: ({ success, errors }) => {
        if (success) {
          this.onMeasurementCreate();
        } else {
          // TODO: add errors handling with alertify or smth
          console.log(errors);
        }
      }
    });
  }

  renderSubmitButton () {
    return (
      <button
        id="measurement-create"
        disabled={this.isSendButtonDisabled()}
        onClick={this.submitForm}
      >
        <span>Add measurement </span>
        <FaPlus size="15px"/>
      </button>
    )
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {
    if (this.props.measurementCreationState && !prevProps.measurementCreationState)
      this.setState({ value: "", units: this.props.defaultUnits })
  }

  render () {
    const { selectedTabId, measurementCreationState } = this.props;

    if (selectedTabId === "measurement-creation-tab" && !measurementCreationState) {
      return null;
    }

    return (
      <div id="measurement-creation-tab-content">
        { this.renderNote() }
        <div id="coordinates-block">
          { this.renderCoordinatesFields() }
        </div>
        <div id="rad-value-block">
          { this.renderValueField() }
        </div>
        { this.renderSubmitButton() }
      </div>
    )
  }
}

const mapStateToProps = ({
  sidebar: { selectedTabId },
  userActions: { measurementCreation: { state: measurementCreationState, data: { latitude, longitude } } },
  mainMap: { settings: { units: defaultUnits }, settingsOptions: { units: unitsOptions } }
}) => ({
  selectedTabId,
  measurementCreationState,
  latitude, longitude,
  defaultUnits, unitsOptions
});

const mapDispatchToProps = dispatch => ({
  setMeasurementCreationData: ({ value, latitude, longitude }) => dispatch(setMeasurementCreationData({ value, latitude, longitude }))
});

MeasurementCreationTabContent.propTypes = {
  closeSidebar: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementCreationTabContent);
