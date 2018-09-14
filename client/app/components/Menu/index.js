import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        {this.props.children(this.handleClick)}
        <Menu
          className="mt-3"
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.menus.map(menu => (
            <MenuItem
              key={menu.name}
              onClick={() => {
                menu.onClick();
                this.handleClose();
              }}
            >
              {menu.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
