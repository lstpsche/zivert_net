import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthFormBase from "./auth_form_base";

class SignInForm extends AuthFormBase {
  constructor (props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      formValidated: false,
      showAlert: false
    }

    this.isPasswordLengthValid = this.isPasswordLengthValid.bind(this);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.renderAlert = this.renderAlert.bind(this);
    this.renderUsernameField = this.renderUsernameField.bind(this);
    this.renderPasswordField = this.renderPasswordField.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFailure = this.onFailure.bind(this);

    this.toggleAlert = this.toggleAlert.bind(this);
  }

  handleSubmit (event) {
    const { onSubmit } = this.props;
    const { username, password } = this.state;

    event.preventDefault();
    event.stopPropagation();

    if ((this.form.checkValidity() === false)) {
      this.setState({ formValidated: true });
      return;
    }

    onSubmit({ username, password, failureCallback: this.onFailure });
  }

  onFailure () {
    this.setState({
      password: "",
      formValidated: false
    });
    this.toggleAlert(true);
  }

  renderFormActions () {
    return (
      <div className="form-actions">
        <Link
          to="/sign_up"
          id="create-account-link"
          className="secondary-link bold"
        >
          { I18n.t("auth.buttons.create_account") }
        </Link>

        <Button variant="secondary" type="button" className="submit-button" onClick={this.handleSubmit}>
          { I18n.t("auth.buttons.sign_in") }
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
        id="sign-in-form"
      >
        { this.renderAlert(I18n.t("auth.fields.sign_in.errors.invalid_creds")) }

        <div className="form-inputs">
          { this.renderUsernameField("sign_in") }
          { this.renderPasswordField("sign_in") }
        </div>

        { this.renderFormActions() }
      </Form>
    )
  }
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default SignInForm;
