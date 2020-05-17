import { Modal, Button } from "react-bootstrap";

class ModalWindow extends React.Component {
  render () {
    const { title, body, show, handleClose } = this.props;

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
          <Button variant="primary-outline">
            Create marker
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalWindow;
