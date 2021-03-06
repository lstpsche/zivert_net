import { Row, Col, Form, Button } from "react-bootstrap";
import AuthFormBase from "./auth_form_base";

class SignUpForm extends AuthFormBase {
  constructor (props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      passwordConfirmation: "",
      formValidated: false,
      showAlert: false,
      error: ""
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  handleSubmit () {
    const { onSubmit } = this.props;
    const { firstName, lastName, username, password, passwordConfirmation } = this.state;

    if ((this.form.checkValidity() === false) || !this.isPasswordLengthValid() || !this.isPasswordsMatch()) {
      this.setState({ formValidated: true });
      return;
    }

    onSubmit({ firstName, lastName, username, password, passwordConfirmation, failureCallback: this.onFailure });
  }

  onFailure ({ error }) {
    this.setState({
      password: "",
      passwordConfirmation: "",
      formValidated: false,
      error
    });
    this.toggleAlert(true);
  }

  renderFirstNameField () {
    return this.renderInput(
      "firstName",
      {
        required: false,
        label: "auth.fields.sign_up.labels.first_name"
      }
    )
  }

  renderLastNameField () {
    return this.renderInput(
      "lastName",
      {
        required: false,
        label: "auth.fields.sign_up.labels.last_name"
      }
    )
  }

  renderFirstLastNameFieldsRow () {
    return (
      <Row className="first-last-name-row">
        <Col className="first-name-col">
          { this.renderFirstNameField() }
        </Col>
        <Col className="last-name-col">
          { this.renderLastNameField() }
        </Col>
      </Row>
    )
  }

  renderPasswordInvalidFeedback () {
    if (this.isPasswordLengthValid())
      return "";

    return (
      <Form.Control.Feedback type="invalid">
        { I18n.t(`auth.fields.sign_up.errors.password_length`) }
      </Form.Control.Feedback>
    )
  }

  renderPasswordConfirmationInvalidFeedback () {
    return (
      this.isPasswordsMatch()
        ? ""
        : (
          <Form.Control.Feedback type="invalid" className="password-confirmation-feedback">
            { I18n.t("auth.fields.sign_up.errors.password_confirm") }
          </Form.Control.Feedback>
        )
    )
  }

  renderPasswordConfirmationField () {
    return this.renderValidatableInput(
      "passwordConfirmation",
      {
        label: "auth.fields.sign_up.labels.password_confirmation",
        type: "password",
        required: true,
        valid: this.isPasswordsMatch(),
        invalidFeedback: this.renderPasswordConfirmationInvalidFeedback()
      }
    )
  }

  renderActions () {
    return this.renderFormActions({
      additionalButtons: [{
        linkTo: "/sign_in",
        id: "already-registered-link",
        className: "secondary-link bold",
        text: "auth.buttons.already_registered"
      }],
      submitLabel: "auth.buttons.sign_up"
    })
  }

  render () {
    const { formValidated, error } = this.state;

    return (
      <Form
        ref={el => this.form = el}
        noValidate
        validated={formValidated}
        id="sign-up-form"
      >
        { this.renderAlert(error) }

        <div className="form-inputs">
          { this.renderFirstLastNameFieldsRow() }
          { this.renderUsernameField("sign_up") }
          { this.renderPasswordField("sign_up", this.renderPasswordInvalidFeedback()) }
          { this.renderPasswordConfirmationField() }
        </div>

        { this.renderActions() }
      </Form>
    )
  }
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default SignUpForm;
