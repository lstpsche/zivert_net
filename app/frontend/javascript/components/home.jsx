import { Link } from "react-router-dom";

class Home extends React.Component {
  render () {
    return (
      <div className="full-page-cover">
        <div className="content">
          <h1 className="cover-heading">
            {I18n.t("home.main_title")}
          </h1>

          <p className="lead">
            {I18n.t("home.welcome_message")}
          </p>

          <p className="lead">
            <Link
              to="/map"
              className="btn btn-lg btn-secondary"
              role="button"
            >
              {I18n.t("home.buttons.show_map")}
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
