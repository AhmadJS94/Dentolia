import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import {
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Grid,
  Typography,
  Button,
  Divider,
  ListSubheader,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

export default function MedicalRecordCard({ style }) {
  return (
    <Grid item xs="12" sm="3">
      <Paper style={{ height: '100%' }}>
        <Typography align="center" variant="h6">
          Medical Info
        </Typography>
        <Divider />

        <List dense={true} className={style.listStyle} subheader={<li />}>
          {[0, 1, 2, 3, 4].map(section => (
            <li key={section} className={style.listSection}>
              <ul className={style.ul}>
                <ListSubheader
                  style={{
                    color: '#222',
                    fontWeight: '400',
                    background: 'inherit',
                  }}
                >
                  {'Medication'}
                </ListSubheader>
                {[0, 1, 2].map(item => (
                  <ListItem key={item}>
                    <ListItemText primary="bromonase" />
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>
      </Paper>
    </Grid>
  );
}

{
  /* <List style={style} dense={true}>
          <ListItem>
            <ListItemText primary="Age" secondary="27"></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Allergies"
              secondary="None - latex allergy"
            ></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Medication"
              secondary="Bromonase"
            ></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Past Surgeries"
              secondary="21/10/2018"
            ></ListItemText>
            <ListItemSecondaryAction>
              <IconButton size="small">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List> */
}
