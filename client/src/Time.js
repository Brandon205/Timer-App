import React, { useState, useEffect } from 'react';
import { SESSION_TIMES, DELETE_TIME, DELETE_TIMES, DNF_TIME } from './queries';
import { useQuery, useMutation } from '@apollo/react-hooks';

// Gets sessionId and user
export default function Time(props) {
  const [times, setTimes] = useState([]);

  const {loading, error, data} = useQuery(SESSION_TIMES, {variables: {userId: props.user._id, session: props.sessionId } });
  const [deleteTime] = useMutation(DELETE_TIME);
  const [deleteTimes] = useMutation(DELETE_TIMES);
  const [dnfTime] = useMutation(DNF_TIME);

  // let count = 0
  // useEffect( () => {
  //   count++
  //   if (count >= 2) {
  //     setTimes(data.sessionTimes)
  //   }
  // }, [data])
  if (loading) {
    return <h4>Loading...</h4>
  }
  if (error) {
    console.log(error)
    return <h4 style={{color: 'red'}}>ERROR</h4>
  }

  let handleDelTime = (e, id) => {
    e.preventDefault()
    deleteTime({
      variables: {
      timeId: id
      },
      refetchQueries: [{query: SESSION_TIMES}]
    })
  }

  let handleDelTimes = (e) => {
    e.preventDefault()
    deleteTimes({
      variables: {
        userId: props.user._id,
        session: props.sessionId
      },
      refetchQueries: [{query: SESSION_TIMES}]
    })
  }

  let handleDnfTime = (e) => {

  }

  let mappedTimes;
  if (times.length > 0) {
    mappedTimes = data.sessionTimes.map((time, id) => <div key={id}><p>{time.time}</p><button onClick={ (e) => handleDelTime(e, time.id)}></button></div> )
  } else {
    mappedTimes = <p>No solves yet...</p>
  }

  return (
    <div className="App">
      <h1>Times:</h1>
      <button onClick={handleDelTimes}>Delete Session Times</button>
      {/* {mappedTimes} */}
      {data.sessionTimes.map((time, id) => <div key={id}><p>{time.time}</p><button onClick={ (e) => handleDelTime(e, time.id)}>X</button></div>)}
    </div>
  )
}
