import fetchLink from "../../../helpers/fetch_link";
import SignUpForm from "./sign_up_form";

class SignUp extends React.Component {
  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit ({ username, password, passwordConfirmation }) {
    fetchLink({
      link: "/users",
      method: "POST",
      body: JSON.stringify({ user: { username, password, password_confirmation: passwordConfirmation } }),
      onSuccess: () => window.location.reload()
    });
  }

  render () {
    return (
      <div id="sign-up-container" className="col-xl-8 col-lg-10 col-md-10 col-sm-11">
        <h2 id="sign-up-title">
          { I18n.t("auth.titles.sign_up") }
        </h2>

        <SignUpForm
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default SignUp;
