import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.css';

import Signup from './Signup';
import Login from './Login';
import Scramble from './Scramble';


export default function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [open, setOpen] = useState(false);
  const [navDiv, setNavDiv] = useState(false);

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

  let handleOpening = () => {
    if (navDiv === true) {
      setNavDiv(false)
      setOpen(!open)
    } else {
      setNavDiv(true)
      setOpen(!open)
    }
  }

  let contents;
  let nav;
  if (user) {
    nav = (
      <nav>
        <Scramble type={selectedDropdown}/>
        <HamburgerMenu isOpen={open} menuClicked={() => {setOpen(!open); setNavDiv(!navDiv)}} width={18} height={15} animationDuration={0.5} />
        <div className="nav-div" style={{display: navDiv ? "inline-block" : "none"}}><div className="nav-div-content"> <p>Hello</p> </div></div>
      </nav>
    )
    contents = (
      <>
        <p>Hello, {user.name} </p>
        <button onClick={logout}>Logout</button>
      </>
    )
  } else {
    nav = (
      <nav>
        <h1>AppName</h1>
        <div className="cooperate"><HamburgerMenu style={{top: 0, right: 5 + 'vw'}} isOpen={open} menuClicked={() => {setOpen(!open); setNavDiv(!navDiv)}} width={18} height={15} animationDuration={0.5} margin-top={100 + 'px'}><p>Hello</p> </HamburgerMenu></div>
        <div className="nav-div" style={{display: navDiv ? "inline-block" : "none"}}><div className="nav-div-content"> <p>Hello</p> </div></div>
      </nav>
    )
    contents = (
      <>
        <Signup liftToken={liftToken} />
        <Login liftToken={liftToken} />
      </>
    )
  }

  return ( 
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <header>
            {nav}
          </header>
          <div className="App">
            {contents}
          </div>
        </div>
      </ApolloProvider>
    </Router>
  );
}
