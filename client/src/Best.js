import React, { useState, useEffect} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { BESTS, EDIT_PBS } from './queries';

export default function Best(props) {
  const {loading, error, data} = useQuery(BESTS, { variables: { userId: props.user._id } });
  const [editPBs] = useMutation(EDIT_PBS)
  const [two, setTwo] = useState('0:00.00')
  const [three, setThree] = useState('0:00.00')
  const [four, setFour] = useState('0:00.00')
  const [five, setFive] = useState('0:00.00')
  const [six, setSix] = useState('0:00.00')
  const [seven, setSeven] = useState('0:00.00')

  useEffect( () => {
    if (data) {
      setTwo(data.bests.pBs[0].two)
      setThree(data.bests.pBs[0].three)
      setFour(data.bests.pBs[0].four)
      setFive(data.bests.pBs[0].five)
      setSix(data.bests.pBs[0].six)
      setSeven(data.bests.pBs[0].seven)
    }
  }, [data])

  if (loading) {
    return <h4>Loading...</h4>
  }
  if (error) {
    return <h3 style={{color: 'red'}}>Error Loading User Data</h3>
  }

  let handleSave = (e) => {
    e.preventDefault()
    let timeObj = {}
    timeObj.two = two
    timeObj.three = three
    timeObj.four = four
    timeObj.five = five
    timeObj.six = six
    timeObj.seven = seven
    editPBs({
      variables: {
        userId: props.user._id,
        data: timeObj
      }, 
      refetchQueries: [{ query: BESTS, variables: { userId: props.user._id } }]
    })
  }

  return (
    <div className='bests'>
      <form onSubmit={handleSave}>
        <label htmlFor="2">2x2 PB: </label>
        <input onChange={(e) => setTwo(e.target.value)} name="twox" className="best-input" type="text" value={two} />
        <label htmlFor="3">3x3 PB: </label>
        <input onChange={(e) => setThree(e.target.value)} name="threex" className="best-input" type="text" value={three} />
        <label htmlFor="4">4x4 PB: </label>
        <input onChange={(e) => setFour(e.target.value)} name="fourx" className="best-input" type="text" value={four} />
        <label htmlFor="5">5x5 PB: </label>
        <input onChange={(e) => setFive(e.target.value)} name="fivex" className="best-input" type="text" value={five} />
        <label htmlFor="6">6x6 PB: </label>
        <input onChange={(e) => setSix(e.target.value)} name="sixx" className="best-input" type="text" value={six} />
        <label htmlFor="7">7x7 PB: </label>
        <input onChange={(e) => setSeven(e.target.value)} name="sevenx" className="best-input" type="text" value={seven} />
        <input type="submit" />
      </form>
    </div>
  )
}
