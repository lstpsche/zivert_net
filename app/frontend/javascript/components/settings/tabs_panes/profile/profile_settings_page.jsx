import SettingsProfileForm from "./components/profile_settings_form";
import fetchLink from "../../../../helpers/fetch_link";

class ProfileSettingsPage extends React.Component {
  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit ({ firstName, lastName, username, currentPassword, failureCallback }) {
    fetchLink({
      link: "/users",
      method: "PUT",
      body: JSON.stringify({
        user: {
          first_name: firstName,
          last_name: lastName,
          username,
          current_password: currentPassword
        }
      }),
      onSuccess: ({ error }) => {
        if (error) {
          failureCallback({ error });
          return;
        }

        window.location.reload();
      }
    });
  }

  render () {
    return (
      <div className="profile-settings-page">
        <h2>
          { I18n.t("settings.profile.title") }
        </h2>

        <SettingsProfileForm
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default ProfileSettingsPage;
