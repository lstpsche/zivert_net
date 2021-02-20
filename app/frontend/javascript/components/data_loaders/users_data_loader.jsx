import { connect } from "react-redux";
import { setUsers } from "../../store/actions/users";
import { setFullPageBlock } from "../../store/actions/blocking";
import fetchLink from "../../helpers/fetch_link";

class UsersDataLoader extends React.Component {
  fetchUsers () {
    fetchLink({
      link: "/api/v1/users",
      onSuccess: (response) => {
        this.props.setUsers(
          response.users.map(({ data: { attributes: { id, first_name: firstName, last_name: lastName, username, nickname, admin } } }) => (
            { id, firstName, lastName, username, nickname, admin }
          ))
        )
      },
      onFailure: (error) => {
        // TODO: add parsing of internal server errors
        throw new Error(error);
      },
      onComplete: () => this.props.setFullPageBlock(false)
    })
  }

  componentDidMount () {
    this.props.setFullPageBlock(true);
    this.fetchUsers();
  }

  render () {
    return null
  }
}

const mapDispatchToProps = dispatch => ({
  setUsers: (users) => dispatch(setUsers(users)),
  setFullPageBlock: (state) => dispatch(setFullPageBlock({ state }))
});

export default connect(undefined, mapDispatchToProps)(UsersDataLoader);
