import { Alert, Form } from "react-bootstrap";

class FormBase extends React.Component {
  capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  toggleAlert (state) {
    this.setState({ showAlert: state });
  }

  renderAlert (error) {
    const { showAlert } = this.state;

    if (showAlert)
      return (
        <Alert id="alert-block" variant="danger" onClose={() => this.toggleAlert(false)} dismissible>
          { error }
        </Alert>
      )

    return "";
  }

  handleInputChange ({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleKeyPress (event) {
    // needed to prevent passwords leak alert, that is caused by bootstrap default submit
    if (event.which === 13) {
      this.handleSubmit(event);
    }
  }

  isPasswordsMatch () {
    const { password, passwordConfirmation } = this.state;

    return password === passwordConfirmation;
  }

  isPasswordLengthValid () {
    const { password } = this.state;

    return password.length >= this.minPasswordLength;
  }

  renderInput (fieldName, options) {
    const { [fieldName]: value } = this.state;

    return (
      <Form.Group controlId={"form" + this.capitalize(fieldName)}>
        <Form.Label className={options.required ? "required" : null}>
          { I18n.t(options.label) }
        </Form.Label>
        <Form.Control
          ref={el => this[fieldName] = el}
          required={options.required}
          type={options.type || "text"}
          name={fieldName}
          value={value}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
      </Form.Group>
    )
  }

  renderValidatableInput (fieldName, options) {
    const {[fieldName]: value, formValidated } = this.state;

    return (
      <Form.Group controlId={"form" + this.capitalize(fieldName)}>
        <Form.Label className={options.required ? "required" : null}>
          {I18n.t(options.label)}
        </Form.Label>
        <Form.Control
          ref={el => this[fieldName] = el}
          required={options.required}
          type={options.type || "text"}
          name={fieldName}
          value={value}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          isValid={formValidated && options.valid}
          isInvalid={formValidated && !options.valid}
        />

        { options.invalidFeedback }
      </Form.Group>
    )
  }
}

export default FormBase;
