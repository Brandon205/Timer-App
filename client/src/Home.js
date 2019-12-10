import React from 'react';

export default function Home(props) {
  let content;
  if (props.user) {
    content = (
      <div className="App">
        <h1>Welcome to cubeX, {props.user.name}!</h1>
        <h3 className="description">
          Go ahead and click on Timer up above to get started. Or if you need a few hints on how to solve a 
          Rubiks Cube then go ahead and head to <a href="https://ruwix.com/the-rubiks-cube/how-to-solve-the-rubiks-cube-beginners-method/" target="_blank" rel="noopener noreferrer">Ruwix.com</a>.
        </h3>
      </div>
    )
  } else {
    content = (
      <div className="App">
        <h1>Welcome to cubeX!</h1>
        <h3 className="description">
          cubeX is an app that is specifically for timing your Rubiks Cube solves 
          it infers that you know how to solve one first and recommends if you 
          don't that you go to <a href="https://ruwix.com/the-rubiks-cube/how-to-solve-the-rubiks-cube-beginners-method/" target="_blank" rel="noopener noreferrer">this</a> site to learn.
          Once you have it down in order to practice or get ready for a competition it is
          helpful to have a timer to practice with, and this timer will store your times
          across all your devices!
        </h3>
        <h3 className="description">To get started go ahead and login or signup then head on over to the Timer via the link above!</h3>
      </div>
    )
  }
  return (
    <div className="App" style={{maxWidth: 75 + 'vw', margin: 'auto'}}>
      {content}
    </div>
  )
}
