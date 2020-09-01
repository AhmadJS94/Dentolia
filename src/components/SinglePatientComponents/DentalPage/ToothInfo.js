import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'react-query';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import axios from 'axios';
import {
  IconButton,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  CircularProgress,
} from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '300px',
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
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '90px',
    marginLeft: '-20px',
  },
}));
let config = {
  headers: {
    authorization: `Bearer ${localStorage.token}`,
  },
};
const fetchToothData = async (key, _id, selectedTooth) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/patients/${_id}/dental/info/tooth_${selectedTooth.slice(
        1,
        3
      )}`,
      config
    );
    console.log(response.data);
    return response.data.info;
  } catch (error) {
    console.log(error);
  }
};
export default function ToothInfo({ selectedTooth, _id }) {
  const classes = useStyles();
  const { data, status } = useQuery(
    ['toothData', _id, selectedTooth],
    fetchToothData,
    {
      cacheTime: '1680000',
    }
  );

  if (status === 'loading')
    return <CircularProgress className={classes.progress} />;
  if (status === 'error') return <div>Something went wrong</div>;
  if (status === 'success')
    return (
      <TableContainer style={{ maxHeight: '252px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableCell padding="checkbox" style={{ width: '0px' }}></TableCell>
            <TableCell className={classes.gridHeadTitle}>Type</TableCell>
            <TableCell className={classes.gridHeadTitle}>Name</TableCell>
            <TableCell className={classes.gridHeadTitle}>Surfaces</TableCell>
            <TableCell className={classes.gridHeadTitle}>Date</TableCell>
          </TableHead>
          <TableBody>
            {data.length !== 0 ? (
              data.map((item, i) => (
                <TableRow key={i}>
                  <TableCell padding="checkbox" style={{ width: '0px' }}>
                    <IconButton
                      size="small"
                      //  onClick={() =>
                      //      deleteCondition({
                      //      tooth: condition.tooth,
                      //      type: condition.type,
                      //      detail: condition.detail,
                      //      })
                      //  }
                    >
                      <HighlightOffIcon size="small" color="secondary" />
                    </IconButton>
                    <IconButton
                      size="small"
                      //  onClick={() =>
                      //      editCondition({
                      //      tooth: condition.tooth,
                      //      type: condition.type,
                      //      detail: condition.detail,
                      //      date: condition.date,
                      //      })
                      //  }
                    >
                      <EditIcon size="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell className={classes.gridHeadTitle}>
                    {item.from}
                  </TableCell>

                  <TableCell className={classes.gridHeadTitle}>
                    {item.type} - {item.detail}
                  </TableCell>
                  <TableCell className={classes.gridHeadTitle}>
                    {item.surfaces.length === 0 && '-'}
                    {item.surfaces.length !== 0 &&
                      item.surfaces.map((surface, j) => (
                        <span key={j}>{surface}</span>
                      ))}
                  </TableCell>
                  <TableCell className={classes.gridHeadTitle}>
                    {item.date}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className={classes.gridHeadTitle}>
                  No added procedures or conditions
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
