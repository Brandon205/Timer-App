import React, { useState, useEffect } from 'react';
import Time from './Time';
import Cube from './Cube';
import Scramble from './Scramble';
import { get3x3Scramble } from './scrambleGens';

export default function Main(props) {

  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [active, setActive] = useState(false);
  const [solves, setSolves] = useState([]);
  const [scramble, setScramble] = useState('');
  const [lastScramble, setLastScramble] = useState('');
  const [type, setType] = useState('3x3');

  function getUnits() {
    const seconds = time / 1000;
    return {
      min: Math.floor(seconds / 60).toString(),
      sec: Math.floor(seconds % 60).toString(),
      msec: (seconds % 1).toFixed(3).substring(2)
    }
  }

  function removeTime(id) {
    let solvesCopy = [...solves]
    solvesCopy.splice(id, 1)
    setSolves(solvesCopy)
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
        solves.push(`${endTime.min > 0 ? endTime.min + ':' : ``}${endTime.sec}.${endTime.msec}`)
      }
    }
  window.addEventListener('keyup', myFunc)
    return () => {
      window.removeEventListener('keyup', myFunc)
    }
  })

  let newScram = (type='3x3') => {
    if (type === '3x3') {
      let scram = get3x3Scramble();
      setLastScramble(scramble)
      setScramble(scram)
    }
  }

  let newType = (val) => {
    setType(val)
  }

  if (!scramble) {
    newScram(type)
  }
  let units = getUnits();
  let mappedSolves = solves.map((solve, id) => <div><p key={id}>{solve}</p><button onClick={() => removeTime(id)}>X</button></div> )
  return (
    <div className="App">
      <header>
        <Scramble newScram={newScram} currScram={scramble} getLast={() => setScramble(lastScramble)} lastScram={lastScramble ? true : false} newType={newType} />
      </header>
      <aside className="left-aside">
        <h2>Times:</h2>
        {mappedSolves}
        {/* <Time /> */}
      </aside>
      <h1>{units.min}:{units.sec}.{units.msec}</h1>
      <Cube scramble={scramble} />
    </div>
  )
}