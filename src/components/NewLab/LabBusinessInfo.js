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
  Checkbox,
  FormGroup,
  InputAdornment,
  Divider,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
    gridGap: '5px',
  },
  typeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
  },
  text: {
    margin: '16px 8px',
  },
}));
export default function LabBusinessInfo({
  handleBusinessChange,
  businessInfo,
}) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.typeGrid}>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handleBusinessChange}
            value={businessInfo.ceramicType}
            variant="outlined"
            label="Ceramic Type"
            name="ceramicType"
            size="small"
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handleBusinessChange}
            value={businessInfo.metalType}
            variant="outlined"
            label="Metal Type"
            name="metalType"
            size="small"
          />
        </div>
      </div>
      <Divider />
      <div className={classes.container}>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handleBusinessChange}
            value={businessInfo.pfmPrice}
            variant="outlined"
            label="PFM Price"
            name="pfmPrice"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">SP</InputAdornment>,
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handleBusinessChange}
            value={businessInfo.metalCrownPrice}
            variant="outlined"
            label="Metal Crown"
            name="metalCrownPrice"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">SP</InputAdornment>,
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handleBusinessChange}
            value={businessInfo.zirconiaPrice}
            variant="outlined"
            label="Zirconia Price"
            name="zirconiaPrice"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">SP</InputAdornment>,
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handleBusinessChange}
            value={businessInfo.veneersPrice}
            variant="outlined"
            label="Veneers Price"
            name="veneersPrice"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">SP</InputAdornment>,
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handleBusinessChange}
            value={businessInfo.fullRPDPrice}
            variant="outlined"
            label="Full RPD Price"
            name="fullRPDPrice"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">SP</InputAdornment>,
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handleBusinessChange}
            value={businessInfo.pfmPripartialRPDPricece}
            variant="outlined"
            label="Partial RPD Price"
            name="partialRPDPrice"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">SP</InputAdornment>,
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handleBusinessChange}
            value={businessInfo.orthoPrice}
            variant="outlined"
            label="Ortho Price"
            name="orthoPrice"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">SP</InputAdornment>,
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <TextField
            className={classes.text}
            onChange={handleBusinessChange}
            value={businessInfo.vacuumPlatePrice}
            variant="outlined"
            label="Vacuum Plate Price"
            name="vacuumPlatePrice"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">SP</InputAdornment>,
            }}
          />
        </div>
      </div>
    </>
  );
}
