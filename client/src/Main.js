import React, { useState } from 'react';
import Scrambo from 'scrambo';
import Time from './Time';
import Scramble from './Scramble';

export default function Main(props) {
  const [scramble, setScramble] = useState('');
  const [lastScramble, setLastScramble] = useState('');
  const [type, setType] = useState('');
  const [sessionId, setSessionId] = useState('');

  let newScram = (type='3x3') => {
    switch (true) {
      case (type === '2x2'):
        setLastScramble(scramble)
        setScramble(new Scrambo().type('222').length(9).get(1))
        break;
      case (type === '3x3'):
        setLastScramble(scramble)
        setScramble(new Scrambo().length(21).get(1))
        break;
      case (type === '4x4'):
        setLastScramble(scramble)
        setScramble(new Scrambo().type('444').get(1))
        break;
      case (type === '5x5'):
        setLastScramble(scramble)
        setScramble(new Scrambo().type('555').get(1))
        break;
      case (type === '6x6'):
        setLastScramble(scramble)
        setScramble(new Scrambo().type('666').get(1))
        break;
      case (type === '7x7'):
        setLastScramble(scramble)
        setScramble(new Scrambo().type('777').get(1))
        break;
      case (type === 'Megaminx'):
        setLastScramble(scramble)
        setScramble(new Scrambo().type('minx').get(1))
        break;
      case (type === 'Pyraminx'):
        setLastScramble(scramble)
        setScramble(new Scrambo().type('pyram').get(1))
        break;
      case (type === 'Skewb'):
        setLastScramble(scramble)
        setScramble(new Scrambo().type('skewb').get(1))
        break;
      case (type === 'Square-1'):
        setLastScramble(scramble)
        setScramble(new Scrambo().type('sq1').get(1))
        break;
      default:
        setLastScramble(scramble)
        setScramble(new Scrambo().length(21).get(1))
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
