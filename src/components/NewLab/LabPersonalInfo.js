import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormGroup,
  Typography,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
  },
  text: {
    margin: '16px 8px',
  },

  formControl: {
    margin: theme.spacing(1),
  },
}));
export default function LabPersonalInfo({
  handlePersonalChange,
  personalInfo,

  handleCheckBoxChange,
}) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.labName}
            variant="outlined"
            label="Lab Name"
            name="labName"
            size="small"
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.technicianName}
            variant="outlined"
            label="Technician Name"
            name="technicianName"
            size="small"
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.address}
            variant="outlined"
            label="Address"
            name="address"
            size="small"
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handlePersonalChange}
            value={personalInfo.phoneNumber}
            variant="outlined"
            label="Phone Number"
            name="phoneNumber"
            size="small"
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel style={{ color: '#555' }} component="p">
            <Typography variant="h6" style={{ fontWeight: 'unset' }}>
              Lab's Speciality
            </Typography>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={personalInfo.speciality.all}
                  onChange={handleCheckBoxChange}
                  name="all"
                />
              }
              label="All"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={personalInfo.speciality.pfm}
                  onChange={handleCheckBoxChange}
                  name="pfm"
                />
              }
              label="PFM"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={personalInfo.speciality.zirconia}
                  onChange={handleCheckBoxChange}
                  name="zirconia"
                />
              }
              label="Zirconia"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={personalInfo.speciality.removableProsthodontics}
                  onChange={handleCheckBoxChange}
                  name="removableProsthodontics"
                />
              }
              label="Removable Prosthodontics"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={personalInfo.speciality.veneers}
                  onChange={handleCheckBoxChange}
                  name="veneers"
                />
              }
              label="Veneers/E-Max"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={personalInfo.speciality.orthodontics}
                  onChange={handleCheckBoxChange}
                  name="orthodontics"
                />
              }
              label="Orthodontics"
            />
          </FormGroup>
        </FormControl>
      </div>
    </>
  );
}
