import React, { useState, useEffect } from 'react';

export default function Scramble(props) {
  const [scram, setScram] = useState('');
  const [type, setType] = useState('3x3');

  useEffect( () => {
    setScram(props.currScram);
  }, [props.currScram])

  useEffect( () => {
    props.newType(type)
  }, [type]);

  let content;
  if (scram) {
    content = (
      <div className="scramble">
        <button onClick={() => props.getLast()}>Last</button>
        <p>{scram}</p>
        <button onClick={() => props.newScram(type)}>Next ></button>
        <select name="type" onChange={(e) => setType(e.target.value)}>
          <option value="3x3">3x3</option>
          <option value="2x2">2x2</option>
          <option value="4x4">4x4</option>
        </select>
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