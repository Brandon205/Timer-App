export function adder(times) { // For adding up the current sessions Times for averages 
  let betterNums = [];
  times.forEach((time, id) => {
    if (time.time[0] === '0') {
      betterNums.push(parseFloat(time.time.split('').splice(2, time.time.length - 1).join('')))
    } else {
      return false;
    }
  })
  let end = betterNums.reduce((acc, curr) => {
    return acc += curr
  }, 0)
  return end;
}
