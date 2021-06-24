import React, { useEffect, useState } from 'react'

const CaptureTickets = () => {

  const [price, setPrice] = useState('');
  const [allPrices, setAllPrices] = useState([])
  const [points, setPoints] = useState(0);
  const [errMsg, setErrMsg] = useState(false)
  const [noPoints, setNoPoints] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isNaN(parseInt(price))){
      setAllPrices(oldArr => [...oldArr, parseInt(price)]);
      setPrice('');
      setErrMsg(false);
    } else {
      setPrice('');
      setErrMsg(true);
    }
    console.log('all prices', allPrices)
  }

  const resetAll = () => {
    setErrMsg(false);
    setNoPoints(false);
    setAllPrices([])
    resetPoints()
  }

  const resetPoints = () => {
    setPoints(0)
    setNoPoints(false)
  }

  const calculatePoints = () => {
    if(allPrices.length === 0){
      setNoPoints(true);
    } else {
      setNoPoints(false);
      allPrices.map(price => {
        let truncPrice = Math.trunc(price)
        if(truncPrice < 100 && truncPrice > 50) {
          setPoints(points + (truncPrice - 50))
        } else if (truncPrice === 100) {
          setPoints(points + 50)
        } else if (truncPrice > 100) {
          setPoints(points + 50 + ((truncPrice - 100)* 2))
        }
      })
    }
    
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
      <label>input the amount of your ticket
      <input value={price} onChange={e => setPrice(e.target.value)} type="text"></input>
      </label>
      <input type="submit" value="Submit" />
      </form>
      {errMsg && <div>Captured value is Not a number</div>}
      <div>
      <button onClick={resetPoints}> Reset Points</button>
      </div>
      <div>
      <button onClick={resetAll}> Reset All</button>
      </div>
      <div>
      <button onClick={calculatePoints}>Calculate Points</button>
      {noPoints && <>No Points</>}
      {points > 0 && <>{points} Points</>}
      </div>
    </div>
  )
}

export default CaptureTickets