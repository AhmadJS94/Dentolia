import React, { useState, useEffect } from 'react';
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
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
const useStyles = makeStyles(theme => ({
  container: {
    // height: '400px',
    padding: '1em',
  },
  // gridItem: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   // alignItems: 'center',
  //   marginBottom: '1em',
  //   // marginLeft: '10px',
  //   // textAlign: 'center',border
  // },
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
    transition: 'all 0.2s ease',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1em',
  },
  inputLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
}));
export default function MedicalRecordCard({
  medicalInfo,
  setMedicalInfo,
  updateData,
}) {
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
  const [allergies, setAllergies] = useState({
    Adrenaline: false,
    Aspirin: false,
    Codeine: false,
    Ibuprofen: false,
    Iodine: false,
    Latex: false,
    Pencillin: false,
    Sulfa: false,
  });
  const [medicalConditions, setMedicalConditions] = useState({
    asthma: false,
    bleeding: false,
    cancer: false,
    diabetes: false,
    bloodPressure: false,
    liverDisease: false,
    pregnant: false,
    kidneyDisease: false,
    heartProblems: false,
    stroke: false,
  });

  const handleAllergiesChange = e => {
    setAllergies({
      ...allergies,
      [e.target.name]: e.target.checked,
    });
  };
  const handleConditionsChange = e => {
    setMedicalConditions({
      ...medicalConditions,
      [e.target.name]: e.target.checked,
    });
  };
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
    <Grid component={Paper} className={classes.container} container spacing={3}>
      <Grid item container spacing={2} xs={12}>
        <Grid xs={12} sm={10} item>
          <Typography variant="h5">Ahmad Zaaza - Health info</Typography>
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
        item
        container
        spacing={1}
        className={classes.gridItem}
      >
        <Grid item xs={12}>
          <Typography
            // style={{ marginBottom: edit && '0.5em' }}
            className={classes.inputLabel}
            align="center"
            variant="h6"
          >
            Medications
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
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
                {edit && (
                  <IconButton type="submit" size="small">
                    <HighlightOffRoundedIcon
                      style={{ fill: '#ba1e4a' }}
                      size="small"
                    />
                  </IconButton>
                )}
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
      </Grid>
      <Grid
        xs={12}
        sm={6}
        item
        className={classes.gridItem}
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography
            // style={{ marginBottom: edit && '0.5em' }}
            className={classes.inputLabel}
            align="center"
            variant="h6"
          >
            Allergies
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
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
                {edit && (
                  <IconButton type="submit" size="small">
                    <HighlightOffRoundedIcon
                      style={{ fill: '#ba1e4a' }}
                      size="small"
                    />
                  </IconButton>
                )}
              </form>
            ))
          )}
          {edit && (
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.Adrenaline}
                    onChange={handleAllergiesChange}
                    name="Adrenaline"
                  />
                }
                label="Adrenaline"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.Latex}
                    onChange={handleAllergiesChange}
                    name="Latex"
                  />
                }
                label="Latex"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.Pencillin}
                    onChange={handleAllergiesChange}
                    name="Pencillin"
                  />
                }
                label="Pencillin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.Ibuprofen}
                    onChange={handleAllergiesChange}
                    name="Ibuprofen"
                  />
                }
                label="Ibuprofen"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.Codeine}
                    onChange={handleAllergiesChange}
                    name="Codeine"
                  />
                }
                label="Codeine"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.Aspirin}
                    onChange={handleAllergiesChange}
                    name="Aspirin"
                  />
                }
                label="Aspirin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.Iodine}
                    onChange={handleAllergiesChange}
                    name="Iodine"
                  />
                }
                label="Iodine"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.Sulfa}
                    onChange={handleAllergiesChange}
                    name="Sulfa"
                  />
                }
                label="Sulfa"
              />
            </FormGroup>
            // <form
            //   onSubmit={handleAdd}
            //   style={{
            //     display: 'flex',
            //     justifyContent: 'center',
            //     marginBottom: '6px',
            //   }}
            // >
            //   <TextField
            //     style={{ alignSelf: 'center' }}
            //     placeholder="Add.."
            //     name="allergies"
            //     value={addInfo.allergies}
            //     onChange={e =>
            //       setAddInfo({ ...addInfo, [e.target.name]: e.target.value })
            //     }
            //   />
            //   <IconButton type="submit" size="small">
            //     <AddIcon size="small" />
            //   </IconButton>
            // </form>
          )}
        </Grid>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        item
        className={classes.gridItem}
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography
            style={{ marginBottom: edit && '0.5em' }}
            className={classes.title}
            align="center"
            variant="h5"
          >
            Medical Conditions
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
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
                {edit && (
                  <IconButton type="submit" size="small">
                    <HighlightOffRoundedIcon
                      style={{ fill: '#ba1e4a' }}
                      size="small"
                    />
                  </IconButton>
                )}
              </form>
            ))
          )}
          {edit && (
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.asthma}
                    onChange={handleConditionsChange}
                    name="asthma"
                  />
                }
                label="Asthma"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.bleeding}
                    onChange={handleConditionsChange}
                    name="bleeding"
                  />
                }
                label="Bleeding Problems"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.cancer}
                    onChange={handleConditionsChange}
                    name="cancer"
                  />
                }
                label="Cancer"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.diabetes}
                    onChange={handleConditionsChange}
                    name="diabetes"
                  />
                }
                label="Diabetes"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.bloodPressure}
                    onChange={handleConditionsChange}
                    name="bloodPressure"
                  />
                }
                label="Blood Pressure"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.liverDisease}
                    onChange={handleConditionsChange}
                    name="liverDisease"
                  />
                }
                label="Liver Disease"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.kidneyDisease}
                    onChange={handleConditionsChange}
                    name="kidneyDisease"
                  />
                }
                label="Kidney Disease"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.heartProblems}
                    onChange={handleConditionsChange}
                    name="heartProblems"
                  />
                }
                label="Heart Problems"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.stroke}
                    onChange={handleConditionsChange}
                    name="stroke"
                  />
                }
                label="Heart Stroke"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.pregnancy}
                    onChange={handleConditionsChange}
                    name="pregnancy"
                  />
                }
                label="Pregnancy"
              />
            </FormGroup>
            // <form
            //   onSubmit={handleAdd}
            //   style={{
            //     display: 'flex',
            //     justifyContent: 'center',
            //     marginBottom: '6px',
            //   }}
            // >
            //   <TextField
            //     style={{ alignSelf: 'center' }}
            //     placeholder="Add.."
            //     name="medicalConditions"
            //     value={addInfo.medicalConditions}
            //     onChange={e =>
            //       setAddInfo({ ...addInfo, [e.target.name]: e.target.value })
            //     }
            //   />
            //   <IconButton type="submit" size="small">
            //     <AddIcon size="small" />
            //   </IconButton>
            // </form>
          )}
        </Grid>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        item
        className={classes.gridItem}
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography
            style={{ marginBottom: edit && '0.5em' }}
            className={classes.title}
            align="center"
            variant="h5"
          >
            Past Surgeries
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
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
                {edit && (
                  <IconButton type="submit" size="small">
                    <HighlightOffRoundedIcon
                      style={{ fill: '#ba1e4a' }}
                      size="small"
                    />
                  </IconButton>
                )}
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
      </Grid>
      <Grid
        xs={12}
        sm={6}
        item
        className={classes.gridItem}
        style={{ alignItems: 'center' }}
      >
        <Typography
          style={{ marginBottom: edit && '0.5em' }}
          className={classes.title}
          align="center"
          variant="h5"
        >
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
        <Typography
          style={{ marginBottom: edit && '0.5em' }}
          className={classes.title}
          align="center"
          variant="h5"
        >
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
            <Button
              onClick={() => updateData('medicalInfo')}
              style={{ marginLeft: '5px' }}
              variant="contained"
            >
              Save Changes
            </Button>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
