import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useAppState } from '../../state';

import Button from '@material-ui/core/Button';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100vh',
    background: '#FFFFFF',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: "100vh",
    height: "auto",
    align: "center"
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '2em',
    marginTop: '8em',
    background: 'white',
    color: 'black',
  },
  button: {
    color: 'black',
    background: 'white',
    margin: '0.8em 0 0.7em',
    textTransform: 'none',
  },
  errorMessage: {
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    margin: '1em 0 0.2em',
    '& svg': {
      marginRight: '0.4em',
    },
  },
});

function createMatch(id: string, name: string) {
  return { id, name};
}

function createEvent(id: string, time: string, status: string) {
  return { id, time, status};
}

const rows_matches = [
  createMatch('1', 'Frozen yoghurt'),
  createMatch('2','Ice cream sandwich'),
  createMatch('3','Eclair'),
  createMatch('4','Cupcake'),
  createMatch('5','Gingerbread'),
];

const rows_events = [
  createEvent('1','5pm PST', 'Registering Now'),
  createEvent('2','6pm PST', 'Upcoming'),
  createEvent('3','7pm PST', 'Upcoming'),
  createEvent('4','8pm PST', 'Upcoming'),
  createEvent('5','9pm PST', 'Upcoming'),
  createEvent('6','10pm PST', 'Upcoming'),
];

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

export default function HomePage() {
  const classes = useStyles();
  const { signIn, user, isAuthReady } = useAppState();
  const history = useHistory();
  const location = useLocation<{ from: Location }>();

  return (
    <ThemeProvider theme={theme}>
            <Grid container alignItems="center"  justify="center" spacing={2} direction="row">
              <Grid item xs={6} className={classes.tableContainer}>
              <Paper className={classes.paper}>
              <h3>Matches</h3>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows_matches.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          Video Call
                        </TableCell>
                        <TableCell component="th" scope="row">
                          Voice Call
                        </TableCell>
                        <TableCell component="th" scope="row">
                          Instagram Handle
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </Paper>
              </Grid>
            </Grid>
            
    </ThemeProvider>
  );
}
