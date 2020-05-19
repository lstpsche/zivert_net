import { Link, Redirect } from "react-router-dom";
import UserContext from "./contexts/user_context";
import UserDropdown from "./common/user_dropdown";

class Navbar extends React.Component {
  static contextType = UserContext;

  constructor (props) {
    super(props);

    this.state = {
      redirectTo: ""
    }
  }

  projectNameLink () {
    return (
      <Link to="/" className="navbar-brand">
        { I18n.t("common.zivert_net") }
      </Link>
    )
  }

  actionsSide () {
    const user = this.context;

    return (
      <div className="navbar-nav ml-auto">
        <ul className="navbar-nav mr-auto">
          {
            user.signedIn
              ? this.userDropdown(user)
              : this.authLinks(this.onLogin)
          }
        </ul>
      </div>
    )
  }

  userDropdown (user) {
    return (
      <UserDropdown user={user} />
    )
  }

  authLinks () {
    return (
      <div id="auth-links">
        <Link
          to="/users/sign_in"
          id="sign-in-button"
          className="btn mr-2"
          role="button"
        >
          { I18n.t("devise.sessions.sign_in") }
        </Link>

        <Link
          to="/users/sign_up"
          id="sign-up-button"
          className="btn"
          role="button"
        >
          { I18n.t("devise.registrations.sign_up") }
        </Link>
      </div>
    )
  }

  render () {
    const { redirectTo } = this.state;

    return (
      <nav className="navbar navbar-expand navbar-light bg-light global-navbar">
        { redirectTo ? <Redirect to={redirectTo} /> : null }
        <div className="container col-lg-7 col-md-10 col-sm-11 col-xs-auto">
          { this.projectNameLink() }
          { this.actionsSide() }
        </div>
      </nav>
    )
  }
};

export default Navbar;
