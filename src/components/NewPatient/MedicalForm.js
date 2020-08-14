import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  IconButton,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none',
    backgroundColor: '#3a5ad9',
    minHeight: '100vh',
  },

  text: {
    margin: theme.spacing(2),
  },
  radio: {
    // width: '70px',
    // display: 'inline-block',
    margin: '16px 16px',
  },
}));
export default function MedicalForm({ handleMedicalChange, medicalInfo }) {
  const classes = useStyles();

  return (
    <>
      <Grid container={true} spacing={0}>
        <Grid
          container
          justify="center"
          alignItems="center"
          item
          xs={6}
          sm={6}
          md={6}
          lg={4}
        >
          <FormLabel style={{ color: '#555' }} component="legend">
            Allergies
          </FormLabel>

          <RadioGroup
            size="small"
            className={classes.radio}
            aria-label="allergies"
            name="allergies"
            value={medicalInfo.allergies}
            onChange={handleMedicalChange}
          >
            <FormControlLabel
              value="no"
              control={<Radio size="small" />}
              label="No"
            />
            <FormControlLabel
              value="yes"
              control={<Radio size="small" />}
              label="Yes"
            />
          </RadioGroup>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          item
          xs={6}
          sm={6}
          md={6}
          lg={4}
        >
          <FormLabel style={{ color: '#555' }} component="legend">
            Surgeries
          </FormLabel>

          <RadioGroup
            size="small"
            className={classes.radio}
            aria-label="surgeries"
            name="surgeries"
            value={medicalInfo.surgeries}
            onChange={handleMedicalChange}
          >
            <FormControlLabel
              value="no"
              control={<Radio size="small" />}
              label="No"
            />
            <FormControlLabel
              value="yes"
              control={<Radio size="small" />}
              label="Yes"
            />
          </RadioGroup>
        </Grid>

        <Grid
          container
          justify="center"
          alignItems="center"
          item
          xs={12}
          sm={12}
          lg={4}
        >
          <FormLabel style={{ color: '#555' }} component="legend">
            Medical Conditions
          </FormLabel>
          <RadioGroup
            size="small"
            className={classes.radio}
            aria-label="medical conditions"
            name="medicalConditions"
            value={medicalInfo.medicalConditions}
            onChange={handleMedicalChange}
          >
            <FormControlLabel
              value="no"
              control={<Radio size="small" />}
              label="No"
            />
            <FormControlLabel
              value="yes"
              control={<Radio size="small" />}
              label="Yes"
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </>
  );
}
