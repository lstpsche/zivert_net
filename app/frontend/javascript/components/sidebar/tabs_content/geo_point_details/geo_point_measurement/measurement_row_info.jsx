import { connect } from "react-redux";
import { BsX } from "react-icons/bs";

class MeasurementRowInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRemoveConfirmation: false
    }

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  measurementAuthor () {
    const { users, measurement: { userId } } = this.props;

    return users.find(user => user.id === userId);
  }

  authorFullName ({ firstName = "", lastName = "", nickname }) {
    if (firstName.length === 0 && lastName === 0)
      return nickname;

    return `${firstName} ${lastName}`.trim() + ` (@${nickname})`;
  }

  isAuthor (measurementAuthorId) {
    const { currentUserId, isAdmin } = this.props;

    return (isAdmin || currentUserId === measurementAuthorId)
  }

  handleRemoveClick () {
    const { onRemoveCallback } = this.props;
    const { showRemoveConfirmation } = this.state;

    if (showRemoveConfirmation)
      onRemoveCallback();
    else
      this.setState({showRemoveConfirmation: true});
  }

  renderActionButtons () {
    const { measurement: { id: measurementId } } = this.props;

    return (
      <div className="measurement-action-buttons">
        <BsX
          className="delete-button"
          size={15}
          onClick={this.handleRemoveClick}
        />
      </div>
    )
  }

  // TODO: uncomment after implementing removal confirmation popup
  // componentDidMount() {
  //   const { showRemoveConfirmation } = this.state;
  //
  //   if (showRemoveConfirmation) {
  //     document.addEventListener("click", this.hideRemoveConfirmation);
  //   }
  // }
  //
  // componentWillUnmount() {
  //   document.removeEventListener("click", this.hideRemoveConfirmation);
  // }

  render () {
    const { measurement: { userId, value, comment } } = this.props;
    const user = this.measurementAuthor();

    return (
      <div className="measurement-row info">
        <div className="measurement-value-container">
          <span className="measurement-value">{ value }</span>
        </div>

        <div className="measurement-details">
          <div className="measurement-author-info">{ this.authorFullName(user) }</div>
          <div className="measurement-comment">{ comment }</div>
        </div>

        {
          this.isAuthor(userId)
          ? this.renderActionButtons()
          : null
        }
      </div>
    )
  }
}

MeasurementRowInfo.propTypes = {
  measurement: PropTypes.object.isRequired,
  onRemoveCallback: PropTypes.func
}

const mapStateToProps = ({ currentUser: { id, admin }, users }) => ({ currentUserId: id, isAdmin: admin, users });

export default connect(mapStateToProps)(MeasurementRowInfo);
