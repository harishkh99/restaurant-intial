import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Filter from '@material-ui/icons/FilterList';
import Refresh from '@material-ui/icons/Refresh';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends React.Component {
    state = {
        anchorEl: null
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });

    };

    reFetchRestaurants = () => {
        return this.props.fetchRestaurants(this.props.currentLocation);
    }


    handleClose = (newRadius) => {
        this.setState({ anchorEl: null });
        this.props.changeRadius(newRadius)
    };

    getTitleByLocation = (location, area) => {
        if (location === "/")
            return "Get the Location ";
        else if (location === "/restaurants") {
            if (area)
                return (<div>Restaurants in <Link to='/' style={{ color: '#FFF' }}>{area || "un-known"}</Link></div>);
            else
                return (<div>Restaurants in <CircularProgress size={20} style={{ color: '#FFF' }} />
                </div>);
        }
        else
            return "Restaurants ";
    }
    render() {
        const { classes, location, area } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {
                                this.getTitleByLocation(location.pathname, area)
                            }
                        </Typography>
                        {location.pathname === "/restaurants" &&
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={this.reFetchRestaurants}
                                >
                                    <Refresh />
                                </IconButton>

                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <Filter />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={() => { this.handleClose(5000) }}>5 Miles</MenuItem>
                                    <MenuItem onClick={() => { this.handleClose(10000) }}>10 Miles</MenuItem>
                                </Menu>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);