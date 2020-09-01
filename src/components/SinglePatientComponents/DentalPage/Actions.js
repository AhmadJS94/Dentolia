import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  CardContent,
  Button,
  IconButton,
  Grid,
  Paper,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  CircularProgress,
  Divider,
  AppBar,
} from '@material-ui/core/';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ProceduresSurfacesCard from './ProceduresSurfacesCard';
import ProceduresButtons from './ProceduresButtons';
import ProcedureSelectionDetails from './ProcedureSelectionDetails';
import ConditionsButtons from './Conditions/ConditionsButtons';
import ConditionSelectionDetails from './Conditions/ConditionSelectionDetails';
import axios from 'axios';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '300px',
    maxHeight: '300px',
    overflowY: 'auto',
    // padding: '8px',
  },
  gridHeadTitle: {
    fontSize: '1em',
    fontWeight: 'bold',
    padding: '8px 0px',
    textAlign: 'center',
  },
  toolbar: {
    minHeight: '47px',
    display: 'flex',
    justifyContent: 'space-around',
    // padding: '16px',
  },
  innerGrid: {
    padding: theme.spacing(2),
  },
  actionButton: {
    minWidth: '186px',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(1),
    lineHeight: '1.50',
  },

  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  appBar: {
    position: 'relative',
  },
  dialogPaper: {
    minHeight: '626px',
    maxHeight: '626px',

    overflow: 'auto',
  },
}));
export default function Actions({
  selectedTooth,
  // addProcedures,
  // addConditions,
  settedProcedures,
  setSettedProcedures,
  // setProceduresDialogOpen,
  // proceduresDialogOpen,
  setSelectedTooth,
  setSettedConditions,
  settedConditions,
  // setConditionsDialogOpen,
  // conditionsDialogOpen,
  _id,
}) {
  const [proceduresDialogOpen, setProceduresDialogOpen] = useState(false);
  const [conditionsDialogOpen, setConditionsDialogOpen] = useState(false);
  const [selectedProcedure, setselectedProcedure] = useState(null);
  const [selectedCondition, setselectedCondition] = useState(null);
  const [procedureDetails, setProcedureDetails] = useState(null);
  const [conditionDetails, setConditionDetails] = useState(null);
  const [procedureDate, setProcedureDate] = useState(moment());
  const [conditionDate, setConditionDate] = useState(moment());

  const [selectedSurfaces, setSelectedSurfaces] = useState([]);
  const [isSurfaceClicked, setIsClicked] = useState({
    mesial: false,
    distal: false,
    occlusial: false,
    buccal: false,
    lingual: false,
  });
  const [isSurfaceHovered, setIsHovered] = useState({
    mesial: false,
    distal: false,
    occlusial: false,
    buccal: false,
    lingual: false,
  });
  const toothRef = useRef(null);
  const procedures = ['RCT', 'Filling', 'Extraction', 'Crown'];
  const conditions = ['RCT', 'Filling', 'Extraction', 'Crown'];
  const classes = useStyles();
  let config = {
    headers: {
      authorization: `Bearer ${localStorage.token}`,
    },
  };
  //Surfaces functions
  const handleSurfaceClick = e => {
    console.log(e.target);
    let surface;

    // eslint-disable-next-line default-case
    switch (e.target.id) {
      case 'mesial':
        surface = 'M';
        break;
      case 'distal':
        surface = 'D';
        break;

      case 'buccal':
        surface = 'B';
        break;
      case 'lingual':
        surface = 'L';
        break;
      case 'occlusial':
        surface = 'O';
        break;
    }

    if (isSurfaceHovered[e.target.id] && !isSurfaceClicked[e.target.id]) {
      e.target.setAttribute('fill', 'rgba(210,67,96,0.43)');
      setIsClicked({
        ...isSurfaceClicked,
        [e.target.id]: true,
      });
    } else if (isSurfaceHovered[e.target.id] && isSurfaceClicked[e.target.id]) {
      e.target.setAttribute('fill', 'f9f6f6');
      setIsClicked({
        ...isSurfaceClicked,
        [e.target.id]: false,
      });
    }

    //arranging surfaces names
    let surfaces = [...selectedSurfaces];
    if (surfaces.length === 0) {
      surfaces.push(surface);
      setSelectedSurfaces(surfaces);
    } else if (surfaces.indexOf(surface) === -1) {
      surfaces.push(surface);
      setSelectedSurfaces(surfaces);
    } else if (surfaces.indexOf(surface !== -1)) {
      surfaces = surfaces.filter(x => x !== surface);
      setSelectedSurfaces(surfaces);
    }
  };

  const handleMouseEnter = e => {
    if (!isSurfaceClicked[e.target.id]) {
      e.target.setAttribute('fill', 'rgba(210,67,96,0.43)');
      setIsHovered({
        ...isSurfaceHovered,
        [e.target.id]: true,
      });
    }
  };
  const handleMouseLeave = e => {
    if (!isSurfaceClicked[e.target.id]) {
      e.target.setAttribute('fill', '#f9f6f6');
      setIsHovered({
        ...isSurfaceHovered,
        [e.target.id]: false,
      });
    }
  };
  //end of surfaces functions
  const handleSubmitProcedures = async () => {
    let procedures = [];
    settedProcedures.forEach(proc => {
      procedures.push({
        type: proc.type,
        option: proc.detail,
        tooth: `tooth_${selectedTooth.slice(1, 3)}`,
        surfaces: proc.surfaces,
        date: proc.date,
      });
    });
    let data = {
      procedures,
    };
    console.log(procedures);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/patients/${_id}/dental/procedures/add`,
        data,
        config
      );
      console.log(response);
      if (response.data.message === 'success') {
        setProceduresDialogOpen(false);
        setselectedProcedure(null);
        setSettedProcedures([]);
        setSelectedSurfaces([]);
        setSelectedTooth(null);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  // addProcedures(procedures);

  const handleSubmitConditions = async () => {
    let conditions = [];
    settedConditions.forEach(proc => {
      conditions.push({
        type: proc.type,
        option: proc.option,
        tooth: `tooth_${selectedTooth.slice(1, 3)}`,
        surfaces: proc.surfaces,
        date: proc.date,
      });
    });
    let data = {
      conditions,
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/patients/${_id}/dental/conditions/add`,
        data,
        config
      );
      console.log(response);
      if (response.data.message === 'success') {
        setConditionsDialogOpen(false);
        setselectedCondition(null);
        setSettedConditions([]);
        setSelectedSurfaces([]);
        setSelectedTooth(null);
      }
    } catch (error) {
      console.log(error.response.data);
    }

    // addConditions(conditions);
  };

  const addSelectedItemToGrid = () => {
    if (selectedProcedure && procedureDetails) {
      let procedures = [...settedProcedures];
      let procedure = {
        type: selectedProcedure,
        option: procedureDetails,
        surfaces: selectedSurfaces,
        date: procedureDate.format('DD-MM-YYYY'),
      };

      procedures.push(procedure);
      setSettedProcedures(procedures);
      setselectedProcedure(null);
      setProcedureDetails(null);
      setSelectedSurfaces([]);
      setProcedureDate(moment());

      setIsClicked({
        mesial: false,
        distal: false,
        occlusial: false,
        buccal: false,
        lingual: false,
      });
      setIsHovered({
        mesial: false,
        distal: false,
        occlusial: false,
        buccal: false,
        lingual: false,
      });
    } else if (selectedCondition && conditionDetails) {
      let conditions = [...settedConditions];
      let condition = {
        type: selectedCondition,
        option: conditionDetails,
        surfaces: selectedSurfaces,
        date: conditionDate.format('DD-MM-YYYY'),
      };

      conditions.push(condition);
      setSettedConditions(conditions);
      setselectedCondition(null);
      setConditionDetails(null);
      setSelectedSurfaces([]);
      setConditionDate(moment());

      setIsClicked({
        mesial: false,
        distal: false,
        occlusial: false,
        buccal: false,
        lingual: false,
      });
      setIsHovered({
        mesial: false,
        distal: false,
        occlusial: false,
        buccal: false,
        lingual: false,
      });
    }
  };
  useEffect(() => {
    if (selectedProcedure) {
      setProcedureDetails(null);
    } else if (selectedCondition) {
      setConditionDetails(null);
    }
  }, [selectedProcedure, selectedCondition]);
  useEffect(() => {
    if (toothRef.current) {
      let paths = toothRef.current.querySelectorAll('path');
      paths.forEach(path => {
        if (path.getAttribute('id')) {
          path.setAttribute('fill', '#f9f6f6');
        }
      });
    }
  }, [settedProcedures, settedConditions]);

  const deleteSettedProcedure = proc => {
    let newProcedures = [...settedProcedures];
    newProcedures = settedProcedures.filter(item => {
      for (let key in proc) {
        if (
          proc['option'] === item['option'] &&
          proc['type'] === item['type']
        ) {
          return false;
        }
      }
      return true;
    });
    setSettedProcedures(newProcedures);
  };
  const deleteSettedCondition = proc => {
    let newConditions = [...settedConditions];
    newConditions = settedConditions.filter(item => {
      for (let key in proc) {
        if (
          proc['option'] === item['option'] &&
          proc['type'] === item['type']
        ) {
          return false;
        }
      }
      return true;
    });
    setSettedConditions(newConditions);
  };

  const handleConditionsDialogClose = () => {
    setConditionsDialogOpen(false);
    setselectedCondition(null);
    setConditionDetails(null);
    setSettedConditions([]);
    setSelectedSurfaces([]);
  };
  const handleProcedureDialogClose = () => {
    setProceduresDialogOpen(false);
    setselectedProcedure(null);
    setProcedureDetails(null);
    setSettedProcedures([]);
    setSelectedSurfaces([]);
  };

  return (
    <Paper className={classes.paper}>
      <Dialog
        fullScreen
        onClose={handleProcedureDialogClose}
        open={proceduresDialogOpen}
        TransitionComponent={Transition}
        // PaperProps={{ style: { padding: '8px' } }}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleProcedureDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add a Procedure for{' '}
              {`#${selectedTooth && selectedTooth.slice(1, 3)}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.dialogPaper}>
          <div style={{ padding: '8px' }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ProceduresButtons
                  procedures={procedures}
                  setselectedProcedure={setselectedProcedure}
                  selectedProcedure={selectedProcedure}
                  setProcedureDetails={setProcedureDetails}
                  procedureDetails={procedureDetails}
                  addSelectedItemToGrid={addSelectedItemToGrid}
                  selectedSurfaces={selectedSurfaces}
                  handleSurfaceClick={handleSurfaceClick}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  toothRef={toothRef}
                  procedureDate={procedureDate}
                  setProcedureDate={setProcedureDate}
                />
              </Grid>

              <Grid item xs={12}>
                <ProcedureSelectionDetails
                  selectedProcedure={selectedProcedure}
                  procedureDetails={procedureDetails}
                  handleSubmitProcedures={handleSubmitProcedures}
                  settedProcedures={settedProcedures}
                  deleteSettedProcedure={deleteSettedProcedure}
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Dialog>
      <Dialog
        fullScreen
        onClose={handleConditionsDialogClose}
        open={conditionsDialogOpen}
        TransitionComponent={Transition}
        // PaperProps={{ style: { padding: '8px' } }}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleConditionsDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add a Condition for{' '}
              {`#${selectedTooth && selectedTooth.slice(1, 3)}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.dialogPaper}>
          <div style={{ padding: '8px' }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ConditionsButtons
                  conditions={conditions}
                  setselectedCondition={setselectedCondition}
                  selectedCondition={selectedCondition}
                  setConditionDetails={setConditionDetails}
                  conditionDetails={conditionDetails}
                  addSelectedItemToGrid={addSelectedItemToGrid}
                  selectedSurfaces={selectedSurfaces}
                  handleSurfaceClick={handleSurfaceClick}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  toothRef={toothRef}
                  conditionDate={conditionDate}
                  setConditionDate={setConditionDate}
                />
              </Grid>

              <Grid item xs={12}>
                <ConditionSelectionDetails
                  selectedConditions={selectedCondition}
                  conditionDetails={conditionDetails}
                  handleSubmitConditions={handleSubmitConditions}
                  settedConditions={settedConditions}
                  deleteSettedCondition={deleteSettedCondition}
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Dialog>

      <Toolbar disableGutters="true" className={classes.toolbar}>
        <Typography
          variant="h6"
          style={{ fontSize: '1.5em', fontWeight: 'bold' }}
        >
          Actions
        </Typography>
      </Toolbar>
      <Divider />
      <Grid className={classes.innerGrid} container direction="row">
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          {!selectedTooth && (
            <Typography variant="subtitle1">
              Select a Tooth to get started
            </Typography>
          )}
          {selectedTooth && (
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              Selected Tooth : {`#${selectedTooth.slice(1, 3)}`}
            </Typography>
          )}
        </Grid>
        {selectedTooth && (
          <Grid container justify="space-evenly" item xs={12}>
            <Button
              startIcon={<AddIcon />}
              className={classes.actionButton}
              variant="contained"
              color="primary"
              onClick={() => setProceduresDialogOpen(true)}
            >
              Add Procedure
            </Button>
            <Button
              startIcon={<AddIcon />}
              className={classes.actionButton}
              variant="contained"
              color="primary"
              onClick={() => setConditionsDialogOpen(true)}
            >
              Add Condition
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
