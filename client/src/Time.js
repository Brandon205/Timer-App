import React, { useState, useEffect } from 'react';
import { SESSION_TIMES, DELETE_TIME, DELETE_TIMES, DNF_TIME, ADD_TIME } from './queries';
import { useQuery, useMutation } from '@apollo/react-hooks';

export default function Time(props) {
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [active, setActive] = useState(false);
  const [sessionId, setSessionId] = useState('');

  const {loading, error, data} = useQuery(SESSION_TIMES, {variables: {userId: props.user._id, session: sessionId } });
  const [deleteTime] = useMutation(DELETE_TIME);
  const [deleteTimes] = useMutation(DELETE_TIMES);
  const [dnfTime] = useMutation(DNF_TIME);
  const [addTime] = useMutation(ADD_TIME);

  //TODO?: Make it so that default selected session is 3x3 using SESSION query

  function getUnits() {
    const seconds = time / 1000;
    return {
      min: Math.floor(seconds / 60).toString(),
      sec: Math.floor(seconds % 60).toString(),
      msec: (seconds % 1).toFixed(3).substring(2)
    }
  }

  useEffect( () => {
    setSessionId(props.sessionId)
  }, [props.sessionId])

  useEffect( () => {
    if (active) {
      var int = setInterval(update, 10)
    }
    return () => {
      clearInterval(int)
    }
  }, [active])

  useEffect( () => {
    setStartTime(Date.now())
  }, [active])

  function update() {
    let current = Date.now() - startTime
    setTime(time + current)
    setStartTime(Date.now())
  }

  useEffect( () => {
    function myFunc(e) {
      if (e.key === ' ' && active === false) {
        setTime(0)
        setStartTime(Date.now())
        setActive(true)
      } else if (e.key === ' ' && active === true) {
        setActive(false)
        let endTime = getUnits()
        addTime({
          variables: {
            userId: props.user._id,
            session: props.sessionId,
            time: endTime.min + '.' + endTime.sec + '.' + endTime.msec
          },
          refetchQueries: [{query: SESSION_TIMES, variables: {userId: props.user._id, session: props.sessionId } }]
        })
      }
    }
  window.addEventListener('keyup', myFunc)
    return () => {
      window.removeEventListener('keyup', myFunc)
    }
  })

  if (loading) {
    return <h4>Loading...</h4>
  }
  if (error) {
    console.log(error)
    return <h4 style={{color: 'red'}}>Select a type from above</h4>
  }

  let handleDelTime = (e, id) => {
    e.preventDefault()
    deleteTime({
      variables: {
      timeId: id
      },
      refetchQueries: [{query: SESSION_TIMES, variables: {userId: props.user._id, session: props.sessionId } }]
    })
  }

  let handleDelTimes = (e) => {
    e.preventDefault()
    deleteTimes({
      variables: {
        userId: props.user._id,
        session: props.sessionId
      },
      refetchQueries: [{query: SESSION_TIMES, variables: {userId: props.user._id, session: props.sessionId } }]
    })
  }

  let handleDnfTime = (e, id) => {
    e.preventDefault()
    dnfTime({
      timeId: id
    })
  }

  let units = getUnits();
  return (
    <div className="left-aside">
      <h1>Times:</h1>
      <div className="div-button" onClick={handleDelTimes}>Delete All</div>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Delete</th>
            <th>DNF</th>
          </tr>
        </thead>
        <tbody>
          {data.sessionTimes.map((time, id) => <tr key={id}><td>{time.time}</td><td className="pointer" onClick={ (e) => handleDelTime(e, time.id)}>X</td><td className="pointer" onClick={ (e) => handleDnfTime(e, time.id)}>DNF</td></tr>)}
        </tbody>
      </table>
      <h1 className="timer">{units.min}:{units.sec}.{units.msec}</h1>
    </div>
  )
}
