import { connect } from "react-redux";
import { hideGeoPointCreationModal } from "../../../../store/actions/geo_point_creation_modal";
import ModalWindow from "./modal_window";
import { InputGroup, FormControl, Form } from "react-bootstrap";

class GeoPointCreationModal extends React.Component {
  radValueInputField () {
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
        />
      </InputGroup>
    )
  }

  geoPointCommentInputField () {
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
    const { show, latitude, longitude, hideModal } = this.props;

    return (
      <ModalWindow
        show={show}
        title={I18n.t("modals.creation.title")}
        body={this.generateModalBody()}
        handleClose={hideModal}
      />
    )
  }
}

const mapStateToProps = ({ geoPointCreationModals: { show, latitude, longitude } }) => ({
  show, latitude, longitude
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideGeoPointCreationModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(GeoPointCreationModal);
