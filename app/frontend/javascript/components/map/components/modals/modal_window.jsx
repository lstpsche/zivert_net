import { Alert, Button, Modal, Spinner } from "react-bootstrap";

class ModalWindow extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      buttonLoading: false,
      errors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCreateCallback = this.onCreateCallback.bind(this);
  }

  toggleButtonLoading (state) {
    this.setState({ buttonLoading: state })
  }

  handleSubmit () {
    this.toggleButtonLoading(true);
    this.props.onSubmitClick({ createCallback: this.onCreateCallback });
  }

  onCreateCallback (success) {
    if (success) {
      this.setState({ errors: "" });
    } else {
      this.setState({ errors: I18n.t("modals.errors.default") });
    }

    this.toggleButtonLoading(false);
  }

  loadingSubmitButton () {
    return (
      <Button variant="secondary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        { I18n.t("modals.buttons.creating_geo_point") }
      </Button>
    )
  }

  regularSubmitButton () {
    return (
      <Button variant="outline-secondary" onClick={this.handleSubmit}>
        { I18n.t("modals.buttons.create_geo_point") }
      </Button>
    )
  }

  renderModalHeader () {
    const { title } = this.props;

    return (
      <Modal.Header closeButton>
        <Modal.Title>
          { title }
        </Modal.Title>
      </Modal.Header>
    )
  }

  renderModalBody () {
    const { body } = this.props;
    const { errors } = this.state;

    return (
      <Modal.Body>
        {
          errors.length
          ? (<Alert variant="danger" className="mb-3"> { errors } </Alert>)
          : null
        }
        { body }
      </Modal.Body>
    )
  }

  renderModalFooter () {
    const { buttonLoading } = this.state;

    return (
      <Modal.Footer>
        {
          buttonLoading
          ? this.loadingSubmitButton()
          : this.regularSubmitButton()
        }
      </Modal.Footer>
    )
  }

  render () {
    const { show, handleClose } = this.props;

    return (
      <Modal show={show} onHide={handleClose}>
        { this.renderModalHeader() }
        { this.renderModalBody() }
        { this.renderModalFooter() }
      </Modal>
    )
  }
}

ModalWindow.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onSubmitClick: PropTypes.func,
  handleClose: PropTypes.func.isRequired
}

ModalWindow.defaultProps = {
  title: "Sample title",
  body: "Sample Body",
  onSubmitClick: () => {}
}

export default ModalWindow;
