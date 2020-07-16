import React from 'react';
import { Typography, Button, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';
import HeroBackground from '../vectors/HeroBackground';

const useStyles = makeStyles(theme => ({
  root: {
    // height: 'auto',
    width: '100%',
    marginTop: '2em',
    marginBottom: '4em',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '2em',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  hero: {
    backgroundColor: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    // height: '2em',
  },
  svg: {
    paddingTop: '2em',
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
    // paddingRight: '50px',
    [theme.breakpoints.down('xs')]: {
      height: '100px',
      justifyContent: 'center',
      paddingLeft: '0',
      // paddingRight: '100px',
      paddingBottom: '0px',
      // marginLeft: '150px',
    },
  },
  svgBox: {
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2em',
    paddingBottom: '2em',
    paddingLeft: '50px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  cta: {
    zIndex: '100',
  },
  header: {
    color: '#e9edf2',
    fontSize: '5vw',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '6.6vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '13vw',
    },
    ['@media (max-width:300px)']: {
      fontSize: '15vw',
    },
  },
  slogan: {
    color: 'rgba(245, 246, 255, 0.88)',
    fontSize: '1vw',
    fontWeight: 'light',
    textAlign: 'center',
    // [theme.breakpoints.up('md')]: {
    //   fontSize: '1.5vw',
    // },
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.3vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '3vw',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4.8vw',
    },
    ['@media (max-width:300px)']: {
      fontSize: '6vw',
    },
  },
  button: {
    borderRadius: '25px',
    margin: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',
    boxShadow: 'none',
    '&:hover': {
      background: 'rgba(245, 246, 255, 0.88)',
      color: 'inherit',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));
export default function Hero() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        className={`${classes.gridItem} ${classes.hero}`}
      >
        <Grid container>
          <Grid
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            xs={12}
            item
          >
            <Typography className={classes.header} variant="h2" gutterBottom>
              Small Software, <br />
              Big Impact
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={classes.slogan}
              variant="subtitle1"
              gutterBottom
            >
              The ultimate solution for managing your dental office
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        className={`${classes.gridItem} ${classes.svg}`}
      >
        <Button className={classes.button}>Signup</Button>
        <Button className={classes.button}>Login</Button>
        <div className={classes.svgBox}>
          <HeroBackground />
        </div>
      </Grid>
    </Grid>
  );
}
