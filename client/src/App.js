import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.css';

import Main from './Main';
import LoginPage from './LoginPage';
import Home from './Home';
import Best from './Best';

export default function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [mobile, setMobile] = useState(false);
  const client = new ApolloClient({ uri: 'http://localhost:3001/graphql' }); //http://localhost:3001/graphql https://sheltered-reef-38980.herokuapp.com/graphql

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
        <Link className="app-name" to="/">cubeX</Link>
        <Link className="nav-link" to="/main">Timer</Link>
        <div className="nav-link" onClick={() => setMobile(!mobile)}>{mobile ? 'Desktop Mode' : 'Mobile Mode' }</div>
        <Link className="nav-link" to="/bests">Your Times</Link>
        <div className="nav-link" onClick={logout}>Logout</div>
      </nav>
    )
  } else {
    nav = (
      <nav>
        <Link className="app-name" to="/">cubeX</Link>
        <Link className="nav-link" to="/login">Login/Signup</Link>
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
            <Route exact path='/' render={ () => <Home user={user} /> } />
            <Route exact path='/main'>{user ? <Main user={user} mobile={mobile} /> : <Redirect to='/' /> }</Route>
            <Route exact path='/bests' render={ () => <Best user={user} /> } />
            <Route exact path='/login' render={ () => <LoginPage liftToken={liftToken} /> } />
          </main>
        </div>
      </ApolloProvider>
    </Router>
  );
}
