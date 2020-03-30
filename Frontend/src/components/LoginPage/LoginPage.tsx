import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useAppState } from '../../state';

import Button from '@material-ui/core/Button';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ReactComponent as GoogleLogo } from './google-logo.svg';
import { ReactComponent as TwilioLogo } from './twilio-logo.svg';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import videoLogo from './video-logo.png';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosAdapter,
  Cancel,
  CancelToken,
  CancelTokenSource,
  Canceler
} from 'axios';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100vh',
    background: '#FFFFFF',
    justifyContent:'center'
  },
  paper: {
    display: 'flex',
    height: '75vh',
    width: '50vw',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '2em',
    marginTop: '4em',
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
  formControl: {

    
  },
  selectEmpty: {
    marginTop: 16,
  },
});

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

export default function LoginPage() {
  const classes = useStyles();
  const { signIn, user, isAuthReady } = useAppState();
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const [passcode, setPasscode] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [age, setAge] = useState('');
  const [height_person, setHeightPerson] = useState('');
  const [email, setEmail] = useState('');
  const [sexorient, setSexOrient] = useState('');
  const [gender, setGender] = useState('');
  const [authError, setAuthError] = useState<Error | null>(null);

  const isAuthEnabled = Boolean(process.env.REACT_APP_SET_AUTH);

  const login = () => {
    setAuthError(null);
    signIn?.(passcode)
      .then(() => {
        history.replace(location?.state?.from || { pathname: '/video' });
      })
      .catch(err => setAuthError(err));
  };

  const handleResponse = (response: AxiosResponse) => {
    console.log(response.data);
    //Set state variables

    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  };
  
  const handleError = (error: AxiosError) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      console.log(error.message);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
    .post('/user/create', {
      params: 
        {
          name: name,
          email: email,
          height: height_person,
          age: age,
          sexuality: sexorient,
          gender: gender,
          bio: bio
        }
      
    })
    .then(handleResponse) 
    .catch(handleError)
    .then(() => {console.log(name + " " + email)});  
  };



  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

/*   if (user) {
    history.replace('/');
  } */

  //if (!isAuthReady) {
    //return null;
  //}

  return (
    <ThemeProvider theme={theme}>
      <Grid container justify="center" alignItems="center" className={classes.container}>
      <div >
        <Paper className={classes.paper} elevation={6}>  
               
            <form onSubmit={handleSubmit} style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', width: '100%', minWidth: 500}}>
              <Grid container alignItems="center" spacing={3} direction="column">
              <Grid item>
              <TextField
                  id="name"
                  label="Name"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="age"
                  label="Age"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="height_person"
                  label="Height"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setHeightPerson(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="sexorient"
                  label="Interested in ..."
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSexOrient(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="gender"
                  label="Gender"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="email"
                  label="johndoe@example.com"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="bio"
                  label="Short Bio"
                  multiline
                  rows="10"
                  placeholder="Write a few lines about yourself to help us match you best based on our Bert-Powered Personality Clustering"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setBio(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="input-passcode"
                  label="Passcode"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPasscode(e.target.value)}
                  type="password"
                />

                <div>
                  {authError && (
                    <Typography variant="caption" className={classes.errorMessage}>
                      <ErrorOutlineIcon />
                      {authError.message}
                    </Typography>
                  )}
                </div>
                </Grid>
                <Grid item>
                <Button variant="contained" className={classes.button} type="submit" disabled={!passcode.length}>
                  Submit
                </Button>
                </Grid>
              </Grid>
            </form>
        
        </Paper>
        </div>
      </Grid>
    </ThemeProvider>
  );
}
