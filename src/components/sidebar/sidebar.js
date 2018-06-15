import React from 'react';
import { clearAuth } from "../actions/auth";
import { connect } from "react-redux";
import { clearAuthToken } from "../../local-storage";
import requiresLogin from "../../requires-login";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Home from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import SettingsPower from '@material-ui/icons/SettingsPower';
import Hidden from '@material-ui/core/Hidden';
import './sidebar.css';
const drawerWidth = 200;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


export class SideBar extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
    this.props.history.push("/");
  }
  onClickHome(){
    this.props.history.push("/dashboard");
  };
  onClickSettings(){
    this.props.history.push("/settings");
  }

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
          <div className="list-menu-icon" onClick={()=> this.onClickHome()}><Home style={{fontSize: '58px'}}/> Home</div>          
          <Divider/>
            <div className="list-menu-icon" onClick={()=> this.onClickSettings()}><Settings style={{fontSize: '58px'}}/> Settings</div>
          <Divider/>
            <div className="list-menu-icon" onClick={() => this.logOut()}><SettingsPower style={{fontSize: '58px'}}/> LogOut</div>
      </div>
    );
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >

          <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Hello {this.props.name}!
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

    
    const mapStateToProps = state => {
     const { currentUser } = state.auth;
      return {
        loggedIn: state.auth.currentUser !== null,
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        id: `${currentUser.id}`
      };
    
    };
    export {styles};
  SideBar = withStyles(styles, { withTheme: true })(SideBar);
    export default requiresLogin()(connect(mapStateToProps)(withRouter(SideBar)));
    