import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Badge } from "react-bootstrap";
import { showAboutModal } from "../store/actions/modals";
import UserDropdown from "./common/user_dropdown";

class Navbar extends React.Component {
  constructor (props) {
    super(props);

    this.renderAdminBadge = this.renderAdminBadge.bind(this);
  }

  renderProjectNameLink () {
    return (
      <Link to="/" className="navbar-brand">
        { I18n.t("common.zivert_net") }
      </Link>
    )
  }

  renderAboutButton () {
    return (
      <button id="about-link" className="btn nav-link" onClick={this.props.showAboutModal}>
        { I18n.t("common.about") }
      </button>
    )
  }

  renderAdminBadge () {
    const { currentUser: { admin: isAdmin } } = this.props;

    if (isAdmin)
      return (
        <Badge id="admin-badge" className="mr-2" variant="light">
          { I18n.t("common.admin") }
        </Badge>
      )
  }

  renderActionsSide () {
    const { currentUser: { signedIn } } = this.props;

    return (
      <div className="navbar-nav ml-auto">
        <ul className="navbar-nav mr-auto">
          { this.renderAdminBadge() }
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
          { this.renderProjectNameLink() }
          { this.renderAboutButton() }
          { this.renderActionsSide() }
        </div>
      </nav>
    )
  }
};

const mapStateToProps = ({ currentUser }) => ({ currentUser });

const mapDispatchToProps = dispatch => ({
  showAboutModal: () => dispatch(showAboutModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
