import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
        <IconButton
          style={{
            marginLeft: -18,
            marginRight: 10,
          }}
          color="inherit"
          aria-label="Menu"
          onClick={this.handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
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
