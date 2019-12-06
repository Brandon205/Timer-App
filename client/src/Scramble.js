import React, { useState, useEffect } from 'react';

export default function Scramble(props) {
  const [scram, setScram] = useState('');

  useEffect( () => {
    setScram(props.currScram);
  }, [props.currScram])

  let content;
  if (scram) {
    content = (
      <div className="scramble">
        <button onClick={() => props.getLast()}>Last</button>
        <p>{scram}</p>
        <button onClick={() => props.newScram()}>Next ></button>
      </div>
    )
  } else {
    content = (
      <div className="scramble">
        <p>RuhRoh</p>
      </div>
    )
  }
  return (
    <div className="scramble">
      {content}
    </div>
  )
}