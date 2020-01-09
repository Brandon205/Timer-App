import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { SESSIONS } from './queries';

export default function Scramble(props) {
  const [scramble, setScramble] = useState('');
  const [type, setType] = useState('');
  const [sessionId, setSessionId] = useState('');

  const {loading, error, data} = useQuery(SESSIONS)

  useEffect( () => { // Updates the 
    setScramble(props.currScramble);
  }, [props.currScramble])

  useEffect( () => {
    props.newType(type, sessionId)
  }, [type])

  if (loading) {
    return <h4>Loading...</h4>
  }
  if (error) {
    console.log(error);
    return <h4 style={{color: 'red'}}>ERROR, try going to the homepage and coming back</h4>
  }

  let handleChange = (e) => { // For setting the newly selected type across the app
    setType(e.target.value)
    setSessionId(e.target.options[e.target.selectedIndex].getAttribute('sessionId'))
    props.newScramble(e.target.value)
  }

  let content;
  if (scramble) {
    content = (
      <div>
        <h4>{scramble}</h4>
        <div className="div-button" onClick={() => props.getLast()}>Last</div>
        <select name="type" onChange={handleChange}>
          <option value="3x3">Select a Type</option>
          {data.sessions.map( (session, id) => <option key={id} value={session.type} sessionid={session.id} >{session.type}</option> )}
        </select>
        <div className="div-button" onClick={() => props.newScramble(type)}>Next</div><br/>
      </div>
    )
  } else {
    content = (
      <div>
        <p>Data not loaded please go to the homepage and try again...</p>
      </div>
    )
  }
  return (
    <div>
      {content}
    </div>
  )
}
