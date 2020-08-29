import DropdownItem from "./dropdown_item";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showMenu: false }

    this.handleClick = this.handleClick.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);

    this.renderMenu = this.renderMenu.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  handleClick () {
    const { showMenu } = this.state;

    if (showMenu)
      this.hideMenu();
    else
      this.showMenu();
  }

  hideMenu (event) {
    if (event === undefined || !this.dropdownContainer.contains(event.target))
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.hideMenu);
      });
  }

  showMenu () {
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.hideMenu);
    });
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

  renderMenu () {
    const { items } = this.props;
    const { showMenu } = this.state;

    return (
      showMenu
        ? (
          <div className="dropdown-menu show">
            {this.renderItems(items)}
          </div>
        )
        : null
    )
  }

  render () {
    const { header } = this.props;

    return (
      <div
        ref={(el) => this.dropdownContainer = el}
        className="dropdown mr-2"
      >
        <button
          className={"dropdown-header dropdown-toggle " + header.className}
          id={header.id}
          onClick={this.handleClick}
        >
          { header.title }
        </button>

        { this.renderMenu() }
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
