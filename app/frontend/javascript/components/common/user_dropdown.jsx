import Dropdown from "./dropdown/dropdown";

class UserDropdown extends React.Component {
  constructor (props) {
    super(props);

    this.onSignOut = this.onSignOut.bind(this);
  }

  dropdownTitle () {
    const { user: { firstName, lastName, nickname } } = this.props;

    var fullName = [firstName, lastName].join(" ");

    if (fullName === " ")
      return nickname;

    return fullName;
  }

  onSignOut () {
    window.location.reload();
  }

  renderHeader () {
    return (
      {
        title: this.dropdownTitle(),
        className: "btn nav-link",
        id: "user-dropdown"
      }
    )
  }

  renderItemsList () {
    return [
      {
        title: I18n.t("devise.registrations.edit"),
        link: "/users/edit",
        method: "GET"
      },
      {
        title: I18n.t("devise.sessions.sign_out"),
        link: "/users/sign_out",
        method: "DELETE",
        onClickCallback: this.onSignOut
      }
    ];
  }

  render () {
    return (
      <Dropdown
        header={this.renderHeader()}
        items={this.renderItemsList()}
      />
    )
  }
}

UserDropdown.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserDropdown;
