import { connect } from "react-redux";
import { hideGeoPointCreationModal } from "../../../../store/actions/geo_point_creation_modal";
import { addGeoPoint } from "../../../../store/actions/geo_points";
import ModalWindow from "./modal_window";
import { InputGroup, FormControl } from "react-bootstrap";
import fetchLink from "../../../../helpers/fetch_link";

class GeoPointCreationModal extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      radValue: "",
      comment: ""
    }

    this.createGeoPoint = this.createGeoPoint.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.hideModalWindow = this.hideModalWindow.bind(this);
  }

  hideModalWindow () {
    this.props.hideModal();
    this.clearInputs();
  }

  clearInputs () {
    this.setState({ radValue: "", comment: "" });
  }

  handleInputChange ({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  createGeoPoint ({ createCallback = () => {} }) {
    const { latitude, longitude, addGeoPoint } = this.props;
    const { radValue, comment } = this.state;

    fetchLink({
      link: "/api/v1/geo_points",
      method: "POST",
      body: JSON.stringify({ geoPoint: { latitude, longitude, rad_value: radValue, comment } }),
      onSuccess: ({ success, geoPoint, errors }) => {
        if (success) {
          addGeoPoint(geoPoint.data.attributes);
          this.hideModalWindow();
        } else {
          // TODO: add errors handling with alertify or smth
          console.log(errors);
        }
        createCallback(success);
      }
    })
  }

  radValueInputField () {
    const { radValue } = this.state;

    return (
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="rad-value-addon">
            { I18n.t("modals.fields.labels.rad_value") }
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder={I18n.t("modals.fields.placeholders.rad_value")}
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

  geoPointCommentInputField () {
    const { comment } = this.state;

    return (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="geo-point-comment-addon">
            { I18n.t("modals.fields.labels.comment") }
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder={I18n.t("modals.fields.placeholders.comment")}
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

  generateModalBody () {
    return (
      <div id="geo-point-creation-modal-body">
        { this.radValueInputField() }
        { this.geoPointCommentInputField() }
      </div>
    )
  }

  render () {
    const { show, hideModal } = this.props;

    return (
      <ModalWindow
        show={show}
        title={I18n.t("modals.creation.title")}
        body={this.generateModalBody()}
        onSubmitClick={this.createGeoPoint}
        handleClose={hideModal}
      />
    )
  }
}

const mapStateToProps = ({ geoPointCreationModals: { show, latitude, longitude } }) => ({
  show, latitude, longitude
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideGeoPointCreationModal()),
  addGeoPoint: (geoPoint) => dispatch(addGeoPoint(geoPoint))
});

export default connect(mapStateToProps, mapDispatchToProps)(GeoPointCreationModal);
