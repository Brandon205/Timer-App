import React, { useState } from 'react';
import Scrambo from 'scrambo';
import Time from './Time';
import Scramble from './Scramble';
import { get3x3Scramble, get2x2Scramble, get4x4Scramble, get5x5Scramble } from './scrambleGens';

export default function Main(props) {
  const [scramble, setScramble] = useState('');
  const [lastScramble, setLastScramble] = useState('');
  const [type, setType] = useState('');
  const [sessionId, setSessionId] = useState('');

  let newScram = (type='3x3') => { // Will get info from the scramble generator based on the provided type
    if (type === '2x2') {
      setLastScramble(scramble)
      setScramble(new Scrambo().type('222').length(9).get(1))
    } else if (type === '3x3') {
      setLastScramble(scramble)
      setScramble(new Scrambo().length(21).get(1))
    } else if (type === '4x4') {
      setLastScramble(scramble)
      setScramble(new Scrambo().type('444').length(25).get(1))
    } else if (type === '5x5') {
      setLastScramble(scramble)
      setScramble(new Scrambo().type('555').length(25).get(1))
    } else if (type === '6x6') {
      setLastScramble(scramble)
      setScramble(new Scrambo().type('666').length(25).get(1))
    } else if (type === '7x7') {
      setLastScramble(scramble)
      setScramble(new Scrambo().type('777').length(25).get(1))
    } else if (type === 'Megaminx') {
      setLastScramble(scramble)
      setScramble(new Scrambo().type('minx').length(25).get(1))
    } else if (type === 'Pyraminx') {
      setLastScramble(scramble)
      setScramble(new Scrambo().type('minx').length(15).get(1))
    } else {
      setLastScramble(scramble)
      setScramble(new Scrambo().get(1))
    }
  }

  let newType = (type, sessionId) => { // Updates the current type and sessionId
    setType(type)
    setSessionId(sessionId)
  }

  if (!scramble) {
    newScram(type)
  }
  return (
    <div className="App">
      <header className="scramble">
        <Scramble newScramble={newScram} currScramble={scramble} getLast={() => setScramble(lastScramble)} newType={newType} />
      </header>
      <aside className="left-aside">
        <Time sessionId={sessionId} user={props.user} scramble={scramble} newScramble={newScram} mobile={props.mobile} />
      </aside>
    </div>
  )
}
