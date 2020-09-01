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
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  CircularProgress,
  Divider,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ProceduresSurfacesCard from './ProceduresSurfacesCard';
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
  procedureButton: {
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
export default function ProcedureSelectionDetails({
  selectedProcedure,
  procedureDetails,
  handleSubmitProcedures,
  settedProcedures,
  deleteSettedProcedure,
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
          Added procedures
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
                    Procedure
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
                  {settedProcedures.length === 0 && (
                    <TableRow>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell></TableCell>
                      <TableCell className={classes.gridHeadTitle}>
                        <Typography variant="subtitle1">
                          Select a Procedure
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                  {settedProcedures.length !== 0 &&
                    settedProcedures.map((procedure, i) => (
                      <TableRow key={i}>
                        <TableCell padding="checkbox">
                          <IconButton
                            size="small"
                            onClick={() =>
                              deleteSettedProcedure({
                                type: procedure.type,
                                option: procedure.option,
                              })
                            }
                          >
                            <HighlightOffIcon color="secondary" size="small" />
                          </IconButton>
                        </TableCell>
                        <TableCell className={classes.gridHeadTitle}>
                          {procedure.type}
                        </TableCell>
                        <TableCell className={classes.gridHeadTitle}>
                          {procedure.option}
                        </TableCell>
                        <TableCell className={classes.gridHeadTitle}>
                          {procedure.surfaces.map((surface, i) => (
                            <span key={i}>{surface}</span>
                          ))}
                        </TableCell>
                        <TableCell className={classes.gridHeadTitle}>
                          {procedure.date}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {settedProcedures.length !== 0 && (
              <Button
                fullWidth
                color="primary"
                onClick={handleSubmitProcedures}
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
