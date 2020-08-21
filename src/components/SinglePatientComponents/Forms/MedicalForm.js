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
  List,
  ListItem,
  ListItemText,
  Slide,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import { KeyboardDatePicker } from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { green } from '@material-ui/core/colors';

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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
  container: {
    // marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  inputLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
  list: {
    alignSelf: 'center',
    border: '1px solid rgba(221, 216, 216, 0.7)',
    outline: '0',
    borderRadius: '7px',
    padding: '6px 3px 7px',
    transition: 'all 0.2s ease',

    '&:focus': {
      border: 'none',
      outline: '1px solid #555',
    },
    '&:hover': {
      border: '1px solid #555',
    },
  },

  noteList: {
    cursor: 'pointer',
    textAlign: 'center',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -9,
    marginLeft: -12,
  },
}));
export default function MedicalForm(props) {
  const { _id } = useParams();
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [newNoteDialogOpen, setNewNoteDialogOpen] = useState(false);
  const [notePreviewDialogOpen, setNotePreviewDialogOpen] = useState(false);
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
  });
  const [noteEdit, setNoteEdit] = useState(false);
  const [formData, setFormData] = useState({
    patientName: 'Ahmad Zaaza',
    date: moment(),
    bloodType: '',
    medications: [],
    pastSurgeries: [],
  });
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  const toggleSuccessSnackBar = () => {
    setSuccessSnackBarOpen(!successSnackBarOpen);
  };
  const toggleErrorSnackBar = () => {
    setErrorSnackBarOpen(!errorSnackBarOpen);
  };
  const handleBloodTypeChange = e => {
    setFormData({
      ...formData,
      bloodType: e.target.value,
    });
  };
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
  const [socialHabits, setSocialHabits] = useState({
    smoking: false,
    alcohol: false,
    soda: false,
    nuts: false,
  });
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
    pregnancy: false,
    kidneyDisease: false,
    heartProblems: false,
    heartStroke: false,
  });
  const [addInfo, setAddInfo] = useState({
    medications: '',
    pastSurgeries: '',
  });
  const handleAddNote = () => {
    let note = [...notes];
    note.push(noteData);
    setNotes(note);
    setNewNoteDialogOpen(false);
    setNoteData({ title: '', content: '' });
  };
  const handleNoteEdit = i => {
    let note = [...notes];
    note[i] = { title: noteData.title, content: noteData.content };
    setNotes(note);
    setNoteData({ title: '', content: '' });
    setNotePreviewDialogOpen(false);
    setNoteEdit(false);
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
  const handleHabitsChange = e => {
    setSocialHabits({
      ...socialHabits,
      [e.target.name]: e.target.checked,
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
  let config = {
    headers: {
      authorization: `Bearer ${localStorage.token}`,
    },
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
      socialHabits: socialHabits,
      bloodType: formData.bloodType,
    };
    setLoading(true);
    axios
      .post(
        `http://localhost:5000/api/patients/${_id}/forms/medical`,
        data,
        config
      )
      .then(res => {
        if (res.data.message === 'Success') {
          setLoading(false);
          toggleSuccessSnackBar();
        } else {
          setLoading(false);
          toggleErrorSnackBar();
        }
      });
  };

  return (
    <>
      <Snackbar
        open={successSnackBarOpen}
        autoHideDuration={4500}
        onClose={toggleSuccessSnackBar}
      >
        <Alert severity="success">Medical Form Created Successfully</Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackBarOpen}
        autoHideDuration={4500}
        onClose={toggleErrorSnackBar}
      >
        <Alert severity="error">Something went Wrong, Please try again</Alert>
      </Snackbar>
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
                    checked={allergies.heartStroke}
                    onChange={handleConditionsChange}
                    name="heartStroke"
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
            <Typography variant="h4">Social Habits</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FormGroup row style={{ justifyContent: 'space-evenly' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={socialHabits.smoking}
                    onChange={handleHabitsChange}
                    name="smoking"
                  />
                }
                label="Smoking"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={socialHabits.alcohol}
                    onChange={handleHabitsChange}
                    name="alcohol"
                  />
                }
                label="Alcohol"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={socialHabits.nuts}
                    onChange={handleHabitsChange}
                    name="nuts"
                  />
                }
                label="Nuts"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={socialHabits.soda}
                    onChange={handleHabitsChange}
                    name="soda"
                  />
                }
                label="Soda"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="h4">Special Notes</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item container justify="center" xs={12}>
            <Grid item xs={4} style={{ textAlign: 'center' }}>
              {notes.length === 0 ? (
                <Typography variant="subtitle1">No Notes</Typography>
              ) : (
                <List>
                  {notes.map((note, i) => (
                    <>
                      <ListItem
                        onClick={() => {
                          setNotePreviewDialogOpen(true);
                          setNoteData({
                            title: note.title,
                            content: note.content,
                          });
                        }}
                        button
                        className={classes.noteList}
                        key={i}
                      >
                        <ListItemText
                          primary={note.title}
                          secondary={note.content}
                        />
                      </ListItem>
                      <Dialog
                        TransitionComponent={Transition}
                        maxWidth={'sm'}
                        fullWidth={true}
                        open={notePreviewDialogOpen}
                        onClose={() => setNotePreviewDialogOpen(false)}
                      >
                        <DialogTitle>
                          <Typography align="center" variant="h6">
                            Note Details
                          </Typography>
                        </DialogTitle>
                        <DialogContent>
                          <Typography
                            variant="subtitle1"
                            className={classes.inputLabel}
                          >
                            Note Title :
                          </Typography>
                          <InputBase
                            fullWidth
                            readOnly={noteEdit ? false : true}
                            variant="outlined"
                            value={noteData.title}
                            className={noteEdit && classes.list}
                            name="title"
                            onChange={e =>
                              setNoteData({
                                ...noteData,
                                title: e.target.value,
                              })
                            }
                          />
                          <Typography
                            variant="subtitle1"
                            className={classes.inputLabel}
                          >
                            Note Content :
                          </Typography>
                          <InputBase
                            fullWidth
                            name="content"
                            rows={5}
                            variant="outlined"
                            multiline
                            value={noteData.content}
                            className={noteEdit && classes.list}
                            onChange={e =>
                              setNoteData({
                                ...noteData,
                                content: e.target.value,
                              })
                            }
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => setNoteEdit(!noteEdit)}
                            variant="contained"
                            endIcon={<EditIcon />}
                            size="small"
                          >
                            Edit Note
                          </Button>
                          {noteEdit && (
                            <Button
                              color="primary"
                              onClick={() => handleNoteEdit(i)}
                            >
                              Save
                            </Button>
                          )}
                          <Button
                            color="primary"
                            onClick={() => {
                              setNewNoteDialogOpen(false);
                              setNoteData({ title: '', content: '' });
                            }}
                          >
                            Cancel
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  ))}
                </List>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button
              color="primary"
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => setNewNoteDialogOpen(true)}
            >
              Add Note
            </Button>
            <Dialog
              TransitionComponent={Transition}
              maxWidth={'sm'}
              fullWidth={true}
              open={newNoteDialogOpen}
              onClose={() => setNewNoteDialogOpen(false)}
            >
              <DialogTitle>
                <Typography variant="h6" align="center">
                  New Note
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Typography variant="subtitle1" className={classes.inputLabel}>
                  Note Title :
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
                  Note Content :
                </Typography>
                <TextField
                  fullWidth
                  margin="dense"
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
                <Button color="primary" onClick={handleAddNote}>
                  Save
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    setNewNoteDialogOpen(false);
                    setNoteData({ title: '', content: '' });
                  }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="h4">Blood Type</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Select
              value={formData.bloodType}
              onChange={handleBloodTypeChange}
              style={{ padding: 0 }}
            >
              {bloodTypes.map((type, i) => (
                <MenuItem key={i} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ textAlign: 'center', position: 'relative' }}
        >
          <Button
            disabled={isLoading && true}
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Submit Form
          </Button>
          {isLoading && (
            <CircularProgress size={20} className={classes.buttonProgress} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
