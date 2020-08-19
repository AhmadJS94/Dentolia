import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  InputLabel,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  container: {
    // height: '400px',
    padding: '1em',
    overflowY: 'auto',
    // overflowX: 'hidden',
  },
  // gridItem: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   marginBottom: '5px',
  //   // textAlign: 'center',border
  // },
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
  inputLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
  list: {
    // alignSelf: 'center',
    borderBottom: '1px solid #555',
    // outline: '0',
    // borderRadius: '7px',
    transition: 'all 0.5s ease',

    '&:focus': {
      // border: 'none',
      borderBottom: '1px solid #555',
    },
    '&:hover': {
      borderBottom: '1px solid #555',
    },
  },
}));
export default function GeneralInfoCard({
  personalInfo,
  setPersonalInfo,
  updateData,
}) {
  const [edit, setEdit] = useState(false);
  const handleChange = e => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditClick = e => {
    e.preventDefault();
    setEdit(!edit);
  };

  const classes = useStyles();
  return (
    <Grid component={Paper} className={classes.container} container spacing={3}>
      <Grid item container spacing={2} xs={12}>
        <Grid xs={12} sm={10} item>
          <Typography variant="h5">Ahmad Zaaza - Personal info</Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            onClick={handleEditClick}
            variant="outlined"
            endIcon={<EditIcon />}
            color="primary"
          >
            Edit
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid
        xs={12}
        sm={6}
        // md={4}
        item
        container
        // justify="center"
        alignItems="center"
        className={classes.gridItem}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            First Name :
          </Typography>
        </Grid>
        <Grid item>
          <InputBase
            // disabled={!edit && true}
            value={personalInfo.firstName}
            onChange={handleChange}
            name="firstName"
            readOnly={edit ? false : true}
            className={edit && classes.list}
            inputProps={{ style: { fontSize: '1.2em' } }}
          />
        </Grid>
      </Grid>

      <Grid
        xs={12}
        sm={6}
        // md={4}
        item
        container
        // justify="center"
        alignItems="center"
        className={classes.gridItem}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            Last Name :
          </Typography>
        </Grid>
        <Grid item>
          <InputBase
            className={edit && classes.list}
            inputProps={{ style: { fontSize: '1.2em' } }}
            // disabled={!edit && true}
            value={personalInfo.lastName}
            onChange={handleChange}
            name="lastName"
            readOnly={edit ? false : true}
          />
        </Grid>
      </Grid>

      <Grid
        xs={12}
        sm={6}
        // md={4}
        item
        container
        // justify="center"
        alignItems="center"
        className={classes.gridItem}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            Age :
          </Typography>
        </Grid>
        <Grid item>
          <InputBase
            // disabled={!edit && true}
            value={personalInfo.age}
            onChange={handleChange}
            name="age"
            readOnly={edit ? false : true}
            className={edit && classes.list}
            inputProps={{ style: { fontSize: '1.2em' } }}
          />
        </Grid>
      </Grid>

      <Grid
        xs={12}
        sm={6}
        // md={4}
        item
        container
        // justify="center"
        alignItems="center"
        className={classes.gridItem}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            Gender :
          </Typography>
        </Grid>
        <Grid item>
          <InputBase
            // disabled={!edit && true}
            value={personalInfo.gender}
            onChange={handleChange}
            name="gender"
            readOnly={edit ? false : true}
            className={edit && classes.list}
            inputProps={{ style: { fontSize: '1.2em' } }}
          />
        </Grid>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        // md={4}
        item
        container
        // justify="center"
        alignItems="center"
        className={classes.gridItem}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            Zip code :
          </Typography>
        </Grid>
        <Grid item>
          <InputBase
            // disabled={!edit && true}
            value={personalInfo.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            readOnly={edit ? false : true}
            className={edit && classes.list}
            inputProps={{ style: { fontSize: '1.2em' } }}
          />
        </Grid>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        // md={4}
        item
        container
        // justify="center"
        alignItems="center"
        className={classes.gridItem}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            Address 1 :
          </Typography>
        </Grid>
        <Grid item>
          <InputBase
            // disabled={!edit && true}
            value={personalInfo.address}
            onChange={handleChange}
            name="address"
            readOnly={edit ? false : true}
            className={edit && classes.list}
            inputProps={{ style: { fontSize: '1.2em' } }}
          />
        </Grid>
      </Grid>

      <Grid
        xs={12}
        sm={6}
        // md={4}
        item
        container
        // justify="center"
        alignItems="center"
        className={classes.gridItem}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            Address 2 :
          </Typography>
        </Grid>
        <Grid item>
          <InputBase
            value={personalInfo.address}
            onChange={handleChange}
            name="address"
            readOnly={edit ? false : true}
            className={edit && classes.list}
            inputProps={{ style: { fontSize: '1.2em' } }}
          />
        </Grid>
      </Grid>

      <Grid
        xs={12}
        sm={6}
        // md={4}
        item
        container
        // justify="center"
        alignItems="center"
        className={classes.gridItem}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            Email Address :
          </Typography>
        </Grid>
        <Grid item>
          <InputBase
            value={personalInfo.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            readOnly={edit ? false : true}
            className={edit && classes.list}
            inputProps={{ style: { fontSize: '1.2em' } }}
          />
        </Grid>
      </Grid>

      <Grid
        xs={12}
        sm={6}
        // md={4}
        item
        container
        // justify="center"
        alignItems="center"
        className={classes.gridItem}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            Phone Number 1 :
          </Typography>
        </Grid>
        <Grid item>
          <InputBase
            // disabled={!edit && true}
            value={personalInfo.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            readOnly={edit ? false : true}
            className={edit && classes.list}
            inputProps={{ style: { fontSize: '1.2em' } }}
          />
        </Grid>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        // md={4}
        item
        container
        // justify="center"
        alignItems="center"
        className={classes.gridItem}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            Phone Number 2 :
          </Typography>
        </Grid>
        <Grid item>
          <InputBase
            value={personalInfo.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            readOnly={edit ? false : true}
            className={edit && classes.list}
            inputProps={{ style: { fontSize: '1.2em' } }}
          />
        </Grid>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        // md={4}
        item
        container
        // justify="center"
        alignItems="center"
        className={classes.gridItem}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            Occupation :
          </Typography>
        </Grid>
        <Grid item>
          <InputBase
            value={personalInfo.occupation}
            onChange={handleChange}
            name="occupation"
            readOnly={edit ? false : true}
            className={edit && classes.list}
            inputProps={{ style: { fontSize: '1.2em' } }}
          />
        </Grid>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        // md={4}
        item
        container
        // justify="center"
        alignItems="center"
        className={classes.gridItem}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            City:
          </Typography>
        </Grid>
        <Grid item>
          <InputBase
            value={personalInfo.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            readOnly={edit ? false : true}
            className={edit && classes.list}
            inputProps={{ style: { fontSize: '1.2em', textAlign: 'center' } }}
          />
        </Grid>
      </Grid>
      {edit && (
        <Grid style={{ textAlign: 'center' }} item xs={12}>
          <Button
            onClick={() => updateData('personalInfo')}
            style={{ marginLeft: '5px' }}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </Grid>
      )}
      {/* <Grid xs={12} item className={classes.gridItem}>
        <div>
          
          )}
        </div>
      </Grid> */}
    </Grid>
  );
}
