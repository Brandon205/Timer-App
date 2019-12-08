import React, { useState, useEffect } from 'react';
import Time from './Time';
import Cube from './Cube';
import Scramble from './Scramble';
import { get3x3Scramble, get2x2Scramble, get4x4Scramble } from './scrambleGens';

export default function Main(props) {
  const [scramble, setScramble] = useState('');
  const [lastScramble, setLastScramble] = useState('');
  const [type, setType] = useState('');
  const [sessionId, setSessionId] = useState('')

  let newScram = (type='3x3') => {
    if (type === '3x3') {
      setLastScramble(scramble)
      setScramble(get3x3Scramble())
    } else if (type === '2x2') {
      setLastScramble(scramble)
      setScramble(get2x2Scramble())
    } else if (type === '4x4') {
      setLastScramble(scramble)
      setScramble(get4x4Scramble())
    } else {
      setLastScramble(scramble)
      setScramble(get3x3Scramble())
    }
  }

  let newType = (type, sessionId) => {
    setType(type)
    setSessionId(sessionId)
  }

  if (!scramble) {
    newScram(type)
  }
  return (
    <div className="App">
      <header>
        <Scramble newScram={newScram} currScram={scramble} getLast={() => setScramble(lastScramble)} lastScram={lastScramble ? true : false} newType={newType} />
      </header>
      <aside className="left-aside">
        <Time sessionId={sessionId} user={props.user} />
      </aside>
      <Cube scramble={scramble} />
    </div>
  )
}
