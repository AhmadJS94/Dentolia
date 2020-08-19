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
  FormGroup,
  FormControlLabel,
  IconButton,
  InputBase,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import moment from 'moment';
import { KeyboardDatePicker } from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
// const menuProps = {
//   anchorOrigin: {
//     vertical: 'bottom',
//     horizontal: 'left',
//   },
//   transformOrigin: {
//     vertical: 'top',
//     horizontal: 'left',
//   },
//   getContentAnchorEl: null,
// };
const useStyles = makeStyles(theme => ({
  container: {
    // marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  inputLabel: {
    marginBottom: theme.spacing(1),
    color: 'black',
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
  inputLabel: {
    color: 'black',
  },
}));
export default function MedicalForm() {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
  });
  const [formData, setFormData] = useState({
    patientName: 'Ahmad Zaaza',
    date: moment(),

    medications: [],
    pastSurgeries: [],
  });
  const handleChange = (e, i) => {
    const name = e.target.name;
    console.log(e.target.value);
    const info = [...formData[name]];
    info[i] = e.target.value;
    setFormData({
      ...formData,
      [name]: info,
    });
    // console.log(medicalInfo[name]);
  };
  const handleDelete = (e, i) => {
    e.preventDefault();
    const name = e.target.elements[0].name;
    const info = [...formData[name]];
    info.splice(i, 1);
    setFormData({
      ...formData,
      [name]: info,
    });
  };
  const [notes, setNotes] = useState([]);
  const [allergies, setAllergies] = useState({
    adrenaline: false,
    aspirin: false,
    codeine: false,
    ibuProfen: false,
    iodine: false,
    latex: false,
    pencillin: false,
    sulfa: false,
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
  const [addInfo, setAddInfo] = useState({
    medications: '',
    pastSurgeries: '',
  });
  const handleAddNote = () => {
    let note = [...notes];
    note.push(noteData);
    setNotes(note);
  };
  const handleAdd = e => {
    e.preventDefault();
    let name = e.target.elements[0].name;
    let value = e.target.elements[0].value;
    if (!value || value.startsWith(' ')) return;
    const info = [...formData[name]];
    // console.log(info);
    info.push(value);
    setFormData({
      ...formData,
      [name]: info,
    });
    setAddInfo({
      ...addInfo,
      [name]: '',
    });
  };
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

  const handleSubmit = e => {
    e.preventDefault();
    let data = {
      date: formData.date.format('DD-MM-YYYY'),
      allergies: allergies,
      medicalConditions: medicalConditions,
      medications: formData.medications,
      pastSurgeries: formData.pastSurgeries,
      specialNotes: notes,
    };
    console.log(data);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        spacing={2}
        className={classes.container}
      >
        <Grid item xs={12}>
          <Typography
            style={{ fontWeight: 'bold' }}
            align="center"
            variant="h2"
          >
            Medical Record Form
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid
          container
          justify="center"
          item
          xs={12}
          sm={12}
          md={12}
          spacing={2}
        >
          <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
            <InputLabel className={classes.inputLabel}>Patient Name</InputLabel>
            <TextField
              disabled
              value={formData.patientName}
              inputProps={{ style: { textAlign: 'center' } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
            <InputLabel className={classes.inputLabel}>Date Of Form</InputLabel>
            <KeyboardDatePicker
              value={formData.date}
              onChange={date =>
                setFormData({
                  ...formData,
                  date: date,
                })
              }
              name="date"
              format="DD/MM/YYYY"
            />
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="h4">Allergies</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FormGroup row style={{ justifyContent: 'space-evenly' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.adrenaline}
                    onChange={handleAllergiesChange}
                    name="adrenaline"
                  />
                }
                label="Adrenaline"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.latex}
                    onChange={handleAllergiesChange}
                    name="latex"
                  />
                }
                label="Latex"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.pencillin}
                    onChange={handleAllergiesChange}
                    name="pencillin"
                  />
                }
                label="Pencillin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.ibuProfen}
                    onChange={handleAllergiesChange}
                    name="ibuProfen"
                  />
                }
                label="Ibuprofen"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.codeine}
                    onChange={handleAllergiesChange}
                    name="codeine"
                  />
                }
                label="Codeine"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.aspirin}
                    onChange={handleAllergiesChange}
                    name="aspirin"
                  />
                }
                label="Aspirin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.iodine}
                    onChange={handleAllergiesChange}
                    name="iodine"
                  />
                }
                label="Iodine"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allergies.sulfa}
                    onChange={handleAllergiesChange}
                    name="sulfa"
                  />
                }
                label="Sulfa"
              />
            </FormGroup>
          </Grid>
        </Grid>

        <Grid item container spacing={1}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="h4">Medical Conditions</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FormGroup row style={{ justifyContent: 'space-evenly' }}>
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
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="h4">Medications</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            {formData.medications.length === 0 ? (
              <Typography variant="subtitle1">Add Medications...</Typography>
            ) : (
              formData.medications.map((medication, i) => (
                <form
                  onSubmit={e => handleDelete(e, i)}
                  className={classes.inputContainer}
                >
                  <InputBase
                    key={i}
                    className={classes.list}
                    inputProps={{ style: { textAlign: 'center' } }}
                    readOnly={false}
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
          </Grid>
          <Grid item xs={12}>
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
                name="medications"
                value={addInfo.medications}
                onChange={e =>
                  setAddInfo({ ...addInfo, [e.target.name]: e.target.value })
                }
              />
              <IconButton type="submit" size="small">
                <AddIcon size="small" />
              </IconButton>
            </form>
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="h4">Past Surgeries</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            {formData.pastSurgeries.length === 0 ? (
              <Typography variant="subtitle1">Add Past Surgeries...</Typography>
            ) : (
              formData.pastSurgeries.map((surgery, i) => (
                <form
                  onSubmit={e => handleDelete(e, i)}
                  className={classes.inputContainer}
                >
                  <InputBase
                    key={i}
                    className={classes.list}
                    inputProps={{ style: { textAlign: 'center' } }}
                    readOnly={false}
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="h4">Special Notes</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => setDialogOpen(true)}
            >
              Add Note
            </Button>
            <Dialog
              maxWidth={'sm'}
              fullWidth={true}
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
            >
              <DialogTitle>Add a Note</DialogTitle>
              <DialogContent>
                <Typography variant="subtitle1" className={classes.inputLabel}>
                  Note Title
                </Typography>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={noteData.title}
                  onChange={e =>
                    setNoteData({ ...noteData, title: e.target.value })
                  }
                />
                <Typography variant="subtitle1" className={classes.inputLabel}>
                  Note Content
                </Typography>
                <TextField
                  fullWidth
                  rows={5}
                  variant="outlined"
                  multiline
                  value={noteData.content}
                  onChange={e =>
                    setNoteData({ ...noteData, content: e.target.value })
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleAddNote}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
