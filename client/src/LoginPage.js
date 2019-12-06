import React from 'react';
import Login from './Login';
import Signup from './Signup';

export default function LoginPage(props) {
  return (
    <div className="App">
      <Login liftToken={props.liftToken} />
      <Signup liftToken={props.liftToken} />
    </div>
  )
}