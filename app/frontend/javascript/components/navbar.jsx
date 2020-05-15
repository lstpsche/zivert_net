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

    this.projectNameLink = this.projectNameLink.bind(this);
    this.actionsSide = this.actionsSide.bind(this);
    this.userDropdown = this.userDropdown.bind(this);
    this.loginLink = this.loginLink.bind(this);
    this.onLogin = this.onLogin.bind(this);
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
              : this.loginLink(this.onLogin)
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

  loginLink (callback) {
    //  TODO:  add link to sign in/sign up [#ZN-8]
    return "SIGN IN LINK"
  }

  onLogin () {
    window.location.reload();
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
