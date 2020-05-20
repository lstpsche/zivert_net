import { Form } from "react-bootstrap";

class FormBase extends React.Component {
  constructor (props) {
    super(props);

    this.minPasswordLength = 6;
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

  handleKeyPress (event) {
    // needed to prevent passwords leak alert, that is caused by bootstrap default submit
    if (event.which === 13) {
      this.handleSubmit(event)
    }
  }

  renderPasswordInvalidFeedback () {
    return ""
  }

  renderUsernameField (type) {
    const { username } = this.state;

    return (
      <Form.Group controlId="formUsername">
        <Form.Label>
          { I18n.t(`auth.fields.${type}.labels.username`) }
        </Form.Label>
        <Form.Control
          ref={el => this.usernameField = el}
          required
          type="username"
          name="username"
          value={username}
          autoComplete="off"
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
      </Form.Group>
    )
  }

  renderPasswordField (type) {
    const { formValidated, password } = this.state;

    return (
      <Form.Group controlId="formPassword">
        <Form.Label>
          { I18n.t(`auth.fields.${type}.labels.password`) }
        </Form.Label>
        <Form.Control
          required
          type="password"
          name="password"
          value={password}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          isValid={formValidated && this.isPasswordLengthValid()}
          isInvalid={formValidated && !this.isPasswordLengthValid()}
        />

        { this.renderPasswordInvalidFeedback() }
      </Form.Group>
    )
  }

  componentDidMount () {
    this.usernameField.focus();
  }
}

export default FormBase;
