import UserTableRow from "./user_table_row";

class UsersTable extends React.Component {
  renderTableHeaders () {
    return (
      <tr>
        <th>{ I18n.t("admin_panel.tabs.users.table.headers.id") }</th>
        <th>{ I18n.t("admin_panel.tabs.users.table.headers.first_name") }</th>
        <th>{ I18n.t("admin_panel.tabs.users.table.headers.last_name") }</th>
        <th>{ I18n.t("admin_panel.tabs.users.table.headers.username") }</th>
        <th>{ I18n.t("admin_panel.tabs.users.table.headers.nickname") }</th>
      </tr>
    )
  }

  renderUsersRows (users) {
    return (
      users.sort((user1, user2) => {
        return user1.id - user2.id
      }).map(user => {
        return <UserTableRow key={"user-" + user.id + "-key"} user={user} />
      })
    );
  }

  render () {
    const { users } = this.props;

    return (
      <table className="table users-table">
        <thead>
          { this.renderTableHeaders() }
        </thead>

        <tbody>
          { this.renderUsersRows(users) }
        </tbody>
      </table>
    )
  }
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
}

export default UsersTable;
