import React, { useState, useEffect } from 'react';
import { SESSIONS } from './queries';
import { useQuery } from '@apollo/react-hooks';

export default function Scramble(props) {
  const {loading, error, data} = useQuery(SESSIONS)
  const [scram, setScram] = useState('');
  const [type, setType] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect( () => {
    setScram(props.currScram);
  }, [props.currScram])

  useEffect( () => {
    props.newType(type, sessionId)
  }, [type])

  if (loading) {
    return <h4>Loading...</h4>
  }
  if (error) {
    console.log(error)
    return <h4 style={{color: 'red'}}>ERROR</h4>
  }

  let handleChange = (e) => { // { let jsoned = JSON.stringify(e.target.value); console.log(jsoned); setType(jsoned.type); setSessionId(jsoned.id) } }
    setSessionId(e.target.options[e.target.selectedIndex].getAttribute('sessionId'))
    setType(e.target.value)
  }

  let content;
  if (scram) {
    content = (
      <div className="scramble">
        <button onClick={() => props.getLast()}>Last</button>
        <p>{scram}</p>
        <button onClick={() => props.newScram(type)}>Next ></button>
        <select name="type" onChange={handleChange}>
          <option value="3x3">Please Select One</option>
          {data.sessions.map( (session, id) => <option key={id} value={session.type} sessionid={session.id} >{session.type}</option> )}
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
