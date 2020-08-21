import { connect } from "react-redux";
import { hideAboutModal } from "../../store/actions/modals";
import ModalWindow from "./modal_window";

class AboutModal extends React.Component {
  renderModalBody () {
    return (
      <div id="about-modal-body">
        <p>
          { I18n.t("modals.about.body_html") }
        </p>
      </div>
    )
  }

  render () {
    const { showModal, hideModal } = this.props;

    return (
      <ModalWindow
        show={showModal}
        title={I18n.t("modals.about.title")}
        body={this.renderModalBody()}
        handleClose={hideModal}
        className="about-modal"
      />
    )
  }
}

const mapStateToProps = ({ modals: { about: { show } } }) => ({ showModal: show });

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideAboutModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutModal);
