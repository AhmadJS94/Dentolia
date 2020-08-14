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
  InputLabel,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,minmax(225px,1fr))',
    ['@media(max-width:900px)']: {
      gridTemplateColumns: 'repeat(auto-fit,minmax(175px,1fr))',
    },
  },
  text: {
    margin: '16px 8px',
  },
  radio: {
    display: 'flex',

    // justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    // margin: '16px 16px',
  },
  inputLabel: {
    color: '#888',
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
}));
export default function PersonalForm({
  handlePersonalChange,
  personalInfo,
  validateData,
  errors,
}) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div style={{ textAlign: 'center' }}>
          <InputLabel className={classes.inputLabel}>First Name</InputLabel>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.firstName}
            variant="outlined"
            name="firstName"
            size="small"
            error={Boolean(errors.firstName)}
            helperText={Boolean(errors.firstName) && errors.firstName}
            onBlur={() => validateData('firstName')}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <InputLabel className={classes.inputLabel}>Last Name</InputLabel>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.lastName}
            variant="outlined"
            name="lastName"
            size="small"
            onBlur={() => validateData('lastName')}
            error={Boolean(errors.lastName)}
            helperText={Boolean(errors.lastName) && errors.lastName}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <InputLabel className={classes.inputLabel}>Address</InputLabel>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.address}
            variant="outlined"
            name="address"
            size="small"
            onBlur={() => validateData('address')}
            error={Boolean(errors.address)}
            helperText={Boolean(errors.address) && errors.address}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <InputLabel className={classes.inputLabel}>Phone Number</InputLabel>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.phoneNumber}
            variant="outlined"
            name="phoneNumber"
            size="small"
            onBlur={() => validateData('phoneNumber')}
            error={Boolean(errors.phoneNumber)}
            helperText={Boolean(errors.phoneNumber) && errors.phoneNumber}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <InputLabel className={classes.inputLabel}>Occupation</InputLabel>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.occupation}
            variant="outlined"
            name="occupation"
            size="small"
            onBlur={() => validateData('occupation')}
            error={Boolean(errors.occupation)}
            helperText={Boolean(errors.occupation) && errors.occupation}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          {/* <TextField
            size="small"
            variant="outlined"
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
          /> */}
          <InputLabel className={classes.inputLabel}>Age</InputLabel>
          <TextField
            size="small"
            variant="outlined"
            className={classes.text}
            value={personalInfo.age}
            onChange={handlePersonalChange}
            name="age"
            onBlur={() => validateData('age')}
            error={Boolean(errors.age)}
            helperText={Boolean(errors.age) && errors.age}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <RadioGroup
            size="small"
            className={classes.radio}
            aria-label="gender"
            name="gender"
            value={personalInfo.gender}
            onChange={handlePersonalChange}
          >
            <FormLabel
              style={{ color: '#555', marginRight: '10px' }}
              component="h6"
            >
              Gender
            </FormLabel>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                // justifyContent: 'center',
              }}
            >
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
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  );
}
