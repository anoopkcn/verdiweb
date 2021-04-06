// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     fetch("/dbnodes")
//       .then((res) => res.json())
//       .then((data) => setData(data));
//   }, []);
//   console.log(data.uuid)

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         {/* <p>{!data ? "Loading..." : data}</p> */}
//       </header>
//     </div>
//   );
// }

// export default App;


// Electron modules are required using window.require()
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsInputCompositeIcon from "@material-ui/icons/SettingsInputComposite";
import BarChartIcon from "@material-ui/icons/BarChart";
import WbCloudyIcon from "@material-ui/icons/WbCloudy";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { ThemeProvider } from "@material-ui/styles";
import Modal from "react-modal";
import Dashboard from "./Dashboard";

const drawerWidth = 220;

const theme = createMuiTheme({
  palette: {
    secondary: { main: "#00a152" }
  },
  shadows: Array(25).fill("none")
});
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 20, // keep right padding when drawer closed
    backgroundColor: "#115293"
  },
  toolbarIcon: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1)
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8)
    }
  }
}));
const modalStyle = {
  content: {
    width: "80%",
    margin: "0 auto",
    position: "absolute",
    top: 40,
    left: 100,
    right: 40,
    bottom: 40,
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    padding: "0 20px 4px 20px",
    boxShadow: "1px 1px 2px 2px rgba(0, 0, 0, .2)",
    borderRadius: 5,
    overflow:'scroll',
  }
};
Modal.setAppElement("#root");
Modal.defaultStyles = modalStyle;
export default function App() {
  const [open, setOpen] = useState(false);
  const [isDashboard, setDashboard] = useState(true);

  const activeColor = isActive => {
    if (isActive) {
      return "primary";
    } else {
      return "disabled";
    }
  };

  const switchDashboard = () => {
    setDashboard(true);
  };

  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };
  let drawerState;
  if (open) {
    drawerState = (
      <IconButton onClick={handleDrawerClose}>
        <MenuOpenIcon fontSize="small" />
      </IconButton>
    );
  } else {
    drawerState = (
      <IconButton onClick={handleDrawerOpen}>
        <MenuIcon fontSize="small" />
      </IconButton>
    );
  }

  let windowView;
  windowView = <Dashboard />;

  return (
    <ThemeProvider theme={theme}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div className="App">
        <div className={classes.root}>
          <CssBaseline />
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              )
            }}
            open={open}
          >
            <List>
              <div>
                <ListItem button disableRipple={true} onClick={switchDashboard}>
                  <ListItemIcon>
                    <DashboardIcon color={activeColor(isDashboard)} />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button disableRipple={true}>
                  <ListItemIcon>
                    <BarChartIcon color="disabled" />
                  </ListItemIcon>
                  <ListItemText primary="Plots" />
                </ListItem>
                <ListItem button disableRipple={true}>
                  <ListItemIcon>
                    <WbCloudyIcon color="disabled" />
                  </ListItemIcon>
                  <ListItemText primary="Search" />
                </ListItem>
              </div>
            </List>
            <div className={classes.toolbarIcon}>{drawerState}</div>
          </Drawer>
          {windowView}
        </div>
      </div>
    </ThemeProvider>
  );
}
