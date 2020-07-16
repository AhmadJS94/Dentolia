import React, { useState } from 'react';
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
import EditIcon from '@material-ui/icons/Edit';

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
  },
}));
export default function GeneralInfoCard() {
  const [generalInfo, setGeneralInfo] = useState({
    fullName: 'Ahmad Zaaza',
    age: '27',
    address: 'Damascus',
    gender: 'Male',
    firstVisit: '27/2/2019',
  });
  const [edit, setEdit] = useState(false);
  const handleChange = e => {
    setGeneralInfo({
      ...generalInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditClick = e => {
    e.preventDefault();
    setEdit(!edit);
  };
  const classes = useStyles();
  return (
    <Grid component={Paper} className={classes.container} container>
      <Grid xs={12} sm={6} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h5">
          Full Name
        </Typography>

        <InputBase
          className={edit ? classes.Input : ''}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={edit ? false : true}
          value={generalInfo.fullName}
          name="fullName"
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12} sm={6} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h5">
          Age
        </Typography>

        <InputBase
          className={edit ? classes.Input : ''}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={edit ? false : true}
          value={generalInfo.age}
          name="age"
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12} sm={6} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h5">
          Gender
        </Typography>

        <InputBase
          className={edit ? classes.Input : ''}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={edit ? false : true}
          value={generalInfo.gender}
          name="gender"
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12} sm={6} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h5">
          Address
        </Typography>

        <InputBase
          className={edit ? classes.Input : ''}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={edit ? false : true}
          value={generalInfo.address}
          name="address"
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12} sm={6} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h5">
          First visit
        </Typography>

        <InputBase
          className={edit ? classes.Input : ''}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={edit ? false : true}
          value={generalInfo.firstVisit}
          name="firstVisit"
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12} item className={classes.gridItem}>
        <div>
          <Button
            onClick={handleEditClick}
            variant="contained"
            endIcon={<EditIcon />}
          >
            Edit
          </Button>
          {edit && (
            <Button style={{ marginLeft: '5px' }} variant="contained">
              Save Changes
            </Button>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
