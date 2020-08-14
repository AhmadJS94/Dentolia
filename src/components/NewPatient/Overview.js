import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
  InputBase,
  Input,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  container: {
    // height: '400px',
    padding: '1em',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '5px',
    // textAlign: 'center',border
  },
  Input: {
    border: '1px solid rgba(221, 216, 216, 0.7)',
    marginBottom: '0.5em',
    outline: '0',
    borderRadius: '7px',
    transition: 'all 0.2s ease',
    '&:focus': {
      border: 'none',
      outline: '1px solid #555',
    },
    '&:hover': {
      border: '1px solid #555',
    },
  },
  title: {
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
  },
}));
export default function Overview({ personalInfo, medicalInfo }) {
  const classes = useStyles();
  return (
    <Grid className={classes.container} container>
      <Grid xs={12} sm={4} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h6">
          Full Name
        </Typography>

        <InputBase
          //   className={classes.Input}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={true}
          value={`${personalInfo.firstName} ${personalInfo.lastName} `}
        />
      </Grid>
      <Grid xs={12} sm={4} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h6">
          Age
        </Typography>

        <InputBase
          //   className={classes.Input}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={true}
          value={personalInfo.age}
          name="age"
        />
      </Grid>
      <Grid xs={12} sm={4} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h6">
          Gender
        </Typography>

        <InputBase
          //   className={classes.Input}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={true}
          value={personalInfo.gender}
          name="gender"
        />
      </Grid>
      <Grid xs={12} sm={4} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h6">
          Address
        </Typography>

        <InputBase
          //   className={classes.Input}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={true}
          value={personalInfo.address}
          name="address"
        />
      </Grid>
      <Grid xs={12} sm={4} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h6">
          First visit
        </Typography>

        <InputBase
          //   className={classes.Input}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={true}
          value={personalInfo.firstVisit}
          name="firstVisit"
        />
      </Grid>
      <Grid xs={12} sm={4} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h6">
          Phone Number
        </Typography>

        <InputBase
          //   className={classes.Input}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={true}
          value={personalInfo.phoneNumber}
          name="phoneNumber"
        />
      </Grid>
      <Grid xs={12} sm={4} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h6">
          Allergies
        </Typography>

        <InputBase
          //   className={classes.Input}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={true}
          value={medicalInfo.allergies}
          name="allergies"
        />
      </Grid>
      <Grid xs={12} sm={4} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h6">
          Surgeries
        </Typography>

        <InputBase
          //   className={classes.Input}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={true}
          value={medicalInfo.surgeries}
          name="surgeries"
        />
      </Grid>
      <Grid xs={12} sm={4} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h6">
          Medical Conditions
        </Typography>

        <InputBase
          //   className={classes.Input}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={true}
          value={medicalInfo.medicalConditions}
          name="medicalConditions"
        />
      </Grid>
    </Grid>
  );
}
