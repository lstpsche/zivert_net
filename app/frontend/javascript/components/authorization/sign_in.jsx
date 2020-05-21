import fetchLink from "../../helpers/fetch_link";
import SignInForm from "./forms/sign_in_form";

class SignIn extends React.Component {
  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit ({ username, password, failureCallback }) {
    fetchLink({
      link: "/users/sign_in",
      method: "POST",
      body: JSON.stringify({ user: { username, password } }),
      onSuccess: ({ signed_in: signedIn }) => {
        if (!signedIn) {
          failureCallback();
          return;
        }

        window.location.reload();
      }
    })
  }

  render () {
    return (
      <div id="sign-in-container" className="auth-form-container col-xl-6 col-lg-10 col-md-10 col-sm-11">
        <h2 className="auth-title primary">
          { I18n.t("auth.titles.sign_in") }
        </h2>
        <SignInForm
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default SignIn;
