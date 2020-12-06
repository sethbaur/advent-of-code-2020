const { getSeats } = require('./getSeats');

const seats = getSeats()
console.log(seats.sort((a, b) => a - b).pop());
