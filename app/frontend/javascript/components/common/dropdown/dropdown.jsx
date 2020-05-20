import DropdownItem from "./dropdown_item";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showMenu: false }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  toggleMenu (state) {
    this.setState({ showMenu: state }, () => {
      if (state)
        document.addEventListener("click", this.closeMenu);
      else
        document.removeEventListener("click", this.closeMenu);
    })
  }

  renderItems (items) {
    var menu = [];

    items.forEach((item, index) => {
      menu.push(
        <DropdownItem key={index} item={item} />
      )
    });

    return menu;
  }

  render () {
    const { header, items } = this.props;
    const { showMenu } = this.state;

    return (
      <div className="dropdown mr-2">
        <button
          className={"dropdown-header dropdown-toggle " + header.className}
          id={header.id}
          onClick={() => this.toggleMenu(!showMenu)}
        >
          {header.title}
        </button>

        {
          showMenu
            ? (
              <div className="dropdown-menu show">
                { this.renderItems(items) }
              </div>
            )
            : null
        }
      </div>
    )
  }
}

Dropdown.propTypes = {
  header: PropTypes.object,
  // {
  //   title: PropTypes.string,
  //   className: PropTypes.string,
  //   id: PropTypes.string
  // },
  items: PropTypes.array
  // [{
  //   title: PropTypes.string,
  //   link: PropTypes.string,
  //   method: PropTypes.string,
  //   className: PropTypes.string,
  //   onClickCallback: PropTypes.func
  // }]
}

Dropdown.defaultProps = {
  header: {
    title: "Dropdown title",
    className: "",
    id: ""
  },
  items: [{}]
}

export default Dropdown;
