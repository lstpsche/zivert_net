import { BrowserRouter } from "react-router-dom";
import Navbar from "./navbar";
import Routes from "./routes";
import AboutModal from "./modals/about_modal";

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Navbar />

        <div className="main-container container col-lg-7 col-md-10 col-sm-11 col-xs-auto">
          <Routes />
        </div>

        <AboutModal />
      </BrowserRouter>
    )
  }
}

export default App;
