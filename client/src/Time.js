import React, { useState, useEffect } from 'react';
import { SESSION_TIMES, DELETE_TIME, DELETE_TIMES, DNF_TIME, ADD_TIME } from './queries';
import { useQuery, useMutation } from '@apollo/react-hooks';

// Gets sessionId and user
export default function Time(props) {
  const [times, setTimes] = useState([]);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [active, setActive] = useState(false);

  const {loading, error, data} = useQuery(SESSION_TIMES, {variables: {userId: props.user._id, session: props.sessionId } });
  const [deleteTime] = useMutation(DELETE_TIME);
  const [deleteTimes] = useMutation(DELETE_TIMES);
  const [dnfTime] = useMutation(DNF_TIME);
  const [addTime] = useMutation(ADD_TIME);

  function getUnits() {
    const seconds = time / 1000;
    return {
      min: Math.floor(seconds / 60).toString(),
      sec: Math.floor(seconds % 60).toString(),
      msec: (seconds % 1).toFixed(3).substring(2)
    }
  }

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

  let units = getUnits();
  return (
    <div className="App">
      <h1>Times:</h1>
      <button onClick={handleDelTimes}>Delete Session Times</button>
      {data.sessionTimes.map((time, id) => <div key={id}><p>{time.time}</p><button onClick={ (e) => handleDelTime(e, time.id)}>X</button></div>)}
      <h1>{units.min}:{units.sec}.{units.msec}</h1>
    </div>
  )
}
