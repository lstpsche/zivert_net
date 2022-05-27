import { connect } from "react-redux";
import { BsX } from "react-icons/bs";
import { RiBaseStationFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';

class MeasurementRowInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      removeConfirmationShowed: false
    }

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.showRemoveConfirmation = this.showRemoveConfirmation.bind(this);
    this.hideRemoveConfirmation = this.hideRemoveConfirmation.bind(this);
    this.removeRemovalConfirmationEventListener = this.removeRemovalConfirmationEventListener.bind(this);
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

  handleRemoveClick () {
    const { onRemoveCallback } = this.props;
    const { removeConfirmationShowed } = this.state;

    if (removeConfirmationShowed) {
      this.removeRemovalConfirmationEventListener();
      onRemoveCallback();
    } else
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
        this.removeRemovalConfirmationEventListener();
      });
  }

  // TODO: rethink and rewrite listeners logic for the whole app. Better store listeners somewhere and enable/disable them with needed params when needed.
  removeRemovalConfirmationEventListener () {
    document.removeEventListener("click", this.hideRemoveConfirmation);
  }

  staticClassName () {
    const { measurement: { isStatic } } = this.props;

    return isStatic ? " station-measurement" : null;
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
      <div className="measurement-details">
        <div className="measurement-author-info">{ this.authorFullName(user) }</div>
        <EllipsisWithTooltip placement="bottom">
          <div className="measurement-comment">{ comment }</div>
        </EllipsisWithTooltip>
      </div>
    )
  }

  render () {
    const { valueUnits } = this.props;
    const { measurement: { ["value_" + valueUnits]: measurementValue }, clickEvent } = this.props;

    return (
      <div ref={(el) => this.measurementRow = el} className={"measurement-row info" + this.staticClassName()} onClick={clickEvent}>
        <div className="measurement-value-container">
          <span className="measurement-value">{ measurementValue }</span>
        </div>

        { this.measurementDetails() }

        <IconContext.Provider value={{ style: { height: '100%', width: "1em" } }}>
          <div className="station-measurement-icon">
            <RiBaseStationFill />
          </div>
        </IconContext.Provider>
      </div>
    )
  }
}

MeasurementRowInfo.propTypes = {
  measurement: PropTypes.object.isRequired,
  clickEvent: PropTypes.func.isRequired
}

const mapStateToProps = ({
  currentUser: { id: currentUserId, admin: isAdmin },
  mainMap: { settings: { units: valueUnits } },
  users
}) => ({
  currentUserId, isAdmin,
  valueUnits,
  users
});

export default connect(mapStateToProps)(MeasurementRowInfo);
