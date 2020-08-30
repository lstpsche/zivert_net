import FormBase from "../../common/form_base";

class AuthFormBase extends FormBase {
  constructor (props) {
    super(props);

    this.minPasswordLength = 6;
  }

  renderUsernameField (authType) {
    return this.renderInput(
      "username",
      {
        label: `auth.fields.${authType}.labels.username`,
        required: true
      }
    )
  }

  renderPasswordField (authType, invalidFeedback = null) {
    return this.renderValidatableInput(
      "password",
      {
        label: `auth.fields.${authType}.labels.password`,
        type: "password",
        required: authType === "sign_up",
        valid: this.isPasswordLengthValid(),
        invalidFeedback: invalidFeedback
      }
    )
  }

  componentDidMount () {
    this.username.focus();
  }
}

export default AuthFormBase;
