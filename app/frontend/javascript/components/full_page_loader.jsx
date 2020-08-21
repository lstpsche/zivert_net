import { connect } from "react-redux";
import Loader from "./common/loader";

class FullPageLoader extends React.Component {
  blockClassName () {
    const { blocked } = this.props;

    if (!blocked)
      return "hidden"
  }

  render () {
    const { blocked, blockMessage } = this.props;

    return (
      <BlockUi
        tag="div"
        id="full-page-loader"
        className={"full-page-cover " + this.blockClassName()}
        blocking={blocked}
        loader={<Loader />}
        message={<div className="loader-message">{ blockMessage }</div>}
        keepInView
      />
    )
  }
}

const mapStateToProps = ({ blocking: { fullPage: { state, blockMessage } } }) => ({ blocked: state, blockMessage });

export default connect(mapStateToProps)(FullPageLoader);
