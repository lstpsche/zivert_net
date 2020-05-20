import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class SignUpForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      passwordConfirmation: "",
      formValidated: false
    }

    this.minPasswordLength = 6;

    this.isPasswordsMatch = this.isPasswordsMatch.bind(this);
    this.isPasswordLengthValid = this.isPasswordLengthValid.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isPasswordsMatch () {
    const { password, passwordConfirmation } = this.state;

    return password === passwordConfirmation
  }

  isPasswordLengthValid () {
    const { password } = this.state;

    return password.length >= this.minPasswordLength;
  }

  handleInputChange ({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit (event) {
    const { currentTarget: form } = event;
    const { onSubmit } = this.props;
    const { username, password, passwordConfirmation } = this.state;

    event.preventDefault();
    event.stopPropagation();

    if ((form.checkValidity() === false) || !this.isPasswordLengthValid() || !this.isPasswordsMatch()) {
      this.setState({ formValidated: true });
      return;
    }

    onSubmit({ username, password, passwordConfirmation });
  }

  renderUsernameField () {
    const { username } = this.state;

    return (
      <Form.Group controlId="formUsername">
        <Form.Label>
          { I18n.t("auth.sign_up.fields.labels.username") }
        </Form.Label>
        <Form.Control
          ref={el => this.usernameField = el}
          required
          type="username"
          name="username"
          value={username}
          autoComplete="off"
          onChange={this.handleInputChange}
        />
      </Form.Group>
    )
  }

  renderPasswordField () {
    const { formValidated, password } = this.state;

    return (
      <Form.Group controlId="formPassword">
        <Form.Label>
          { I18n.t("auth.sign_up.fields.labels.password") }
        </Form.Label>
        <Form.Control
          required
          type="password"
          name="password"
          value={password}
          onChange={this.handleInputChange}
          isValid={formValidated && this.isPasswordLengthValid()}
          isInvalid={formValidated && !this.isPasswordLengthValid()}
        />
        {
          this.isPasswordLengthValid()
          ? ""
          : (
            <Form.Control.Feedback type="invalid">
              { I18n.t("auth.sign_up.fields.errors.password_length") }
            </Form.Control.Feedback>
          )
        }
      </Form.Group>
    )
  }

  renderPasswordConfirmationField () {
    const { formValidated, passwordConfirmation } = this.state;

    return (
      <Form.Group controlId="formPasswordConfirmation">
        <Form.Label>
          { I18n.t("auth.sign_up.fields.labels.password_confirmation") }
        </Form.Label>
        <Form.Control
          required
          type="password"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={this.handleInputChange}
          isValid={formValidated && this.isPasswordsMatch()}
          isInvalid={formValidated && !this.isPasswordsMatch()}
        />
        {
          this.isPasswordsMatch()
          ? ""
          : (
            <Form.Control.Feedback type="invalid">
              { I18n.t("auth.sign_up.fields.errors.password_confirm") }
            </Form.Control.Feedback>
          )
        }
      </Form.Group>
    )
  }

  componentDidMount () {
    this.usernameField.focus();
  }

  componentWillUnmount () {
    // clear fields to prevent passwords leak alert
    this.setState({
      username: "",
      password: "",
      passwordConfirmation: ""
    })
  }

  render () {
    const { formValidated } = this.state;

    return (
      <Form
        noValidate
        validated={formValidated}
        id="sign-up-form"
        onSubmit={this.handleSubmit}
      >
        { this.renderUsernameField() }
        { this.renderPasswordField() }
        { this.renderPasswordConfirmationField() }

        <div className="form-actions">
          <Button variant="secondary" type="submit">
            {I18n.t("auth.buttons.sign_up")}
          </Button>

          <Link
            to="/sign_in"
            id="already-registered-link"
            className="secondary-link bold"
          >
            { I18n.t("auth.buttons.already_registered") }
          </Link>
        </div>
      </Form>
    )
  }
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default SignUpForm;
