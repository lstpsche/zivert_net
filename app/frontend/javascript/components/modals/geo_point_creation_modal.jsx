import { connect } from "react-redux";
import { hideGeoPointCreationModal } from "../../store/actions/modals";
import ModalWindow from "./modal_window";
import { FormControl, InputGroup, Row, Col } from "react-bootstrap";
import fetchLink from "../../helpers/fetch_link";

class GeoPointCreationModal extends React.Component {
  constructor (props) {
    super(props);

    const { latitude, longitude } = this.props;

    this.state = {
      latitude,
      longitude,
      radValue: "",
      comment: ""
    }

    this.createGeoPoint = this.createGeoPoint.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange ({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  createGeoPoint ({ onCreateFailure = () => {} }) {
    const { latitude, longitude, radValue, comment } = this.state;

    fetchLink({
      link: "/api/v1/geo_points",
      method: "POST",
      body: JSON.stringify({ geoPoint: { latitude, longitude, rad_value: radValue, comment } }),
      onSuccess: ({ success, errors }) => {
        if (success) {
          this.props.hideModal();
        } else {
          // TODO: add errors handling with alertify or smth
          console.log(errors);
          onCreateFailure();
        }
      }
    })
  }

  renderInputPrepend (name) {
    return (
      <InputGroup.Prepend>
        <InputGroup.Text id={name + "-addon"}>
          { I18n.t("modals.fields.labels." + name) }
        </InputGroup.Text>
      </InputGroup.Prepend>
    )
  }

  renderLatitudeLongitude () {
    const { latitude, longitude } = this.state;

    return (
      <Row className="lat-lng-inputs">
        <Col className="latitude-input">
          <InputGroup className="mb-3">
            { this.renderInputPrepend("latitude") }
            <FormControl
              placeholder={I18n.t("modals.fields.placeholders.latitude")}
              aria-label="latitude"
              aria-describedby="latitude-addon"
              autoComplete="off"
              name="latitude"
              value={latitude}
              onChange={this.handleInputChange}
            />
          </InputGroup>
        </Col>
        <Col className="longitude-input">
          <InputGroup className="mb-3">
            { this.renderInputPrepend("longitude") }
            <FormControl
              placeholder={I18n.t("modals.fields.placeholders.longitude")}
              aria-label="longitude"
              aria-describedby="longitude-addon"
              autoComplete="off"
              name="longitude"
              value={longitude}
              onChange={this.handleInputChange}
            />
          </InputGroup>
        </Col>
      </Row>
    )
  }

  renderRadValueInputField () {
    const { radValue } = this.state;

    return (
      <InputGroup className="mb-3">
        { this.renderInputPrepend("rad-value") }
        <FormControl
          placeholder={I18n.t("modals.fields.placeholders.rad-value")}
          aria-label="rad-value"
          aria-describedby="rad-value-addon"
          autoComplete="off"
          name="radValue"
          value={radValue}
          onChange={this.handleInputChange}
        />
      </InputGroup>
    )
  }

  renderGeoPointCommentInputField () {
    const { comment } = this.state;

    return (
      <InputGroup>
        { this.renderInputPrepend("geo-point-comment") }
        <FormControl
          placeholder={I18n.t("modals.fields.placeholders.geo-point-comment")}
          aria-label="geo-point-comment"
          aria-describedby="geo-point-comment-addon"
          autoComplete="off"
          name="comment"
          value={comment}
          onChange={this.handleInputChange}
        />
      </InputGroup>
    )
  }

  renderModalBody () {
    return (
      <div id="geo-point-creation-modal-body">
        { this.renderLatitudeLongitude() }
        { this.renderRadValueInputField() }
        { this.renderGeoPointCommentInputField() }
      </div>
    )
  }

  render () {
    const { hideModal } = this.props;

    return (
      <ModalWindow
        show
        submittable
        title={I18n.t("modals.creation.title")}
        body={this.renderModalBody()}
        onSubmitClick={this.createGeoPoint}
        handleClose={hideModal}
      />
    )
  }
}

GeoPointCreationModal.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideGeoPointCreationModal())
});

export default connect(undefined, mapDispatchToProps)(GeoPointCreationModal);
