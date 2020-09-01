import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
  Toolbar,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  CircularProgress,
  Divider,
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '294px',
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
    // padding: theme.spacing(2),
  },
  conditionButton: {
    cursor: 'pointer',
    minWidth: '50px',
    marginTop: theme.spacing(1),
    height: '50px',
    // width: '150px',
    transition: 'ease 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.04)',
    },
  },
}));
export default function ConditionSelectionDetails({
  selectedCondition,
  conditionDetails,
  handleSubmitConditions,
  settedConditions,
  deleteSettedCondition,
}) {
  const classes = useStyles();

  // you can past mostly all available props, like minDate, maxDate, autoOk and so on
  // const { pickerProps, wrapperProps } = useStaticState({
  //   value,
  //   onChange: handleDateChange,
  // });

  return (
    <Paper className={classes.paper}>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          style={{ fontSize: '1em', fontWeight: 'bold' }}
        >
          Added conditions
        </Typography>
      </Toolbar>
      <Divider />
      <div style={{ padding: '8px' }}>
        <Grid spacing={1} container>
          <Grid item xs={12}>
            <TableContainer style={{ maxHeight: '180px' }}>
              <Table stickyHeader aria-label="collapsible table">
                <TableHead>
                  <TableCell padding="checkbox" />
                  <TableCell className={classes.gridHeadTitle}>
                    Condition
                  </TableCell>
                  <TableCell className={classes.gridHeadTitle}>
                    Details
                  </TableCell>
                  <TableCell className={classes.gridHeadTitle}>
                    Surfaces
                  </TableCell>
                  <TableCell className={classes.gridHeadTitle}>Date</TableCell>
                </TableHead>
                <TableBody>
                  {settedConditions.length === 0 && (
                    <TableRow>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell></TableCell>
                      <TableCell className={classes.gridHeadTitle}>
                        <Typography variant="subtitle1">
                          Select a Condition
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                  {settedConditions.length !== 0 &&
                    settedConditions.map((condition, i) => (
                      <TableRow key={i}>
                        <TableCell padding="checkbox">
                          <IconButton
                            size="small"
                            onClick={() =>
                              deleteSettedCondition({
                                type: condition.type,
                                option: condition.option,
                              })
                            }
                          >
                            <HighlightOffIcon color="secondary" size="small" />
                          </IconButton>
                        </TableCell>
                        <TableCell className={classes.gridHeadTitle}>
                          {condition.type}
                        </TableCell>
                        <TableCell className={classes.gridHeadTitle}>
                          {condition.option}
                        </TableCell>
                        <TableCell className={classes.gridHeadTitle}>
                          {condition.surfaces.map((surface, i) => (
                            <span key={i}>{surface}</span>
                          ))}
                        </TableCell>
                        <TableCell className={classes.gridHeadTitle}>
                          {condition.date}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {settedConditions.length !== 0 && (
              <Button
                fullWidth
                color="primary"
                onClick={handleSubmitConditions}
                style={{ marginTop: '8px' }}
                variant="contained"
              >
                Submit
              </Button>
            )}
          </Grid>
          {/* <Grid item={12}>
            <Calendar {...pickerProps} />
          </Grid> */}
        </Grid>
      </div>
    </Paper>
  );
}
