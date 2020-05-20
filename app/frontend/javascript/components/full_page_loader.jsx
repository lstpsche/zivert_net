import { connect } from "react-redux";
import Loader from "./common/loader";

class FullPageLoader extends React.Component {
  blockClassName () {
    const { blocked } = this.props;

    if (!blocked)
      return "hidden"
  }

  render () {
    const { blocked } = this.props;

    return (
      <BlockUi
        tag="div"
        id="full-page-loader"
        className={"full-page-cover " + this.blockClassName()}
        blocking={blocked}
        loader={<Loader />}
        keepInView
      />
    )
  }
}

const mapStateToProps = ({ blocking: { fullPage } }) => ({ blocked: fullPage });

export default connect(mapStateToProps)(FullPageLoader);
