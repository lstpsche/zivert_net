import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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

    this.isPasswordsMatch = this.isPasswordsMatch.bind(this);
    this.isPasswordLengthValid = this.isPasswordLengthValid.bind(this);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFailure = this.onFailure.bind(this);

    this.renderAlert = this.renderAlert.bind(this);
    this.renderUsernameField = this.renderUsernameField.bind(this);
    this.renderPasswordField = this.renderPasswordField.bind(this);
    this.renderPasswordInvalidFeedback = this.renderPasswordInvalidFeedback.bind(this);
    this.renderPasswordConfirmationInvalidFeedback = this.renderPasswordConfirmationInvalidFeedback.bind(this);

    this.toggleAlert = this.toggleAlert.bind(this);
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

  renderFirstLastNameField () {
    const { firstName, lastName } = this.props;

    return (
      <Row className="first-last-name-row">
        <Col className="first-name-col">
          <Form.Group controlId="formFirstName">
            <Form.Label>
              { I18n.t("auth.fields.sign_up.labels.first_name") }
            </Form.Label>
            <Form.Control
              type="firstName"
              name="firstName"
              value={firstName}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          </Form.Group>
        </Col>
        <Col className="last-name-col">
          <Form.Group controlId="formLastName">
            <Form.Label>
              { I18n.t("auth.fields.sign_up.labels.last_name") }
            </Form.Label>
            <Form.Control
              type="lastName"
              name="lastName"
              value={lastName}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          </Form.Group>
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

  renderFormActions () {
    return (
      <div className="form-actions">
        <Link
          to="/sign_in"
          id="already-registered-link"
          className="secondary-link bold"
        >
          { I18n.t("auth.buttons.already_registered") }
        </Link>

        <Button variant="secondary" type="button" className="submit-button" onClick={this.handleSubmit}>
          { I18n.t("auth.buttons.sign_up") }
        </Button>
      </div>
    )
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
          { this.renderFirstLastNameField() }
          { this.renderUsernameField("sign_up") }
          { this.renderPasswordField("sign_up", this.renderPasswordInvalidFeedback()) }
          { this.renderPasswordConfirmationField() }
        </div>

        { this.renderFormActions() }
      </Form>
    )
  }
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default SignUpForm;
