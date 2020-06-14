import { connect } from "react-redux";

class MeasurementRowInfo extends React.Component {
  measurementAuthor () {
    const { users, measurement: { userId } } = this.props;

    return users.find(user => user.id === userId);
  }

  authorFullName ({ firstName = "", lastName = "", nickname }) {
    if (firstName.length === 0 && lastName === 0)
      return nickname;

    return `${firstName} ${lastName}`.trim() + `(@${nickname})`;
  }

  render () {
    const { measurement: { value, comment } } = this.props;
    const user = this.measurementAuthor();

    return (
      <div className="measurement-row-info">
        <div className="measurement-value">
          { value }
        </div>

        <div className="measurement-details">
          <div className="measurement-author-info">
            { this.authorFullName(user) }
          </div>

          <div className="measurement-comment">
            { comment }
          </div>
        </div>
      </div>
    )
  }
}

MeasurementRowInfo.propTypes = {
  measurement: PropTypes.object.isRequired
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(MeasurementRowInfo);
