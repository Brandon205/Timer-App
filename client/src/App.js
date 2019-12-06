import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.css';

import Main from './Main';
import LoginPage from './LoginPage';

export default function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [selectedDropdown, setSelectedDropdown] = useState('');

  const client = new ApolloClient({ uri: 'http://localhost:3001/graphql' });

  let checkForLocalToken = () => {
    // Look in LS for localtoken
    let token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // if no token, remove all evidence of mernToken from LS and state
      localStorage.removeItem('mernToken');
      setUser(null);
      setToken('');
    } else {
      // if token, verify token on backend 
      Axios.post('/auth/me/from/token', { token })
      .then(res => {
        if (res.data.type === 'error') {
          localStorage.removeItem('mernToken');
          setUser(null);
          setToken('');
        } else {
          // if verified store it back in LS and state
          localStorage.setItem('mernToken', res.data.token);
          setToken(res.data.token);
          setUser(res.data.user);
        }
      })
    }
  }

  useEffect( () => {
    checkForLocalToken()
  }, [])

  let liftToken = ({token, user}) => {
    setToken(token)
    setUser(user)
  }

  let logout = () => {
    localStorage.removeItem('mernToken');
    setToken('');
    setUser(null);
  }

  let nav;
  if (user) {
    nav = (
      <nav>
        <h1>AppName</h1>
        <Link to="/main">Timer</Link>
        <button onClick={logout}>Logout</button>
      </nav>
    )
  } else {
    nav = (
      <nav>
        <h1>AppName</h1>
        <Link to="/login" >Login/Signup</Link>
      </nav>
    )
  }

  return ( 
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <header>
            {nav}
          </header>
          <main>
            <Route exact path='/main' render={ () => <Main user={user} /> } />
            <Route exact path='/login' render={ () => <LoginPage liftToken={liftToken} /> } />
          </main>
        </div>
      </ApolloProvider>
    </Router>
  );
}
