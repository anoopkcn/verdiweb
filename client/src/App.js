import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import Modal from "react-modal";
import Dashboard from "./Dashboard";

const theme = createMuiTheme({
  palette: {
    secondary: { main: "#00a152" }
  },
  shadows: Array(25).fill("none")
});
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
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
    overflow: 'scroll',
  }
};
Modal.setAppElement("#root");
Modal.defaultStyles = modalStyle;

export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className={classes.root}>
          <CssBaseline />
          <Dashboard />
        </div>
      </div>
    </ThemeProvider>
  );
}
