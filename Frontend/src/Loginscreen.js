import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';

class Loginscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginscreen: [],
      buttonLabel: 'Register',
      isLogin: true,
    };
  }
  componentWillMount() {
    var loginscreen = [];
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext} />);
    this.setState({
      loginscreen: loginscreen,
    });
  }
  render() {
    return (
      
      <div className="loginscreen" align="center">
        {this.state.loginscreen}
        <div>
          <MuiThemeProvider>
            <div>
              <RaisedButton
                label={this.state.buttonLabel}
                primary={true}
                style={style}
                onClick={event => this.handleClick(event)}
              />
            </div>
          </MuiThemeProvider>
        </div>
      </div>
      
    );
  }
  handleClick(event) {
    // console.log("event",event);
    var loginmessage;
    if (this.state.isLogin) {
      var loginscreen = [];
      loginscreen.push(<Register parentContext={this} />);
      loginmessage = 'Already registered.Go to Login';
      this.setState({
        loginscreen: loginscreen,
        loginmessage: loginmessage,
        buttonLabel: 'Log In',
        isLogin: false,
      });
    } else {
      var loginscreen = [];
      loginscreen.push(<Login parentContext={this} />);
      loginmessage = 'Not Registered yet.Go to registration';
      this.setState({
        loginscreen: loginscreen,
        loginmessage: loginmessage,
        buttonLabel: 'Register',
        isLogin: true,
      });
    }
  }
}
const style = {
  margin: 15,
};
export default Loginscreen;
