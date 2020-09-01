import React from 'react';
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
  CircularProgress,
  Divider,
  TextField,
  MenuItem,
} from '@material-ui/core/';

import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import LeftSurfaceVector from '../../../vectors/LeftSurfaceVector';
import {
  DatePicker,
  Calendar,
  useStaticState,
  Month,
} from '@material-ui/pickers';
import moment from 'moment';

const rctOptions = ['Re-RCT', 'New RCT', 'Pulpectomy'];
const fillingOptions = ['Amalgam', 'Resin Composite', 'GIC', 'Zinc Phosphate'];
const extractionOptions = [
  'Non-Surgical Extraction',
  'Surgical Extraction',
  'Root Remains',
];
const crownOptions = ['PFM', 'Zirconia', 'E-MAX', 'Veneer'];

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '300px',
    maxHeight: '300px',
    overflowY: 'auto',
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
  procedureButton: {
    cursor: 'pointer',
    minWidth: '50px',

    height: '80px',
    // width: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    transition: 'ease 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.04)',
    },
  },
  detailsButton: {
    cursor: 'pointer',
    minWidth: '50px',
    display: 'grid',
    placeItems: 'center',
    height: '80px',
    // width: '75px',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.04)',
    },
  },
  selected: {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
}));
export default function ProceduresButtons({
  procedures,
  setselectedProcedure,
  selectedProcedure,
  setProcedureDetails,
  procedureDetails,
  addSelectedItemToGrid,
  selectedSurfaces,
  handleSurfaceClick,
  handleMouseLeave,
  handleMouseEnter,
  toothRef,
  setProcedureDate,
  procedureDate,
}) {
  const classes = useStyles();
  // const [value, handleDateChange] = React.useState(moment());

  return (
    <Paper className={classes.paper}>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          style={{ fontSize: '1em', fontWeight: 'bold' }}
        >
          Procedures
        </Typography>
      </Toolbar>
      <Divider />
      <div style={{ padding: '8px' }}>
        <Grid spacing={1} container>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Toolbar className={classes.toolbar}>
                <Typography
                  variant="h6"
                  style={{ fontSize: '1em', fontWeight: 'bold' }}
                >
                  Procedure Types
                </Typography>
              </Toolbar>

              <div
                style={{ padding: '8px', maxHeight: '189px', overflow: 'auto' }}
              >
                <Grid container spacing={1}>
                  {procedures.map((procedure, i) => (
                    <Grid
                      onClick={() => setselectedProcedure(procedure)}
                      key={i}
                      item
                      xs={6}
                    >
                      <Paper
                        elevation={3}
                        className={`${classes.procedureButton} ${
                          selectedProcedure === procedure && classes.selected
                        }`}
                      >
                        <LocalHospitalIcon />
                        <Typography variant="subtitle1">{procedure}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.innerPaper}>
              <Toolbar className={classes.toolbar}>
                <Typography
                  variant="h6"
                  style={{ fontSize: '1em', fontWeight: 'bold' }}
                >
                  Procedure options
                </Typography>
              </Toolbar>

              <div
                style={{ padding: '8px', maxHeight: '189px', overflow: 'auto' }}
              >
                <Grid container spacing={1}>
                  {!selectedProcedure && (
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                      <Typography variant="h6">
                        Select a procedure type
                      </Typography>
                    </Grid>
                  )}
                  {selectedProcedure === 'Crown' &&
                    crownOptions.map((option, i) => (
                      <Grid
                        onClick={() => {
                          setProcedureDetails(option);
                          // showProcedureInGrid(option);
                        }}
                        key={i}
                        item
                        xs={4}
                      >
                        <Paper
                          elevation={3}
                          className={`${classes.detailsButton} ${
                            procedureDetails === option && classes.selected
                          }`}
                        >
                          <Typography align="center" variant="subtitle2">
                            {option}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  {selectedProcedure === 'RCT' &&
                    rctOptions.map((option, i) => (
                      <Grid
                        onClick={() => {
                          setProcedureDetails(option);
                          // showProcedureInGrid();
                        }}
                        key={i}
                        item
                        xs={4}
                      >
                        <Paper
                          elevation={3}
                          className={`${classes.detailsButton} ${
                            procedureDetails === option && classes.selected
                          }`}
                        >
                          <Typography align="center" variant="subtitle2">
                            {option}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  {selectedProcedure === 'Filling' &&
                    fillingOptions.map((option, i) => (
                      <Grid
                        onClick={() => {
                          setProcedureDetails(option);
                          // showProcedureInGrid();
                        }}
                        key={i}
                        item
                        xs={4}
                      >
                        <Paper
                          elevation={3}
                          className={`${classes.detailsButton} ${
                            procedureDetails === option && classes.selected
                          }`}
                        >
                          <Typography align="center" variant="subtitle2">
                            {option}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  {selectedProcedure === 'Extraction' &&
                    extractionOptions.map((option, i) => (
                      <Grid
                        onClick={() => {
                          setProcedureDetails(option);
                          // showProcedureInGrid();
                        }}
                        key={i}
                        item
                        xs={4}
                      >
                        <Paper
                          elevation={3}
                          className={`${classes.detailsButton} ${
                            procedureDetails === option && classes.selected
                          }`}
                        >
                          <Typography align="center" variant="subtitle2">
                            {option}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Toolbar className={classes.toolbar}>
                <Typography
                  variant="h6"
                  style={{ fontSize: '1em', fontWeight: 'bold' }}
                >
                  Surfaces
                </Typography>
              </Toolbar>

              <LeftSurfaceVector
                handleSurfaceClick={handleSurfaceClick}
                handleMouseLeave={handleMouseLeave}
                handleMouseEnter={handleMouseEnter}
                toothRef={toothRef}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Toolbar className={classes.toolbar}>
                <Typography
                  variant="h6"
                  style={{ fontSize: '1em', fontWeight: 'bold' }}
                >
                  Selected Procedure
                </Typography>
              </Toolbar>

              <div
                style={{ padding: '8px', maxHeight: '189px', overflow: 'auto' }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography align="center" variant="subtitle2">
                      Procedure type :{' '}
                      {!selectedProcedure ? '-' : selectedProcedure}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" variant="subtitle2">
                      Procedure option :{' '}
                      {!procedureDetails ? '-' : procedureDetails}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" variant="subtitle2">
                      Selected surfaces : {selectedSurfaces.length === 0 && '-'}
                      {selectedSurfaces.map((surface, i) => (
                        <span key={i} style={{ fontSize: '0.875rem' }}>
                          {surface}
                        </span>
                      ))}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{ display: 'grid', placeItems: 'center' }}
                  >
                    <Typography align="center" variant="subtitle2">
                      Date:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <DatePicker
                      autoOk
                      value={procedureDate}
                      onChange={setProcedureDate}
                      name="date"
                      format="DD-MM-YYYY"
                      inputVariant="outlined"
                      variant="inline"
                      inputProps={{
                        style: { padding: '6px 0px', textAlign: 'center' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      onClick={addSelectedItemToGrid}
                      color="primary"
                      variant="contained"
                      disabled={!procedureDetails && true}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}
