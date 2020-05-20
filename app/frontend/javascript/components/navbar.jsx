import { Link } from "react-router-dom";
import { connect } from "react-redux";
import UserDropdown from "./common/user_dropdown";

class Navbar extends React.Component {
  projectNameLink () {
    return (
      <Link to="/" className="navbar-brand">
        { I18n.t("common.zivert_net") }
      </Link>
    )
  }

  actionsSide () {
    const { currentUser: { signedIn } } = this.props;

    return (
      <div className="navbar-nav ml-auto">
        <ul className="navbar-nav mr-auto">
          {
            signedIn
              ? this.renderUserDropdown()
              : this.renderAuthLinks()
          }
        </ul>
      </div>
    )
  }

  renderUserDropdown () {
    const { currentUser } = this.props;

    return <UserDropdown user={currentUser} />
  }

  renderAuthLinks () {
    return (
      <div id="auth-links">
        <Link
          to="/sign_in"
          id="sign-in-button"
          className="btn mr-2"
          role="button"
        >
          { I18n.t("devise.sessions.sign_in") }
        </Link>

        <Link
          to="/sign_up"
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
    return (
      <nav className="navbar navbar-expand navbar-light bg-light global-navbar">
        <div className="container col-lg-7 col-md-10 col-sm-11 col-xs-auto">
          { this.projectNameLink() }
          { this.actionsSide() }
        </div>
      </nav>
    )
  }
};

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps)(Navbar);
