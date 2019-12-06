import React, { useState, useEffect } from 'react';
// import { SESSIONS } from './queries';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const SESSIONS = gql`
  {
    sessions {
      id
      type
    }
  }
`

export default function Scramble(props) {
  const {loading, error, data} = useQuery(SESSIONS)
  const [scram, setScram] = useState('');
  const [type, setType] = useState('3x3');

  // const data = ''
  useEffect( () => {
    setScram(props.currScram);
  }, [props.currScram])

  useEffect( () => {
    props.newType(type)
  }, [type]);

  if (loading) {
    console.log('loagind;sdlsodgn')
    return <h4>Loading...</h4>
  }
  if (error) {
    console.log(error)
    // return <h4 style={{color: 'red'}}>ERROR</h4>
  }


  // let mappedSessions;
  if (data) {
    // mappedSessions = data.sessions.map( (session, id) => <option key={id} value={session.id}>{session.type}</option> )
  } else {
    // mappedSessions = <option>RuhRoh</option>
  }
  let content;
  if (scram) {
    content = (
      <div className="scramble">
        <button onClick={() => props.getLast()}>Last</button>
        <p>{scram}</p>
        <button onClick={() => props.newScram(type)}>Next ></button>
        <select name="type" onChange={(e) => setType(e.target.value)}>
          {/* {mappedSessions} */}
          {data.sessions.map( (session, id) => <option key={id} value={session.id}>{session.type}</option> )}
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