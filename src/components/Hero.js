import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '500px',

    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: '50px',
    padding: '10px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gridItem: {
    backgroundColor: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hero: { display: 'flex', flexDirection: 'column' },
  cta: {
    zIndex: '100',
  },
  header: {
    color: '#fff',
  },
  slogan: {
    color: 'rgba(245, 246, 255, 0.88)',

    fontWeight: 'light',
  },
  button: {
    borderRadius: '25px',
    margin: '20px',
    paddingLeft: '40px',
    paddingRight: '40px',
    boxShadow: 'none',
    '&:hover': {
      background: 'rgba(245, 246, 255, 0.88)',
      color: 'inherit',
    },
  },
}));
export default function Hero() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={`${classes.gridItem} ${classes.hero}`}>
        <Typography className={classes.header} variant="h1" gutterBottom>
          DontoHub
        </Typography>
        <Typography className={classes.slogan} variant="subtitle1" gutterBottom>
          The ultimate solution for managing your dental office
          <br />
          with a brain friendly UI easy controlling
        </Typography>
        <div>
          <Button
            className={`${classes.button}`}
            variant="contained"
            size="medium"
            color="secondary"
            component={RouterLink}
            to="/pricing"
          >
            See Pricing
          </Button>
          <Button
            className={`${classes.button}`}
            variant="contained"
            size="medium"
            color="secondary"
            component={RouterLink}
            to="/tutorial"
          >
            See a Tutorial
          </Button>
        </div>
      </div>
      <div className={`${classes.gridItem} ${classes.cta}`}>
        <Button
          className={`${classes.button}`}
          variant="contained"
          size="large"
          color="secondary"
          component={RouterLink}
          to="/login"
        >
          Login
        </Button>
        <Button
          className={`${classes.button}`}
          variant="contained"
          size="large"
          color="secondary"
          component={RouterLink}
          to="/signup"
        >
          Signup
        </Button>
      </div>
    </div>
  );
}
