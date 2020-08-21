import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  CardContent,
  Button,
  IconButton,
  Grid,
  Paper,
  Toolbar,
  MenuItem,
  Select,
  Divider,
  FormControl,
  TextField,
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '300px',
    overflowY: 'auto',

    // maxHeight: '300px',
  },
  gridHeadTitle: {
    fontSize: '1em',
    fontWeight: 'bold',
    padding: '8px 0px',
    textAlign: 'center',
  },
  toolbar: {
    minHeight: '47px',
    display: 'flex',
    justifyContent: 'space-around',
    // padding: '16px',
  },
  //   innerGrid: {
  //     padding: theme.spacing(2),
  //   },
}));
export default function MedicalGeneralCard({
  medicalForm,
  medicalForms,
  changeViewedForm,
  _id,
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Toolbar disableGutters="true" className={classes.toolbar}>
        <Typography
          variant="h6"
          style={{ fontSize: '1.2em', fontWeight: 'bold' }}
        >
          Ahmad Zaaza - Health Info
        </Typography>
      </Toolbar>
      <Divider />
      <Grid className={classes.innerGrid} container>
        <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '8px' }}>
          <Typography variant="subtitle1">
            Number of Filled Forms : {medicalForms.length}
          </Typography>
          {medicalForms.length === 0 ? (
            <Typography variant="subtitle1">
              There are no available forms to view
            </Typography>
          ) : (
            <Typography variant="subtitle1">Select a form to view :</Typography>
          )}
        </Grid>
        {medicalForms.length !== 0 && (
          <Grid
            item
            xs={12}
            style={{ textAlign: 'center', marginBottom: '8px' }}
          >
            <TextField
              select
              variant="outlined"
              size="small"
              value={medicalForm.date}
            >
              {medicalForms.map((form, i) => (
                <MenuItem
                  onClick={() => changeViewedForm(form.date)}
                  key={i}
                  value={form.date}
                >
                  Medical Form at {form.date}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to={`/patients/${_id}/medicalForms/new`}
          >
            New medical form
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
