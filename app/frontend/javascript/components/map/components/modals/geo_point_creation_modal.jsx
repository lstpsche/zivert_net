import ModalWindow from "./modal_window";

class GeoPointCreationModal extends React.Component {
  render () {
    const { show, onClose } = this.props;

    return (
      <ModalWindow
        show={show}
        title="title here"
        body="body here"
        handleClose={onClose}
      />
    )
  }
}

export default GeoPointCreationModal;
