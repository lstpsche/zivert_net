import {Alert, Button, Form} from "react-bootstrap";
import { Link } from "react-router-dom";

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

  renderInput (fieldName, options = {
    required: false,
    label: "sample label",
    type: "text"
  }) {
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

  renderValidatableInput (fieldName, options = {
    required: false,
    label: "sample label",
    type: "text",
    valid: true,
    invalidFeedback: () => null
  }) {
    const {[fieldName]: value, formValidated } = this.state;
    const fieldValid = options.valid === undefined ? true : options.valid

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
          isValid={formValidated && fieldValid}
          isInvalid={formValidated && !fieldValid}
        />

        { options.invalidFeedback }
      </Form.Group>
    )
  }

  renderFormActions (options = {
    additionalButtons: [],
    submitLabel: "Submit"
  }) {
    return (
      <div className="form-actions">
        {
          options.additionalButtons && options.additionalButtons.length
            ? this.renderFormButtons(options.additionalButtons)
            : null
        }

        <Button variant="secondary" type="button" className="submit-button" onClick={this.handleSubmit}>
          { I18n.t(options.submitLabel) }
        </Button>
      </div>
    )
  }

  renderFormButtons (buttons) {
    return (
      buttons.map(({ linkTo, id, className, text }) => {
        return (
          <Link
            key={id + "-key"}
            to={linkTo}
            id={id}
            className={className}
          >
            { I18n.t(text) }
          </Link>
        )
      })
    )
  }
}

export default FormBase;
