import { Modal, Button } from "react-bootstrap";

class ModalWindow extends React.Component {
  render () {
    const { title, body, show, handleClose } = this.props;


    // show spinner with "Creating..." text when tapped on Create marker
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            { title }
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { body }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary">
            { I18n.t("modals.create_marker") }
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalWindow;
