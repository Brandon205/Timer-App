import React, { useState, useEffect } from 'react';

export default function Cube(props) {
  const [cube, setCube] = useState('')

  useEffect( () => { // The cube IFrame requires the scramble to have %20 in between each of the moves 
    let arr = props.scramble.split(' ')
    for (let i = 1; i < arr.length; i += 2) {
      arr.splice(i, 0, '%20')
    }
    setCube(arr.join(''))
  }, [props.scramble])

  return (
    <div className="App">
      <iframe samesite='NONE' title="Test" width="250" height="300" style={{width: 250 + 'px', height: 300 + 'px', overflow: 'hidden'}} src={`https://ruwix.com/widget/3d/?setupmoves=${cube}&colors=R:r%20L:o%20F:g%20B:b%20U:w%20D:y&pov=Ufr`} scrolling="no"></iframe>
    </div>
  )
}
