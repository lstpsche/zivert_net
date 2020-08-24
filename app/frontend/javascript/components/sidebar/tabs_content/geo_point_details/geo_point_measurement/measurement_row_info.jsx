import { connect } from "react-redux";
import { BsX } from "react-icons/bs";

class MeasurementRowInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      removeConfirmationShowed: false
    }

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.showRemoveConfirmation = this.showRemoveConfirmation.bind(this);
    this.hideRemoveConfirmation = this.hideRemoveConfirmation.bind(this);
    this.measurementDetails = this.measurementDetails.bind(this);
  }

  measurementAuthor () {
    const { users, measurement: { userId } } = this.props;

    return users.find(user => user.id === userId);
  }

  authorFullName ({ firstName = "", lastName = "", nickname }) {
    if (firstName.length === 0 && lastName.length === 0)
      return nickname;

    return `${firstName} ${lastName}`.trim() + ` (@${nickname})`;
  }

  isAuthor (measurementAuthorId) {
    const { currentUserId, isAdmin } = this.props;

    return (isAdmin || currentUserId === measurementAuthorId)
  }

  handleRemoveClick () {
    const { onRemoveCallback } = this.props;
    const { removeConfirmationShowed } = this.state;

    if (removeConfirmationShowed)
      onRemoveCallback();
    else
      this.showRemoveConfirmation();
  }

  showRemoveConfirmation () {
    this.setState({ removeConfirmationShowed: true }, () => {
      document.addEventListener("click", this.hideRemoveConfirmation);
    });
  }

  hideRemoveConfirmation (event) {
    if (event === undefined || !this.measurementRow.contains(event.target))
      this.setState({ removeConfirmationShowed: false }, () => {
        document.removeEventListener("click", this.hideRemoveConfirmation)
      });
  }

  renderActionButtons () {
    const { removeConfirmationShowed } = this.state;

    return (
      <div className={ "measurement-action-buttons" + (removeConfirmationShowed ? " remove-confirmation" : "") }>
        <BsX
          className="delete-button"
          size={15}
          onClick={this.handleRemoveClick}
        />
      </div>
    )
  }

  measurementDetails () {
    const user = this.measurementAuthor();
    const { measurement: { comment } } = this.props;

    return (
      <div>
        <div className="measurement-author-info">{ this.authorFullName(user) }</div>
        <div className="measurement-comment">{ comment }</div>
      </div>
    )
  }

  measurementRemoveConfirmation () {
    return (
      <div className="remove-confirmation">
        <div className="remove-confirmation-text">
          Click again to delete this measurement.
        </div>
      </div>
    )
  }

  render () {
    const { measurement: { userId, value } } = this.props;
    const { removeConfirmationShowed } = this.state;

    return (
      <div ref={(el) => this.measurementRow = el} className="measurement-row info">
        <div className="measurement-value-container">
          <span className="measurement-value">{ value }</span>
        </div>

        <div className={ "measurement-details" + (removeConfirmationShowed ? " remove-confirmation" : "") }>
          {
            removeConfirmationShowed
            ? this.measurementRemoveConfirmation()
            : this.measurementDetails()
          }
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
