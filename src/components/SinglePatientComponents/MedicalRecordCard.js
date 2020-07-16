import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//CONSIDER ADDING BLOODTYPE
import {
  InputBase,
  TextField,
  IconButton,
  Paper,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
const useStyles = makeStyles(theme => ({
  container: {
    // height: '400px',
    padding: '1em',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    marginBottom: '1em',
    // marginLeft: '10px',
    // textAlign: 'center',border
  },
  list: {
    alignSelf: 'center',
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
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1em',
  },
}));
export default function MedicalRecordCard() {
  const [medicalInfo, setMedicalInfo] = useState({
    medications: [],
    allergies: [],
    medicalConditions: [],
    specialNotes: '',
    pastSurgeries: [],
    bloodType: 'Not defined',
  });
  const bloodTypes = [
    'Not defined',
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ];
  const [addInfo, setAddInfo] = useState({
    medications: '',
    allergies: '',
    medicalConditions: '',
    pastSurgeries: '',
  });
  const [edit, setEdit] = useState(false);
  const handleChange = (e, i) => {
    const name = e.target.name;
    console.log(e.target.value);
    const info = [...medicalInfo[name]];
    info[i] = e.target.value;
    setMedicalInfo({
      ...medicalInfo,
      [name]: info,
    });
    console.log(medicalInfo[name]);
  };
  const handleDelete = (e, i) => {
    e.preventDefault();
    const name = e.target.elements[0].name;
    const info = [...medicalInfo[name]];
    info.splice(i, 1);
    setMedicalInfo({
      ...medicalInfo,
      [name]: info,
    });
  };
  const handleBloodTypeChange = e => {
    setMedicalInfo({
      ...medicalInfo,
      bloodType: e.target.value,
    });
  };
  const handleNotesChange = e => {
    setMedicalInfo({
      ...medicalInfo,
      specialNotes: e.target.value,
    });
  };
  const handleEditClick = e => {
    e.preventDefault();
    setEdit(!edit);
  };
  const handleAdd = e => {
    e.preventDefault();
    let name = e.target.elements[0].name;
    let value = e.target.elements[0].value;
    if (!value || value.startsWith(' ')) return;
    const info = [...medicalInfo[name]];
    // console.log(info);
    info.push(value);
    setMedicalInfo({
      ...medicalInfo,
      [name]: info,
    });
    setAddInfo({
      ...addInfo,
      [name]: '',
    });
  };
  const classes = useStyles();
  return (
    <Grid component={Paper} className={classes.container} container>
      <Grid xs={12} sm={6} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h5">
          Medications
        </Typography>
        {medicalInfo.medications.length === 0 ? (
          <InputBase
            style={{ marginBottom: '1em' }}
            inputProps={{ style: { textAlign: 'center' } }}
            readOnly={true}
            value="No Medications mentioned"
          />
        ) : (
          medicalInfo.medications.map((medication, i) => (
            <form
              onSubmit={e => handleDelete(e, i)}
              className={classes.inputContainer}
            >
              <InputBase
                key={i}
                className={edit && classes.list}
                inputProps={{ style: { textAlign: 'center' } }}
                readOnly={edit ? false : true}
                value={medication}
                name="medications"
                onChange={e => handleChange(e, i)}
              />
              <IconButton type="submit" size="small">
                <HighlightOffRoundedIcon
                  style={{ fill: '#ba1e4a' }}
                  size="small"
                />
              </IconButton>
            </form>
          ))
        )}
        {edit && (
          <form
            onSubmit={handleAdd}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '6px',
            }}
          >
            <TextField
              style={{ alignSelf: 'center' }}
              placeholder="Add.."
              id="medications"
              name="medications"
              value={addInfo.medications}
              onChange={e => {
                setAddInfo({ ...addInfo, [e.target.name]: e.target.value });
              }}
            />
            <IconButton type="submit" size="small">
              <AddIcon size="small" />
            </IconButton>
          </form>
        )}
      </Grid>
      <Grid xs={12} sm={6} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h5">
          Allergies
        </Typography>
        {medicalInfo.allergies.length === 0 ? (
          <InputBase
            style={{ marginBottom: '1em' }}
            inputProps={{ style: { textAlign: 'center' } }}
            readOnly={true}
            value="No Allergies mentioned"
          />
        ) : (
          medicalInfo.allergies.map((allergy, i) => (
            <form
              onSubmit={e => handleDelete(e, i)}
              className={classes.inputContainer}
            >
              <InputBase
                key={i}
                className={edit && classes.list}
                inputProps={{ style: { textAlign: 'center' } }}
                readOnly={edit ? false : true}
                value={allergy}
                name="allergies"
                onChange={e => handleChange(e, i)}
              />
              <IconButton type="submit" size="small">
                <HighlightOffRoundedIcon
                  style={{ fill: '#ba1e4a' }}
                  size="small"
                />
              </IconButton>
            </form>
          ))
        )}
        {edit && (
          <form
            onSubmit={handleAdd}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '6px',
            }}
          >
            <TextField
              style={{ alignSelf: 'center' }}
              placeholder="Add.."
              name="allergies"
              value={addInfo.allergies}
              onChange={e =>
                setAddInfo({ ...addInfo, [e.target.name]: e.target.value })
              }
            />
            <IconButton type="submit" size="small">
              <AddIcon size="small" />
            </IconButton>
          </form>
        )}
      </Grid>
      <Grid xs={12} sm={6} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h5">
          Medical Conditions
        </Typography>

        {medicalInfo.medicalConditions.length === 0 ? (
          <InputBase
            style={{ marginBottom: '1em' }}
            inputProps={{ style: { textAlign: 'center' } }}
            readOnly={true}
            value="No Medical Conditions mentioned"
          />
        ) : (
          medicalInfo.medicalConditions.map((condition, i) => (
            <form
              onSubmit={e => handleDelete(e, i)}
              className={classes.inputContainer}
            >
              <InputBase
                key={i}
                className={edit && classes.list}
                inputProps={{ style: { textAlign: 'center' } }}
                readOnly={edit ? false : true}
                value={condition}
                name="medicalConditions"
                onChange={e => handleChange(e, i)}
              />
              <IconButton type="submit" size="small">
                <HighlightOffRoundedIcon
                  style={{ fill: '#ba1e4a' }}
                  size="small"
                />
              </IconButton>
            </form>
          ))
        )}
        {edit && (
          <form
            onSubmit={handleAdd}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '6px',
            }}
          >
            <TextField
              style={{ alignSelf: 'center' }}
              placeholder="Add.."
              name="medicalConditions"
              value={addInfo.medicalConditions}
              onChange={e =>
                setAddInfo({ ...addInfo, [e.target.name]: e.target.value })
              }
            />
            <IconButton type="submit" size="small">
              <AddIcon size="small" />
            </IconButton>
          </form>
        )}
      </Grid>
      <Grid xs={12} sm={6} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h5">
          Past Surgeries
        </Typography>

        {medicalInfo.pastSurgeries.length === 0 ? (
          <InputBase
            style={{ marginBottom: '1em' }}
            inputProps={{ style: { textAlign: 'center' } }}
            readOnly={true}
            value="No Past Surgeries mentioned"
          />
        ) : (
          medicalInfo.pastSurgeries.map((surgery, i) => (
            <form
              onSubmit={e => handleDelete(e, i)}
              className={classes.inputContainer}
            >
              <InputBase
                key={i}
                className={edit && classes.list}
                inputProps={{ style: { textAlign: 'center' } }}
                readOnly={edit ? false : true}
                value={surgery}
                name="pastSurgeries"
                onChange={e => handleChange(e, i)}
              />
              <IconButton type="submit" size="small">
                <HighlightOffRoundedIcon
                  style={{ fill: '#ba1e4a' }}
                  size="small"
                />
              </IconButton>
            </form>
          ))
        )}
        {edit && (
          <form
            onSubmit={handleAdd}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '6px',
            }}
          >
            <TextField
              size="large"
              style={{ alignSelf: 'center' }}
              placeholder="Add.."
              name="pastSurgeries"
              value={addInfo.pastSurgeries}
              onChange={e =>
                setAddInfo({ ...addInfo, [e.target.name]: e.target.value })
              }
            />
            <IconButton type="submit" size="small">
              <AddIcon size="small" />
            </IconButton>
          </form>
        )}
      </Grid>

      <Grid
        xs={12}
        sm={6}
        item
        className={classes.gridItem}
        style={{ alignItems: 'center' }}
      >
        <Typography className={classes.title} align="center" variant="h5">
          Blood Type
        </Typography>
        <Select
          value={medicalInfo.bloodType}
          onChange={handleBloodTypeChange}
          disabled={edit ? false : true}
          style={{ padding: 0 }}
        >
          {bloodTypes.map((type, i) => (
            <MenuItem key={i} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid xs={12} sm={6} item className={classes.gridItem}>
        <Typography className={classes.title} align="center" variant="h5">
          Special Notes
        </Typography>

        <InputBase
          className={edit && classes.list}
          inputProps={{
            style: {
              textAlign: 'center',
              paddingLeft: '30px',
              paddingRight: '30px',
            },
          }}
          readOnly={edit ? false : true}
          value={medicalInfo.specialNotes}
          name="specialNotes"
          placeholder="No Notes ..."
          onChange={handleNotesChange}
          multiline
          rows={6}
        />
      </Grid>
      <Grid
        xs={12}
        item
        className={classes.gridItem}
        style={{ alignItems: 'center' }}
      >
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
