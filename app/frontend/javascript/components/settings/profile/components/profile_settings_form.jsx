import FormBase from "../../../common/form_base";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";

class ProfileSettingsForm extends FormBase {
  constructor (props) {
    super(props);

    const { currentUser } = this.props;

    this.state = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      username: currentUser.username,
      currentPassword: "",
      formValidated: false,
      showAlert: false,
      error: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFailure = this.onFailure.bind(this);

    this.renderCurrentPasswordInvalidFeedback = this.renderCurrentPasswordInvalidFeedback.bind(this);
  }

  handleSubmit () {
    const { onSubmit } = this.props;
    const { firstName, lastName, username, currentPassword } = this.state;

    if ((this.form.checkValidity() === false) || currentPassword.length === 0) {
      this.setState({ formValidated: true });
      return;
    }

    onSubmit({ firstName, lastName, username, currentPassword, failureCallback: this.onFailure });
  }

  onFailure ({ error }) {
    this.setState({
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
        label: "settings.profile.fields.first_name.title"
      }
    )
  }

  renderLastNameField () {
    return this.renderInput(
      "lastName",
      {
        required: false,
        label: "settings.profile.fields.last_name.title"
      }
    )
  }

  renderUsernameField () {
    return this.renderInput(
      "username",
      {
        required: false,
        label: "settings.profile.fields.username.title"
      }
    )
  }

  renderCurrentPasswordField () {
    return this.renderValidatableInput(
      "currentPassword",
      {
        required: true,
        type: "password",
        label: "settings.profile.fields.current_password.title",
        invalidFeedback: this.renderCurrentPasswordInvalidFeedback(),
        valid: this.state.currentPassword.length > 0
      }
    )
  }

  renderCurrentPasswordInvalidFeedback () {
    if (this.state.currentPassword.length)
      return "";

    return (
      <Form.Control.Feedback type="invalid">
        { I18n.t("settings.profile.fields.current_password.invalid_feedback") }
      </Form.Control.Feedback>
    )
  }

  render () {
    const { formValidated, error } = this.state;

    return (
      <Form
        ref={el => this.form = el}
        noValidate
        id="profile-settings-form"
      >
        { this.renderAlert(error) }

        <div className="form-inputs">
          { this.renderFirstNameField() }
          { this.renderLastNameField() }
          { this.renderUsernameField() }
          { this.renderCurrentPasswordField() }

          {
            this.renderFormActions({
              submitLabel: "settings.profile.buttons.submit"
            })
          }
        </div>
      </Form>
    )
  }
}

ProfileSettingsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps)(ProfileSettingsForm);
