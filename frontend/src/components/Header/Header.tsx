import React, { useState, MouseEvent } from "react";
import { AppBar, Toolbar, IconButton, Menu } from "@material-ui/core";
import { Menu as MenuIcon, Person as AccountIcon, ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import classNames from "classnames";
import useStyles from "./styles";
import logo from "./logo.jpg";
import { Typography } from "../../components/Wrappers/Wrappers";
import store from "../../store/store";
import { layoutActions, userActions } from "../../actions/allActions";

export default function Header() {
  const classes = useStyles();
  const [profileMenu, setProfileMenu]: any = useState(null);  
  const [isSidebarOpened, setSidebarOpened] = useState(true);

  store.subscribe(() => setSidebarOpened(!store.getState().layout.isSidebarOpened));

  const callToggleSidebar = () => store.dispatch(layoutActions.toggleSidebar());
  const callLogout = () => {
    localStorage.removeItem("user");
    store.dispatch(userActions.logoutSuccess());
  };

  const userLocalstorage = localStorage.getItem('user') || '{ username: "" }';
  const user = JSON.parse(userLocalstorage);
  const usernameSplit = user.username.split('.');
  const name = `${usernameSplit[0].charAt(0).toUpperCase()}${usernameSplit[0].slice(1)}`;
  const surname = usernameSplit.length > 1 ? `${usernameSplit[1].charAt(0).toUpperCase()}${usernameSplit[1].slice(1)}` : "";

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div>
          <IconButton
            color="inherit"
            onClick={callToggleSidebar}
            className={classNames(
              classes.headerMenuButton,
              classes.headerMenuButtonCollapse,
            )}
          >
            {isSidebarOpened ? (
              <ArrowBackIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            ) : (
              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            )}
          </IconButton>        
        </div> 
        
        <div className={classes.menuTitle}>
          <img src={logo} alt="ITM" className={classes.logotypeImage} />
          <div className={classes.logotypeTypografyContainer}>
            <Typography variant="h4" weight="bold" className={classes.logotypeTextScan}>&nbsp;ITM</Typography>
          </div>
        </div> 
        
        <div>
          <IconButton
            aria-haspopup="true"
            color="inherit"
            className={classes.headerMenuButton}
            aria-controls="profile-menu"
            onClick={(e: MouseEvent<HTMLButtonElement>) => setProfileMenu(e.currentTarget)}
          >
            <AccountIcon classes={{ root: classes.headerIcon }} />
          </IconButton>
          <Menu
            id="profile-menu"
            open={Boolean(profileMenu)}
            anchorEl={profileMenu}
            onClose={() => setProfileMenu(null)}
            className={classes.headerMenu}
            classes={{ paper: classes.profileMenu }}
            disableAutoFocusItem
          >
            <div className={classes.profileMenuUser}>
              <Typography variant="h4" weight="medium">
                { `${name} ${surname}` }
              </Typography>
            </div>          
            <div className={classes.profileMenuUser}>
              <Typography
                className={classes.profileMenuLink}
                color="primary"
                onClick={callLogout}
              >
                Cerrar sesión
              </Typography>
            </div>
          </Menu>
        </div>         
      </Toolbar>
    </AppBar>
  );
}
