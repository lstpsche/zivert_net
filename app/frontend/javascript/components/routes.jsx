import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NotFound from "./errors/not_found";
import Home from "./home";
import SignIn from "./authorization/sign_in";
import SignUp from "./authorization/sign_up";
import MapIndex from "./map/map_index";
import ProfileSettingsEdit from "./users/profile_settings_edit";

class Routes extends React.Component {
  removeTrailingSlashes () {
    return (
      <Route path="/:url*(/+)" exact strict render={({ location }) => (
          <Redirect to={location.pathname.replace(/\/+$/, "")} />
        )}
      />
    )
  }

  signedInRoutes () {
    return (
      <Switch>
        { this.removeTrailingSlashes() }
        <Route path="/" exact component={MapIndex} />
        <Route path="/map" exact component={MapIndex} />
        <Route path="/users/edit" exact component={ProfileSettingsEdit} />
        <Redirect from="/sign_in" to="/" />
        <Redirect from="/sign_up" to="/" />
        <Route path="/" component={NotFound} />
      </Switch>
    )
  }

  notSignedInRoutes () {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign_in" exact component={SignIn} />
        <Route path="/sign_up" exact component={SignUp} />
        <Route path="/map" exact component={MapIndex} />

        <Route path="/" render={() => (
            <Redirect to="/" />
          )}
        />
      </Switch>
    )
  }

  render () {
    const { currentUserSignedIn } = this.props;

    if (currentUserSignedIn)
      return this.signedInRoutes();
    else
      return this.notSignedInRoutes();
  }
}

const mapStateToProps = ({ currentUser: { signedIn } }) => ({ currentUserSignedIn: signedIn });

export default connect(mapStateToProps)(Routes);
