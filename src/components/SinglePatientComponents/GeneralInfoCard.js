import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

export default function GeneralInfoCard() {
  return (
    <Grid item xs="12" sm="3">
      <Paper>
        <Typography align="center" variant="h6">
          General Info
        </Typography>
        <Divider />
        <List dense="true">
          <ListItem dense={true}>
            <ListItemText primary="Age" secondary="27"></ListItemText>
          </ListItem>
          <ListItem dense={true}>
            <ListItemText primary="Gender" secondary="Male"></ListItemText>
          </ListItem>
          <ListItem dense={true}>
            <ListItemText
              primary="Last visit"
              secondary="27/8/2019"
            ></ListItemText>
          </ListItem>
          <ListItem dense={true}>
            <ListItemText
              primary="first visit"
              secondary="21/10/2018"
            ></ListItemText>
            <ListItemSecondaryAction>
              <IconButton size="small">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
}
