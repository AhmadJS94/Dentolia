import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '2em',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      //   justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  },
  card: {
    width: '300px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1em',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: '1em',
    fontWeight: 'bolder',
  },
  cardTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '1em',
    alignSelf: 'center',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
  },
}));
export default function WhyDontoHub() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h4">
        Why DontoHub ?
      </Typography>
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.cardTitle} variant="h6">
              Smart Software
            </Typography>
            <Typography style={{ textAlign: 'center' }} variant="subtitle1">
              lorem Ipsum sit amet bla bla bla ? ok deal lorem Ipsum sit amet
              bla bla bla ? ok deal lorem Ipsum sit amet bla bla bla ? ok deal
              lorem Ipsum sit amet bla bla bla ? ok deal
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.cardTitle} variant="h6">
              Smart Software
            </Typography>
            <Typography style={{ textAlign: 'center' }} variant="subtitle1">
              lorem Ipsum sit amet bla bla bla ? ok deal lorem Ipsum sit amet
              bla bla bla ? ok deal lorem Ipsu
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.cardTitle} variant="h6">
              Smart Software
            </Typography>
            <Typography style={{ textAlign: 'center' }} variant="subtitle1">
              lorem Ipsum sit amet bla bla bla ? ok deal lorem Ipsum sit amet
              bla bla bla ? ok deal lorem Ipsu
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
