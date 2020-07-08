import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none',
    backgroundColor: '#3a5ad9',
    minHeight: '100vh',
  },

  text: {
    margin: '16px 8px',
  },
  radio: {
    width: '70px',
    display: 'inline-block',
    margin: '16px 16px',
  },
}));
export default function PersonalForm({ handlePersonalChange, personalInfo }) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4}>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.firstName}
            variant="outlined"
            label="First name"
            name="firstName"
            size="small"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.lastName}
            variant="outlined"
            label="Last name"
            name="lastName"
            size="small"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.address}
            variant="outlined"
            label="Address"
            name="address"
            size="small"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.phoneNumber}
            variant="outlined"
            label="Phone Number"
            name="phoneNumber"
            size="small"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            size="small"
            className={classes.text}
            id="date"
            label="Birthday"
            type="date"
            value={personalInfo.dateOfBirth}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handlePersonalChange}
            name="dateOfBirth"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <RadioGroup
            size="small"
            className={classes.radio}
            aria-label="gender"
            name="gender"
            value={personalInfo.gender}
            onChange={handlePersonalChange}
          >
            <FormLabel component="legend">Gender</FormLabel>
            <FormControlLabel
              value="female"
              control={<Radio size="small" />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio size="small" />}
              label="Male"
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </>
  );
}
