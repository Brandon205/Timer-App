import React from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.css';

import Signup from './Signup';
import Login from './Login';

class App extends React.Component {
  state = { 
    token: '',
    user: null,
    errorMessage: '',
    lockedResult: ''
  }

  checkForLocalToken = () => {
    // Look in LS for localtoken
    let token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // if no token, remove all evidence of mernToken from LS and state
      localStorage.removeItem('mernToken');
      this.setState({ token: '', user: null });
    } else {
      // if token, verify token on backend 
      Axios.post('/auth/me/from/token', { token })
      .then(res => {
        if (res.data.type === 'error') {
          localStorage.removeItem('mernToken');
          this.setState({ token: '', user: null, errorMessage: res.data.message });
        } else {
          // if verified store it back in LS and state
          localStorage.setItem('mernToken', res.data.token);
          this.setState({ token: res.data.token, user: res.data.user });
        }
      })
    }
  }

  componentDidMount = () => {
    this.checkForLocalToken()
  }

  liftToken = ({token, user}) => {
    this.setState({ token, user });
  }

  logout = () => {
    localStorage.removeItem('mernToken');
    this.setState({ token: '', user: null });
  }

  render() { 
    let contents;
    if (this.state.user) {
      contents = (
        <>
          <p>Hello, {this.state.user.name} </p>
          <button onClick={this.logout}>Logout</button>
          <p>{this.state.lockedResult}</p>
        </>
      )
    } else {
      contents = (
        <>
          <Signup liftToken={this.liftToken} />
          <Login liftToken={this.liftToken} />
        </>
      )
    }

    return ( 
      <div className="App">
        <header>
          <nav>
            
          </nav>
        </header>
        <div className="App">
          {content}
        </div>
      </div>
    );
  }
}

export default App;
