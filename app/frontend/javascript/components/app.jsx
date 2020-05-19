import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Loader from "./common/loader";
import fetchLink from "../helpers/fetch_link";
import UserContext from "./contexts/user_context";
import NotFound from "./errors/not_found";
import Navbar from "./navbar";
import Home from "./home";
import SignIn from "./authorization/sign_in/sign_in";
import SignUp from "./authorization/sign_up/sign_up";
import MapIndex from "./map/map_index";

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      signedIn: undefined,
      user: {}
    }

    this.removeTrailingSlashes = this.removeTrailingSlashes.bind(this);
    this.signedInRoutes = this.signedInRoutes.bind(this);
    this.notSignedInRoutes = this.notSignedInRoutes.bind(this);
  }

  componentDidMount () {
    fetchLink({
      link: "/api/v1/auth/signed_in",
      onSuccess: ({ signed_in: signedIn, user = { data: { attributes: {} }} }) => {
        this.setState({
          signedIn: signedIn,
          user: user.data.attributes
        });
      },
      errorMessage: I18n.t("errors.not_logged_in")
      // TODO: Add alertify call from onFailure: () => {...}
    });
  }

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
    const { signedIn, user } = this.state;
    user.signedIn = signedIn;

    if (signedIn === undefined)
      return <BlockUi tag="div" className="full-page-cover" blocking={true} loader={<Loader />} keepInView/>

    return (
      <BrowserRouter>
        <UserContext.Provider value={user}>
          <Navbar />
          <div className="container col-lg-7 col-md-10 col-sm-11 col-xs-auto">
            {
              signedIn
              ? this.signedInRoutes()
              : this.notSignedInRoutes()
            }
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    )
  }
};

export default App;
