const { roundToNearestMinutes } = require('../lib/index.js');

console.log(roundToNearestMinutes('8:12am', 15)); // 8:15am
console.log(roundToNearestMinutes('12am', 15)); // 12am
console.log(roundToNearestMinutes('12:02am', 15)); // 12:00am

console.log(roundToNearestMinutes('10:12am', 15)); // => '10:15am'
console.log(roundToNearestMinutes('04:06 PM', 10)); // => '04:10 PM'
console.log(roundToNearestMinutes('04:02 AM', 10)); // => '04:00 am'
console.log(roundToNearestMinutes('01:02:34.75', 10)); // => '01:00:00.00'
console.log(roundToNearestMinutes('8:22:25 PM', 10)); // => '8:20:00 PM'
console.log(roundToNearestMinutes('2:33p.m.', 10));  // => '2:30p.m.'
console.log(roundToNearestMinutes('11:59p.m.', 10));  // => '12:00a.m.'

console.log(roundToNearestMinutes('8:22:25 PM', 10)); // => '8:20:00 PM'

// edge cases
console.log(roundToNearestMinutes('11:51P.M.', 10)); // => '11:50P.M'
console.log(roundToNearestMinutes('11:59P.M.', 10)); // => '12:00A.M'
console.log(roundToNearestMinutes('23:59', 10)); // => '00:00'

// will return undefined for the following calls
console.log(roundToNearestMinutes('08:70', 15)); // => undefined
console.log(roundToNearestMinutes('2019-08-30', 5)); // => undefined