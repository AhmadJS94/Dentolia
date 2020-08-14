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
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
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
    justifyContent: 'center',
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
    transition: 'all 0.2s ease',
  },
}));
export default function LabGeneralInfoTab() {
  const [generalInfo, setGeneralInfo] = useState({
    labName: 'Ahmad Zaaza',
    technicianName: '',
    address: 'Damascus',

    phoneNumber: '0687562215',
    speciality: {
      all: true,
      pfm: false,
      zirconia: false,
      orthodontics: false,
      removableProsthodontics: false,
      veneers: false,
    },
  });
  const [edit, setEdit] = useState(false);
  const handleChange = e => {
    setGeneralInfo({
      ...generalInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckBoxChange = e => {
    const name = e.target.name;
    setGeneralInfo({
      ...generalInfo,
      speciality: {
        ...generalInfo.speciality,
        [name]: e.target.checked,
      },
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
        <Typography
          style={{ marginBottom: edit && '0.5em' }}
          className={classes.title}
          align="center"
          variant="h5"
        >
          Lab Name
        </Typography>

        <InputBase
          className={edit ? classes.Input : ''}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={edit ? false : true}
          value={generalInfo.labName}
          name="labName"
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12} sm={6} item className={classes.gridItem}>
        <Typography
          style={{ marginBottom: edit && '0.5em' }}
          className={classes.title}
          align="center"
          variant="h5"
        >
          Technician Name
        </Typography>

        <InputBase
          className={edit ? classes.Input : ''}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={edit ? false : true}
          value={generalInfo.technicianName}
          name="technicianName"
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12} sm={6} item className={classes.gridItem}>
        <Typography
          style={{ marginBottom: edit && '0.5em' }}
          className={classes.title}
          align="center"
          variant="h5"
        >
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
        <Typography
          style={{ marginBottom: edit && '0.5em' }}
          className={classes.title}
          align="center"
          variant="h5"
        >
          Phone Number
        </Typography>

        <InputBase
          className={edit ? classes.Input : ''}
          inputProps={{ style: { textAlign: 'center' } }}
          readOnly={edit ? false : true}
          value={generalInfo.phoneNumber}
          name="phoneNumber"
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12} item className={classes.gridItem}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel style={{ color: 'rgba(0, 0, 0, 0.87)' }} component="p">
            <Typography
              align="center"
              variant="h5"
              style={{ fontWeight: 'bold' }}
            >
              Lab's Speciality
            </Typography>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!edit && true}
                  checked={generalInfo.speciality.all}
                  onChange={handleCheckBoxChange}
                  name="all"
                />
              }
              label="All"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!edit && true}
                  checked={generalInfo.speciality.pfm}
                  onChange={handleCheckBoxChange}
                  name="pfm"
                />
              }
              label="PFM"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!edit && true}
                  checked={generalInfo.speciality.zirconia}
                  onChange={handleCheckBoxChange}
                  name="zirconia"
                />
              }
              label="Zirconia"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!edit && true}
                  checked={generalInfo.speciality.removableProsthodontics}
                  onChange={handleCheckBoxChange}
                  name="removableProsthodontics"
                />
              }
              label="Removable Prosthodontics"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!edit && true}
                  checked={generalInfo.speciality.veneers}
                  onChange={handleCheckBoxChange}
                  name="veneers"
                />
              }
              label="Veneers/E-Max"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={!edit && true}
                  checked={generalInfo.speciality.orthodontics}
                  onChange={handleCheckBoxChange}
                  name="orthodontics"
                />
              }
              label="Orthodontics"
            />
          </FormGroup>
        </FormControl>
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
            <Button style={{ marginLeft: '10px' }} variant="contained">
              Save Changes
            </Button>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
