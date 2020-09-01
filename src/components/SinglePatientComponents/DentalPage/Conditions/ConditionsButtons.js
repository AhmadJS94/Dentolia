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
  Divider,
  TextField,
  MenuItem,
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import LeftSurfaceVector from '../../../../vectors/LeftSurfaceVector';
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
  conditionButton: {
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
export default function ConditionsButtons({
  conditions,
  setselectedCondition,
  selectedCondition,
  setConditionDetails,
  conditionDetails,
  addSelectedItemToGrid,
  selectedSurfaces,
  handleSurfaceClick,
  handleMouseLeave,
  handleMouseEnter,
  toothRef,
  setConditionDate,
  conditionDate,
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
          Conditions
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
                  Condition Types
                </Typography>
              </Toolbar>

              <div
                style={{ padding: '8px', maxHeight: '189px', overflow: 'auto' }}
              >
                <Grid container spacing={1}>
                  {conditions.map((condition, i) => (
                    <Grid
                      onClick={() => setselectedCondition(condition)}
                      key={i}
                      item
                      xs={6}
                    >
                      <Paper
                        elevation={3}
                        className={`${classes.conditionButton} ${
                          selectedCondition === condition && classes.selected
                        }`}
                      >
                        <LocalHospitalIcon />
                        <Typography variant="subtitle1">{condition}</Typography>
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
                  Condition options
                </Typography>
              </Toolbar>

              <div
                style={{ padding: '8px', maxHeight: '189px', overflow: 'auto' }}
              >
                <Grid container spacing={1}>
                  {!selectedCondition && (
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                      <Typography variant="h6">
                        Select a Condition type
                      </Typography>
                    </Grid>
                  )}
                  {selectedCondition === 'Crown' &&
                    crownOptions.map((option, i) => (
                      <Grid
                        onClick={() => {
                          setConditionDetails(option);
                        }}
                        key={i}
                        item
                        xs={4}
                      >
                        <Paper
                          elevation={3}
                          className={`${classes.detailsButton} ${
                            conditionDetails === option && classes.selected
                          }`}
                        >
                          <Typography align="center" variant="subtitle2">
                            {option}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  {selectedCondition === 'RCT' &&
                    rctOptions.map((option, i) => (
                      <Grid
                        onClick={() => {
                          setConditionDetails(option);
                        }}
                        key={i}
                        item
                        xs={4}
                      >
                        <Paper
                          elevation={3}
                          className={`${classes.detailsButton} ${
                            conditionDetails === option && classes.selected
                          }`}
                        >
                          <Typography align="center" variant="subtitle2">
                            {option}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  {selectedCondition === 'Filling' &&
                    fillingOptions.map((option, i) => (
                      <Grid
                        onClick={() => {
                          setConditionDetails(option);
                        }}
                        key={i}
                        item
                        xs={4}
                      >
                        <Paper
                          elevation={3}
                          className={`${classes.detailsButton} ${
                            conditionDetails === option && classes.selected
                          }`}
                        >
                          <Typography align="center" variant="subtitle2">
                            {option}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  {selectedCondition === 'Extraction' &&
                    extractionOptions.map((option, i) => (
                      <Grid
                        onClick={() => {
                          setConditionDetails(option);
                        }}
                        key={i}
                        item
                        xs={4}
                      >
                        <Paper
                          elevation={3}
                          className={`${classes.detailsButton} ${
                            conditionDetails === option && classes.selected
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
                  Selected Condition
                </Typography>
              </Toolbar>
              <Divider />
              <div
                style={{ padding: '8px', maxHeight: '189px', overflow: 'auto' }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography align="center" variant="subtitle2">
                      Condition type: {selectedCondition}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" variant="subtitle2">
                      Condition option:{conditionDetails}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" variant="subtitle2">
                      Selected surfaces :
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
                      value={conditionDate}
                      onChange={setConditionDate}
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
                      disabled={!conditionDetails && true}
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
