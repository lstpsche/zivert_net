import Dropdown from "./dropdown/dropdown";

class UserDropdown extends Dropdown {
  dropdownTitle () {
    const { user: { firstName, lastName, nickname } } = this.props;

    const fullName = [firstName, lastName].join(" ");

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

  itemsList () {
    return [
      {
        title: I18n.t("settings.profile.dropdown_title"),
        link: "/settings/profile",
        method: "GET",
        onClickCallback: this.hideMenu
      },
      {
        title: I18n.t("devise.sessions.sign_out"),
        link: "/users/sign_out",
        method: "DELETE",
        onSuccessCallback: this.onSignOut
      }
    ];
  }
}

UserDropdown.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserDropdown;
