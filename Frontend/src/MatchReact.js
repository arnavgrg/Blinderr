import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const axios = require('axios');

class MatchReact extends Component {
  constructor() {
    super();
    this.state = {
      liked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(toggleState) {
    // Disable buttons on selection
    this.refs.likebutton.setAttribute('disabled', 'disabled');
    this.refs.dislikebutton.setAttribute('disabled', 'disabled');
    // If both parties mutually like each other, then send a post request to /users/:id/likes
    if (toggleState === 'like') {
      this.state.liked = true;
      // assumes these are already a part of SessionStorage
      const user_id = sessionStorage.getItem('userID');
      const partner_id = sessionStorage.getItem('partnerID');
      axios
        .post('/users/' + user_id + '/likes', {
          // other user's ID
          likes: partner_id,
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  render() {
    const like = 'Like';
    const dislike = 'Dislike';
    return (
      <Paper style={style}>
        <h3> How was your conversation? </h3>
        <div className="customContainer">
          <button ref="likebutton" className="btn like-button" onClick={() => this.handleClick('like')}>
            {like}
          </button>{' '}
          &nbsp;
          <button ref="dislikebutton" className="btn like-button" onClick={() => this.handleClick('dislike')}>
            {dislike}
          </button>
        </div>
      </Paper>
    );
  }
}

const style = {
  padding: 20,
  margin: 150,
  justifyContent: 'center',
  alignItems: 'center',
};

export default MatchReact;
