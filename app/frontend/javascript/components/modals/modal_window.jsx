import { Alert, Button, Modal, Spinner } from "react-bootstrap";

class ModalWindow extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      buttonLoading: false,
      errors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCreateFailure = this.onCreateFailure.bind(this);
  }

  toggleButtonLoading (state) {
    this.setState({ buttonLoading: state })
  }

  handleSubmit () {
    this.toggleButtonLoading(true);
    this.props.onSubmitClick({ onCreateFailure: this.onCreateFailure });
  }

  onCreateFailure () {
    this.setState({ errors: I18n.t("modals.errors.default") });
    this.toggleButtonLoading(false);
  }

  loadingSubmitButton () {
    return (
      <Button variant="secondary" disabled className="submit-button-busy">
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="button-loading-spinner"
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

  renderModalSubmitFooter () {
    const { buttonLoading } = this.state;

    return (
      <Modal.Footer className="submittable-footer">
        {
          buttonLoading
          ? this.loadingSubmitButton()
          : this.regularSubmitButton()
        }
      </Modal.Footer>
    )
  }

  renderModalEmptyFooter () {
    return <Modal.Footer className="empty-footer" />
  }

  render () {
    const { show, submittable, handleClose } = this.props;

    return (
      <Modal show={show} onHide={handleClose}>
        { this.renderModalHeader() }
        { this.renderModalBody() }
        {
          submittable
          ? this.renderModalSubmitFooter()
          : this.renderModalEmptyFooter()
        }
      </Modal>
    )
  }
}

ModalWindow.propTypes = {
  title: PropTypes.string,
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  show: PropTypes.bool,
  submittable: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  onSubmitClick: PropTypes.func
}

ModalWindow.defaultProps = {
  title: "Sample title",
  body: "Sample Body",
  show: true,
  submittable: false
}

export default ModalWindow;
