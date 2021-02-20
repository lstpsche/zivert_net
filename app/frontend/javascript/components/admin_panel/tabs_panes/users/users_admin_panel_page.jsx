import { connect } from "react-redux";
import UsersTable from "./users_table/users_table";

class UsersAdminPanelPage extends React.Component {
  render () {
    const { users } = this.props;

    return (
      <UsersTable users={users} />
    )
  }
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(UsersAdminPanelPage);
