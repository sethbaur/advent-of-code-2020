const { getSeats } = require('./getSeats');

const seats = getSeats().sort((a, b) => a - b);
for (const [i, seat] of seats.entries()) {
  if (seats[i+1] !== seat + 1) {
    console.log('found', seat + 1);
    break;
  }
}
