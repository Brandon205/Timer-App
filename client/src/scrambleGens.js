let possible = ["F", "F'", "F2", "B", "B'", "B2", "U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2"]
export function get3x3Scramble() { 
  let test = []
  for (let i = 0; i < 21; i++) {
    let toPush = possible[Math.floor(Math.random() * 18)]
    if (test.length > 0) {
      while (test[test.length - 1].charAt(0) === toPush.charAt(0)) {
        toPush = possible[Math.floor(Math.random() * 18)]
      }
    }
    test.push(toPush)
  }
  return test.join(' ')
}

export function get2x2Scramble() {
  let test = []
  for (let i = 0; i < 9; i++) {
    let toPush = possible[Math.floor(Math.random() * 18)]
    if (test.length > 0) {
      while (test[test.length - 1].charAt(0) === toPush.charAt(0)) {
        toPush = possible[Math.floor(Math.random() * 18)]
      }
    }
    test.push(toPush)
  }
  return test.join(' ')
}

export function get4x4Scramble() {
  let possible4x4 = ["F", "F'", "F2", "B", "B'", "B2", "U", "U'", "U2", "D", "D'", "D2", "R", "R'", "R2", "L", "L'", "L2", "Fw", "Fw2", "Fw'", "Rw", "Rw2", "Rw'", "Lw", "Lw2", "Lw'", "Uw", "Uw2", "Uw'"]
  let test = []
  for (let i = 0; i < 21; i++) {
    let toPush = possible[Math.floor(Math.random() * 18)]
    if (test.length > 0) {
      while (test[test.length - 1].charAt(0) === toPush.charAt(0)) {
        toPush = possible[Math.floor(Math.random() * 18)]
      }
    }
    test.push(toPush)
  }
  for (let i = 0; i < 23; i++) {
    let toPush = possible4x4[Math.floor(Math.random() * 30)]
    while (test[test.length - 1].charAt(0) === toPush.charAt(0)) {
      toPush = possible4x4[Math.floor(Math.random() * 30)]
    }
    test.push(toPush)
  }
  return test.join(' ')
}

export function adder(times) {
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
