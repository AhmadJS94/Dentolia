import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Typography, Paper, Toolbar, Divider } from '@material-ui/core/';
import ToothInfo from './ToothInfo';

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '300px',
    overflowY: 'auto',
  },

  toolbar: {
    minHeight: '47px',
    display: 'flex',
    justifyContent: 'space-around',
    // padding: '16px',
  },
}));

export default function ToothHistory({ selectedTooth, _id }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          style={{ fontSize: '1.5em', fontWeight: 'bold' }}
        >
          Tooth History
        </Typography>
      </Toolbar>
      <Divider />
      <div style={{ position: 'relative' }}>
        {!selectedTooth && <Typography variant="h3">Select a tooth</Typography>}

        {selectedTooth && <ToothInfo selectedTooth={selectedTooth} _id={_id} />}
      </div>
    </Paper>
  );
}
