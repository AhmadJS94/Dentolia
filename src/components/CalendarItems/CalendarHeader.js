import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  TextField,
  IconButton,
  Button,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
const useStyles = makeStyles(theme => ({
  container: {
    padding: '15px',
    border: '1px solid #666',
  },
  arrows: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSide: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  leftArrow: {
    padding: '3px',
  },
  rightArrow: { padding: '3px' },
  targets: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
}));
export default function CalendarHeader() {
  const classes = useStyles();
  return (
    <Grid className={classes.container} container>
      <Grid className={classes.leftSide} item xs={6}>
        <div className={classes.leftArrow}>
          <IconButton size="small">
            <ArrowBackIosIcon size="small" />
          </IconButton>
        </div>
        <div className={classes.rightArrow}>
          <IconButton size="small">
            <ArrowForwardIosIcon size="small" />
          </IconButton>
        </div>
        <div>
          <Button>July 2020</Button>
        </div>
      </Grid>
      <Grid item xs={6} className={classes.targets}>
        <Button style={{ borderRight: '1px solid #777' }}>TODAY</Button>
        <Button>DAY</Button>
        <Button>WEEK</Button>
        <Button>WORKWEEK</Button>
        <Button>MONTH</Button>
      </Grid>
    </Grid>
  );
}
