import { connect } from "react-redux";
import { addUser, updateUser, removeUser } from "../../store/actions/users";
import BaseChannel from "./base_channel";

class UsersChannel extends BaseChannel {
  constructor (props) {
    super(props);

    const { addUser, updateUser, removeUser } = this.props;

    this.channel = {
      name: "UsersChannel",
      onReceiveActions: {
        create: [addUser],
        update: [updateUser],
        delete: [removeUser]
      }
    };
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: ({ user }) => dispatch(addUser(user.data)),
  updateUser: ({ user }) => dispatch(updateUser(user.data)),
  removeUser: ({ user }) => dispatch(removeUser(user.data))
});

export default connect(undefined, mapDispatchToProps)(UsersChannel);
