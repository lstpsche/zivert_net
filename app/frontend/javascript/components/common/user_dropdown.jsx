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
    return {
      title: this.dropdownTitle(),
      className: "btn nav-link",
      id: "user-dropdown"
    }
  }

  settingsButtonParams () {
    return {
      title: I18n.t("settings.profile.dropdown_title"),
      link: "/settings/profile",
      method: "GET",
      onClickCallback: this.hideMenu
    }
  }

  adminPanelButtonParams () {
    const { user: { admin } } = this.props;

    if (admin)
      return {
        title: I18n.t("admin_panel.user_dropdown_title"),
        link: "/admin_panel",
        method: "GET",
        onClickCallback: this.hideMenu
      }
  }

  signOutButtonParams () {
    return {
      title: I18n.t("devise.sessions.sign_out"),
      link: "/users/sign_out",
      method: "DELETE",
      onSuccessCallback: this.onSignOut
    }
  }

  clearEmptyValues (array) {
    return array.filter(el => el != null);
  }

  itemsList () {
    return this.clearEmptyValues([
      this.settingsButtonParams(),
      this.adminPanelButtonParams(),
      this.signOutButtonParams()
    ]);
  }
}

UserDropdown.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserDropdown;
