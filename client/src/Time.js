import React, { useState, useEffect } from 'react';
import { SESSION_TIMES, DELETE_TIME, DELETE_TIMES, DNF_TIME, ADD_TIME } from './queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { adder } from './scrambleGens';
import Cube from './Cube';
import { LineChart } from 'react-chartkick';
import 'chart.js';

export default function Time(props) {
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [active, setActive] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [selectedOption, setSelectedOption] = useState('Graph');

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
      msec: (seconds % 1).toFixed(2).substring(2)
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
    let eatSpaceBar = (e) => {
      if (e.keyCode === 32) {
        e.preventDefault()
      }
    }
    let myFunc = (e) => {
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
    window.addEventListener('keydown', eatSpaceBar)
    window.addEventListener('keyup', myFunc)
    return () => {
      window.removeEventListener('keydown', eatSpaceBar)
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
      variables: {
        timeId: id
      }, 
      refetchQueries: [{query: SESSION_TIMES, variables: {userId: props.user._id, session: props.sessionId } }]
    })
  }

  var result = {};
  var count = 1
  for (var i = 0; i < data.sessionTimes.length; i++) {
    result[count] = data.sessionTimes[i].time;
    count++
  }

  let content;
  if (selectedOption === 'Graph') {
    content = <LineChart xtitle="Solve Number" ytitle="Time(min)" data={result} />
  } else {
    content = <Cube scramble={props.scramble} />
  }

  let averages;
  if (data.sessionTimes.length < 5 && !active) {
    averages = (
      <div className="App">
        <h2>Average of 5: ---</h2>
        <h2>Average of 12: ---</h2>
      </div>
    )
  } else if (data.sessionTimes.length >= 5 && data.sessionTimes.length < 12 && !active) {
    let section = [...data.sessionTimes].splice(data.sessionTimes.length - 5, data.sessionTimes.length - 1)
    let total = adder(section)
    if (!total) {
      averages = (
        <div className="App">
          <h2>Average of 5: ---</h2>
          <h2>Average of 12: ---</h2>
        </div>
      )
    } else {
    averages = (
      <div className="App">
        <h2>Average of 5: {(total / 5).toFixed(2)}</h2>
        <h2>Average of 12: ---</h2>
      </div>
    )
    }
  } else if (data.sessionTimes.length > 12 && !active) {
    let section5 = [...data.sessionTimes].splice(data.sessionTimes.length - 5, data.sessionTimes.length - 1)
    let section12 = [...data.sessionTimes].splice(data.sessionTimes.length - 12, data.sessionTimes.length - 1)
    let total5 = adder(section5)
    let total12 = adder(section12)
    if (!total5 || !total12) {
      averages = (
        <div className="App">
          <h2>Average of 5: ---</h2>
          <h2>Average of 12: ---</h2>
        </div>
      )
    } else {
      averages = (
        <div className="App">
          <h2>Average of 5: {(total5 / 5).toFixed(2)}</h2>
          <h2>Average of 12: {(total12 / 12).toFixed(2)}</h2>
        </div>
      )
    }
  }

  let units = getUnits();
  return (
    <div className="left-aside">
      <h1 className="timer">{units.min}:{units.sec}.{units.msec}</h1>
      {averages}
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Delete</th>
            <th>DNF</th>
          </tr>
        </thead>
        <tbody>
          {data.sessionTimes.map((time, id) => <tr key={id}><td>{time.dnf ? "DNF" : time.time}</td><td className="pointer" onClick={ (e) => handleDelTime(e, time.id)}>X</td><td className="pointer" onClick={ (e) => handleDnfTime(e, time.id)}>DNF</td></tr>)}
        </tbody>
      </table>
      <div className="div-button" onClick={handleDelTimes}>Delete All Times</div>
      <hr />
      <div className="graph">
        <select name="cube-or-graph" onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="Graph" defaultValue>Graph</option>
          <option value="Cube">Draw Scramble</option>
        </select>
        {content}
      </div>
    </div>
  )
}
