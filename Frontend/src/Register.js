import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './CSS/logincontent.css';
import Info from './infoScreen';
import axios from 'axios';

class Register extends Component {
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
            <p className="title">Register</p>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Register" primary={true} style={style} onClick={event => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
  handleClick(event) {
    var apiBaseUrl = 'http://localhost:3000/';
    console.log('values', this.state.username, this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post(apiBaseUrl + '/register', payload)
      .then(function(response) {
        console.log(response);
        if (response.data.code == 200) {
          //  console.log("registration successfull");
          var infoScreen = [];
          infoScreen.push(<Info parentContext={this} />);
          var registermessage = 'Not Registered yet.Go to registration';
          self.props.parentContext.setState({
            infoScreen: infoScreen,
            registermessage: registermessage,
            buttonLabel: 'Register',
            isLogin: true,
          });
        }
      })
      .catch(function(error) {
        console.log('ssssssssssssss');
        console.log(error);
      });
  }
}
const style = {
  margin: 15,
};
export default Register;
