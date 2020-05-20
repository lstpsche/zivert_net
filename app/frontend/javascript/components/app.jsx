import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../store/actions/current_user";
import { setFullPageBlock } from "../store/actions/blocking";
import fetchLink from "../helpers/fetch_link";
import Navbar from "./navbar";
import Routes from "./routes";

class App extends React.Component {
  fetchCurrentUser () {
    fetchLink({
      link: "/api/v1/current_user",
      onSuccess: ({ signed_in, user = { data: { attributes: {} }} }) => {
        this.props.setCurrentUser({ signed_in, ...user.data.attributes });
        this.props.setFullPageBlock(false);
      },
      errorMessage: I18n.t("errors.not_logged_in")
      // TODO: Add alertify call from onFailure: () => {...}
    });
  }

  componentDidUpdate () {
    this.fetchCurrentUser();
  }

  componentDidMount () {
    this.fetchCurrentUser();
  }

  render () {
    return (
      <BrowserRouter>
        <Navbar />
        <div className="container col-lg-7 col-md-10 col-sm-11 col-xs-auto">
          <Routes />
        </div>
      </BrowserRouter>
    )
  }
};

// const mapStateToProps = ({ currentUser: { signedIn } }) => ({ currentUserSignedIn: signedIn });

const mapDispatchToProps = dispatch => ({
  setFullPageBlock: (state) => dispatch(setFullPageBlock(state)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(undefined, mapDispatchToProps)(App);
