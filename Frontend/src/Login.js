import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useAppState } from '../../state';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './CSS/logincontent.css';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <div className="content">
        <MuiThemeProvider>
          <div>
            <p className="title">Title</p>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter the Passcode you received"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Log In" primary={true} style={style} onClick={event => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
  handleClick(event) {
    var apiBaseUrl = 'http://localhost:3000/';
    var self = this;
    var payload = {
      email: this.state.username,
      password: this.state.password,
    };
    axios
      .post(apiBaseUrl + 'login', payload)
      .then(function(response) {
        console.log(response);
        if (response.data.code == 200) {
          console.log('Login successfull');
          var infoScreen = [];
          infoScreen.push(<infoScreen appContext={self.props.appContext} />);
          self.props.appContext.setState({ loginPage: [], infoScreen: infoScreen });
        } else if (response.data.code == 204) {
          console.log('Username password do not match');
          alert('username password do not match');
        } else {
          console.log('Username does not exists');
          alert('Username does not exist');
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
const style = {
  margin: 15,
};
export default Login;
