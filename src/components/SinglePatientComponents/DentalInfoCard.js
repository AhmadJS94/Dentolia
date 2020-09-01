import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Vector from '../../pages/Vector';
import Treatments from './Treatments';

import Actions from './DentalPage/Actions';

import ToothHistory from './DentalPage/ToothHistory';

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: '621px',
    minHeight: '621px',
    overflowY: 'auto',
  },
}));
export default function DentalInfoCard({ _id }) {
  const history = useHistory();
  const classes = useStyles();
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [settedProcedures, setSettedProcedures] = useState([]);
  const [settedConditions, setSettedConditions] = useState([]);

  const toggleToothClick = e => {
    const rect = e.currentTarget.querySelector('rect');
    const visibility = rect.getAttribute('visibility');
    const id = rect.getAttribute('id');

    if (visibility === 'visible') {
      setSelectedTooth(null);
    } else if (visibility === 'hidden') {
      setSelectedTooth(id);
    }
  };

  // const editProcedure = proc => {
  //   setSelectedTooth(`_${proc.tooth.slice(1, 3)}_select`);
  //   let sameToothProcedures = procedures.filter(item => {
  //     for (let key in proc) {
  //       if (proc['tooth'] === item['tooth']) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   });
  //   setSettedProcedures(sameToothProcedures);
  //   setProceduresDialogOpen(true);
  // };
  // const editCondition = proc => {
  //   setSelectedTooth(`_${proc.tooth.slice(1, 3)}_select`);
  //   let sameToothConditions = conditions.filter(item => {
  //     for (let key in proc) {
  //       if (proc['tooth'] === item['tooth']) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   });
  //   setSettedConditions(sameToothConditions);
  //   setConditionsDialogOpen(true);
  // };
  // const deleteProcedure = proc => {
  //   let newProcedures = [...procedures];
  //   newProcedures = procedures.filter(item => {
  //     for (let key in proc) {
  //       if (
  //         proc['detail'] === item['detail'] &&
  //         proc['tooth'] === item['tooth'] &&
  //         proc['type'] === item['type']
  //       ) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   });
  //   setProcedures(newProcedures);
  // };
  // const deleteCondition = proc => {
  //   let newConditions = [...conditions];
  //   newConditions = conditions.filter(item => {
  //     for (let key in proc) {
  //       if (
  //         proc['detail'] === item['detail'] &&
  //         proc['tooth'] === item['tooth'] &&
  //         proc['type'] === item['type']
  //       ) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   });
  //   setConditions(newConditions);
  // };

  return (
    <>
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={6} sm={4}>
          <Actions
            selectedTooth={selectedTooth}
            settedProcedures={settedProcedures}
            setSettedProcedures={setSettedProcedures}
            setSelectedTooth={setSelectedTooth}
            settedConditions={settedConditions}
            setSettedConditions={setSettedConditions}
            _id={_id}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <ToothHistory selectedTooth={selectedTooth} _id={_id} />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Vector
            toggleToothClick={toggleToothClick}
            selectedTooth={selectedTooth}
          />
        </Grid>
      </Grid>
      {/* <Treatments /> */}
    </>
  );
}
