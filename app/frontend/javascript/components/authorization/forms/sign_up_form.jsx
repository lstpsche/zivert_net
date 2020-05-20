import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormBase from "./form_base";

class SignUpForm extends FormBase {
  constructor (props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      passwordConfirmation: "",
      formValidated: false
    }

    this.isPasswordsMatch = this.isPasswordsMatch.bind(this);
    this.isPasswordLengthValid = this.isPasswordLengthValid.bind(this);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.renderUsernameField = this.renderUsernameField.bind(this);
    this.renderPasswordField = this.renderPasswordField.bind(this);
    this.renderPasswordInvalidFeedback = this.renderPasswordInvalidFeedback.bind(this);
  }

  handleSubmit () {
    const { onSubmit } = this.props;
    const { username, password, passwordConfirmation } = this.state;

    if ((this.form.checkValidity() === false) || !this.isPasswordLengthValid() || !this.isPasswordsMatch()) {
      this.setState({ formValidated: true });
      return;
    }

    onSubmit({ username, password, passwordConfirmation });
  }

  renderPasswordInvalidFeedback () {
    if(this.isPasswordLengthValid())
      return ""

    return (
      <Form.Control.Feedback type="invalid">
        { I18n.t(`auth.fields.sign_up.errors.password_length`) }
      </Form.Control.Feedback>
    )
  }

  renderPasswordConfirmationField () {
    const { formValidated, passwordConfirmation } = this.state;

    return (
      <Form.Group controlId="formPasswordConfirmation">
        <Form.Label>
          { I18n.t("auth.fields.sign_up.labels.password_confirmation") }
        </Form.Label>
        <Form.Control
          required
          type="password"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          isValid={formValidated && this.isPasswordsMatch()}
          isInvalid={formValidated && !this.isPasswordsMatch()}
        />
        {
          this.isPasswordsMatch()
          ? ""
          : (
            <Form.Control.Feedback type="invalid" className="password-confirmation-feedback">
              { I18n.t("auth.fields.sign_up.errors.password_confirm") }
            </Form.Control.Feedback>
          )
        }
      </Form.Group>
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
    const { formValidated } = this.state;

    return (
      <Form
        ref={el => this.form = el}
        noValidate
        validated={formValidated}
        id="sign-up-form"
      >
        <div className="form-inputs">
          { this.renderUsernameField("sign_up") }
          { this.renderPasswordField("sign_up") }
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
