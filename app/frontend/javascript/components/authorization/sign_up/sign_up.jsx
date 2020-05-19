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
      onSuccess: (response) => {
        debugger
      }
    });
  }

  render () {
    return (
      <div id="sign-up-container">
        <SignUpForm
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default SignUp;
