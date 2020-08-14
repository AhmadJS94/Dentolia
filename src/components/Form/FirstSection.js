import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  Checkbox,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  Divider,
} from '@material-ui/core';
import moment from 'moment';

const menuProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  getContentAnchorEl: null,
};
const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  inputLabel: {
    marginBottom: theme.spacing(1),
    color: 'black',
  },
}));
export default function FirstSection() {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    patientName: 'Ahmad Zaaza',
    date: moment().format('DD/MM/YYYY'),
    noToothBrush: '',
    lastVisitDentist: '',
    hygieneMethod: '',
    di: '',
    ci: '',
    ohi: '',
    gi: '',
    cpitn: '',
  });

  const handleFormDataChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Grid
        container
        direction="column"
        spacing={2}
        className={classes.container}
      >
        <Grid
          container
          justify="center"
          item
          xs={12}
          sm={12}
          md={12}
          spacing={2}
        >
          <Grid item xs={12} sm={6} md={6}>
            <InputLabel className={classes.inputLabel}>Patient Name</InputLabel>
            <TextField
              disabled
              value={formData.patientName}
              onChange={handleFormDataChange}
              name="patientName"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <InputLabel className={classes.inputLabel}>Date Of Form</InputLabel>
            <TextField
              disabled
              value={formData.date}
              onChange={handleFormDataChange}
              name="date"
            />
          </Grid>
        </Grid>
        <Grid item container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Oral Hygiene Assessment</Typography>
            <Divider style={{ marginTop: '4px' }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputLabel className={classes.inputLabel} htmlFor="noToothBrush">
              Frequency of Tooth Brushing
            </InputLabel>
            <Select
              fullWidth
              MenuProps={menuProps}
              value={formData.noToothBrush}
              onChange={handleFormDataChange}
              name="noToothBrush"
              id="noToothBrush"
            >
              <MenuItem value={1}>Once Daily</MenuItem>
              <MenuItem value={2}>Twice Daily</MenuItem>
              <MenuItem value={3}>3 Times a day</MenuItem>
              <MenuItem value={0}>Rarely</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputLabel
              className={classes.inputLabel}
              htmlFor="lastVisitDentist"
            >
              Last Visit to a Dental Office
            </InputLabel>
            <Select
              fullWidth
              MenuProps={menuProps}
              value={formData.lastVisitDentist}
              onChange={handleFormDataChange}
              name="lastVisitDentist"
              id="lastVisitDentist"
            >
              <MenuItem value={0}>less than one Month</MenuItem>
              <MenuItem value={1}>less than 6 Months</MenuItem>
              <MenuItem value={2}>Less than One year</MenuItem>
              <MenuItem value={3}>More than One year</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputLabel className={classes.inputLabel} htmlFor="hygieneMethod">
              Hygiene Method
            </InputLabel>
            <Select
              fullWidth
              MenuProps={menuProps}
              value={formData.hygieneMethod}
              onChange={handleFormDataChange}
              name="hygieneMethod"
              id="hygieneMethod"
            >
              <MenuItem value={0}>Independent - manual Toothbrush</MenuItem>
              <MenuItem value={1}>Independent - Electric Toothbrush</MenuItem>
              <MenuItem value={2}>Assisted - manual Toothbrush</MenuItem>
              <MenuItem value={3}>Assisted - Electric Toothbrush</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputLabel className={classes.inputLabel} htmlFor="di">
              Dental Debris Index (DI)
            </InputLabel>
            <TextField
              value={formData.di}
              onChange={handleFormDataChange}
              variant="outlined"
              name="di"
              id="di"
              helperText="Range from 0-6"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputLabel className={classes.inputLabel} htmlFor="ci">
              Dental Calculus Index (CI)
            </InputLabel>
            <TextField
              type="number"
              value={formData.ci}
              onChange={handleFormDataChange}
              variant="outlined"
              name="ci"
              id="ci"
              helperText="Range from 0-6"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputLabel className={classes.inputLabel} htmlFor="ohi">
              Oral Hygiene Index (OHI)
            </InputLabel>
            <TextField
              type="number"
              value={formData.ohi}
              onChange={handleFormDataChange}
              variant="outlined"
              name="ohi"
              id="ohi"
              helperText="Range from 0-12"
              size="small"
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Dental and gingival assessment</Typography>
            <Divider style={{ marginTop: '4px' }} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputLabel className={classes.inputLabel} htmlFor="gi">
              Gingival Index (GI)
            </InputLabel>
            <TextField
              type="number"
              value={formData.gi}
              onChange={handleFormDataChange}
              variant="outlined"
              name="gi"
              id="gi"
              helperText="Range from 0.0-3.0"
              size="small"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
