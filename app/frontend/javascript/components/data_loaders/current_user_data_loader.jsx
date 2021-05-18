import { connect } from "react-redux";
import { setCurrentUser } from "../../store/actions/current_user";
import { setFullPageBlock } from "../../store/actions/blocking";
import fetchLink from "../../helpers/fetch_link";

class CurrentUserDataLoader extends React.Component {
  fetchCurrentUser () {
    const { setCurrentUser, setFullPageBlock } = this.props;

    fetchLink({
      link: "/api/v1/current_user",
      onSuccess: ({ signed_in, user = { data: { attributes: {} }} }) => {
        setCurrentUser({ signed_in, ...user.data.attributes });
        setFullPageBlock(false);
      },
      errorMessage: I18n.t("errors.not_logged_in")
      // TODO: Add alertify call from onFailure: () => {...}
    });
  }

  componentDidMount () {
    this.fetchCurrentUser();
  }

  render () {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setFullPageBlock: (state) => dispatch(setFullPageBlock({ state }))
});

export default connect(undefined, mapDispatchToProps)(CurrentUserDataLoader);
