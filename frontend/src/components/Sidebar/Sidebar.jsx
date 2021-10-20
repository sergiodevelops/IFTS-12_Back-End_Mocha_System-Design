import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { Home as HomeIcon, ArrowBack as ArrowBackIcon, School, MenuBook, People, PeopleOutline, LocalLibrary, GroupAddSharp } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import useStyles from "./styles";
import SidebarLink from "../../components/Sidebar/components/SidebarLink/SidebarLink";
import store from "../../store/store";
import { layoutActions } from "../../actions/allActions";

const structure = [
  { id: 0, label: "Dashboard", link: "/ifts/dashboard", icon: <HomeIcon /> },
  { id: 1, label: "Carreras", link: "/ifts/carreras", icon: <School /> },
  { id: 2, label: "Materias", link: "/ifts/materias", icon: <MenuBook /> },  
  { id: 3, label: "Alumnos", link: "/ifts/alumnos", icon: <People /> },  
  { id: 4, label: "Docentes", link: "/ifts/docentes", icon: <PeopleOutline /> },  
  { id: 5, label: "Carreras/Materias", link: "/ifts/carreras_materias", icon: <AccountTreeIcon /> },  
  { id: 6, label: "Cursos", link: "/ifts/cursos", icon: <LocalLibrary /> },  
  { id: 7, label: "Cursos/Alumnos", link: "/ifts/cursos_alumnos", icon: <GroupAddSharp /> },  
];

function Sidebar({ location }) {
  const classes = useStyles();
  const theme = useTheme();
  
  const [isPermanent, setPermanent] = useState(true);
  const [isSidebarOpened, setSidebarOpened] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  store.subscribe(() => {
    setSidebarOpened(!store.getState().layout.isSidebarOpened);
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => store.dispatch(layoutActions.toggleSidebar())}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) setPermanent(false);
    else if (!isSmallScreen && !isPermanent) setPermanent(true);
  }
}

export default withRouter(Sidebar);
