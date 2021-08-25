import React, { FC, ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

// app routes
import { routes } from "./config";

// constants
import { APP_TITLE } from "./utils/constants";

// interfaces
import RouteItem from './model/RouteItem.model';
import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


// define app context
const AppContext = React.createContext(null);

// default component
const DefaultComponent: FC<{}> = (): ReactElement => (
  <div>{`No Component Defined.`}</div>
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appbar: {
      marginBottom: "20px"
    }
  }),
);

function App() {

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <AppContext.Provider value={null}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <HomeWorkIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Vaccination Appointment
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Router>
            <Switch>
              <Grid item xs={12}>
                {

                  routes.map((route: RouteItem) => (
                    <Route
                      key={`${route.key}`}
                      path={`${route.path}`}
                      component={route.component || DefaultComponent}
                      exact
                    />
                  ))
                }
              </Grid>
            </Switch>
          </Router>
        </Grid>
      </AppContext.Provider>
    </>
  );
}

export default App;