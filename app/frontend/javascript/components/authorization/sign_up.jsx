import fetchLink from "../../helpers/fetch_link";
import SignUpForm from "./forms/sign_up_form";

class SignUp extends React.Component {
  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit ({ firstName, lastName, username, password, passwordConfirmation, failureCallback }) {
    fetchLink({
      link: "/users",
      method: "POST",
      body: JSON.stringify({
        user: {
          first_name: firstName,
          last_name: lastName,
          username, password,
          nickname: username,
          password_confirmation: passwordConfirmation
        }
      }),
      onSuccess: ({ error }) => {
        if (error) {
          failureCallback({ error });
          return;
        }

        window.location.reload();
      }
    });
  }

  render () {
    return (
      <div className="auth-container">
        <div id="sign-up-container" className="auth-form-container col-xl-7 col-lg-10 col-md-10 col-sm-11">
          <h5 className="auth-title secondary">
            { I18n.t("auth.titles.join_zivertnet") }
          </h5>
          <h2 className="auth-title primary">
            { I18n.t("auth.titles.sign_up") }
          </h2>

          <SignUpForm
            onSubmit={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}

export default SignUp;
