import React, { useEffect, useState, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import BallotIcon from "@material-ui/icons/Ballot";
import CastConnectedIcon from "@material-ui/icons/CastConnected";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import NodesTable from "./NodesTable";
import "./assets/css/animations.css";


const intervalRep = ["1s", "2s", "5s", "10s", "20s"];
// const dayList = ["1d", "2d", "3d", "5d", "300"];
const intervalTime = [1, 2, 5, 10, 20];
let db = true

const useStyles = makeStyles(theme => ({
  palette: {
    secondary: { main: "#11cb5f" }
  },
  root: {
    minHeight: 500,
    width: "100%",
    border: "1px solid rgba(0, 0, 0, .125)"
    // boxShadow: '0 0 0 0',
  },
  loading: {
    textAlign: "center",
    paddingTop: 132.5 // (minheight/2) - (iconSize/2)
  },
  toolbar: {
    width: "100%",
    backgroundColor: "#FAFAFA"
    // padding: theme.spacing(1, 2),
  },
  button: {
    margin: theme.spacing(0, 1, 0, 0)
  },

  intervalButton: {
    margin: theme.spacing(0.3, 0, 0, 0)
  }
}));

export default function Nodes() {
  const [data, setData] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const isRemoteDB = false

  //for split button
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [isIntervel, setTimeInterval] = useState(false);

  const classes = useStyles();

  var fetchInterval = 1000 * intervalTime[selectedIndex];

  const activeColor = isActive => {
    return isActive ? "secondary" : "disabled";
  };
  const activeColorButton = isActive => {
    if (isActive) return "secondary";
  };

  // const activateDatabase = () => {
  //   setDatabase(true);
  // };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setTimeInterval(true);
  };
  const switchInterval = () => {
    setTimeInterval(!isIntervel);
  };
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  async function fetchData() {
    fetch("/dbnodes")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoaded(true);
      });
  }

  useEffect(() => {
    // let didCancel = false;
    // let db = true;
    fetchData()
    if (isIntervel) {
      setInterval(() => {
        fetchData();
      }, fetchInterval);
    }

    // console.log(data)

  }, [fetchInterval, isIntervel]);

  let nodesTable;
  if (isLoaded && data) {
    if (!data.data) {
      nodesTable = <NodesTable data={data} detailsPanel={isIntervel} />;
    } else {
      nodesTable = (
        <div className={classes.loading}>
          <p>Switch on the live loading</p>
          <RotateRightIcon
            className="Loading"
            color="disabled"
            fontSize="large"
          />
        </div>
      );
    }
  } else {
    nodesTable = (
      <div className={classes.loading}>
        <p>Switch on the live loading</p>
        <RotateRightIcon
          className="Loading"
          color="disabled"
          fontSize="large"
        />
      </div>
    );
  }
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.toolbar}>
            <div className={classes.toolbarIcons}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <Button
                    disableRipple={true}
                    variant="outlined"
                    className={classes.button}
                  // onClick={activateDatabase}
                  >
                    <BallotIcon color={activeColor(db)} />
                  </Button>
                  <Button
                    disableRipple={true}
                    variant="outlined"
                  // onClick={activateRestAPI}
                  >
                    <CastConnectedIcon color={activeColor(isRemoteDB)} />
                  </Button>
                  {/* <ButtonGroup
                    disableRipple={true}
                    size="small"
                    className={classes.intervalButton}
                    color={activeColorButton(isIntervel)}
                    ref={anchorRef}
                    aria-label="split button"
                  >
                    <Button
                      disableRipple={true}
                      size="small"
                      onClick={switchInterval}
                    >
                      {dayList[selectedIndex]}
                    </Button>
                    <Button
                      disableRipple={true}
                      size="small"
                      color={activeColorButton(isIntervel)}
                      aria-owns={open ? "menu-list-grow" : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup> */}
                </Grid>

                {/* refresh interval */}
                <Grid item xs={2} align="right">
                  <ButtonGroup
                    disableRipple={true}
                    size="small"
                    className={classes.intervalButton}
                    color={activeColorButton(isIntervel)}
                    ref={anchorRef}
                    aria-label="split button"
                  >
                    <Button
                      disableRipple={true}
                      size="small"
                      onClick={switchInterval}
                    >
                      {intervalRep[selectedIndex]}
                    </Button>
                    <Button
                      disableRipple={true}
                      size="small"
                      color={activeColorButton(isIntervel)}
                      aria-owns={open ? "menu-list-grow" : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
              <Popper
                style={{ zIndex: 2000 }}
                size="small"
                open={open}
                anchorEl={anchorRef.current}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom"
                    }}
                  >
                    <Paper id="menu-list-grow">
                      <MenuList>
                        {intervalRep.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={event => handleMenuItemClick(event, index)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            {nodesTable}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
