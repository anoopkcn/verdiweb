import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Nodes from "./Nodes";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  title: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Nodes />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
