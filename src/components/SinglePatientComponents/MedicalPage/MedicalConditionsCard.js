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
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
// const useRowStyles = makeStyles({
//   root: {
//     '& > *': {
//       borderBottom: 'unset',
//     },
//     cursor: 'pointer',
//     padding: 0,
//   },
//   rowCell: {
//     fontSize: '1.2em',
//     padding: '8px',
//     textAlign: 'center',
//   },
//   buttonsContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-evenly',
//     // alignItems: 'center',
//   },
//   innerContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     flexWrap: 'wrap',
//   },
//   innerToolbar: {
//     padding: '4px',
//     minHeight: '24px',
//     justifyContent: 'center',
//   },
//   innerHeadCell: {
//     padding: '4px',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: '1.2em',
//     // borderBottom: '1px solid rgb(119, 110, 110)',
//   },
//   innerRowCell: {
//     padding: '4px',
//     textAlign: 'center',
//     fontSize: '1.1em',
//     // borderBottom: '1px solid rgb(119, 110, 110)',
//   },
// });
// function Row(props) {
//   const { row } = props;
//   // const [open, setOpen] = React.useState(false);
//   const classes = useRowStyles();

//   return (
//     <TableRow className={classes.root}>
//       <TableCell className={classes.rowCell}>{row.name}</TableCell>
//       <TableCell className={classes.rowCell}>{row.hour}</TableCell>
//       <TableCell className={classes.rowCell}>{row.duration}</TableCell>
//     </TableRow>
//   );
// }
const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '300px',
    overflowY: 'auto',
    // maxHeight: '300px',
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
  addButton: {
    minWidth: '0',
    padding: '0px',
  },
}));
export default function MedicalConditionsCard({ medicalForm }) {
  const classes = useStyles();
  const getMedicalConditions = () => {
    const arr = [];
    // console.log(medicalForm.date);
    for (let item in medicalForm.medicalConditions) {
      if (medicalForm.medicalConditions[item]) {
        arr.push(
          <TableRow>
            <TableCell className={classes.gridHeadTitle}>{item}</TableCell>
          </TableRow>
        );
      }
    }
    if (arr.length === 0) {
      return (
        <TableRow>
          <TableCell>No Medical conditions were mentioned</TableCell>
        </TableRow>
      );
    } else {
      return arr;
    }
  };
  return (
    <Paper className={classes.paper}>
      <Toolbar disableGutters="true" className={classes.toolbar}>
        <Typography
          variant="h6"
          style={{ fontSize: '1.2em', fontWeight: 'bold' }}
        >
          Medical Conditions
        </Typography>
        {/* <Button
          color="primary"
          size="small"
          className={classes.addButton}
          variant="contained"
        >
          <AddIcon size="small" />
        </Button> */}
      </Toolbar>
      <Divider />
      <TableContainer style={{ maxHeight: '248px' }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            {/* <TableRow style={{ padding: 0 }}> */}
            <TableCell className={classes.gridHeadTitle}>Name</TableCell>
            {/* <TableCell className={classes.gridHeadTitle}>Date</TableCell> */}
            {/* </TableRow> */}
          </TableHead>
          <TableBody>
            {getMedicalConditions()}
            {/* {medicalForms.length === 0 ? <Typography variant='h6'>No Medications were Mentioned</Typography> : (medicalForms.map((form, i) => (
              <TableRow>
                <TableCell className={classes.gridHeadTitle}>
                  {form.type}
                </TableCell>
                <TableCell className={classes.gridHeadTitle}>
                  {form.date}
                </TableCell>
              </TableRow>
            )))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}