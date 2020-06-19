import { connect } from "react-redux";

class MeasurementRowInfo extends React.Component {
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

  renderActionButtons () {
    return (
      <div className="measurement-action-buttons">
        <div className="delete-button">
          {/* fa-icon with cross here */}
        </div>

        <div className="edit-button">
          {/* fa-icon with pen here */}
        </div>
      </div>
    )
  }

  render () {
    const { measurement: { userId, value, comment } } = this.props;
    const user = this.measurementAuthor();

    return (
      <div className="measurement-row-info">
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
  measurement: PropTypes.object.isRequired
}

const mapStateToProps = ({ currentUser: { id, admin }, users }) => ({ currentUserId: id, isAdmin: admin, users });

export default connect(mapStateToProps)(MeasurementRowInfo);
