# Time Turner :clock4:
[![dependencies Status](https://david-dm.org/analizapandac/time-turner/status.svg)](https://david-dm.org/analizapandac/time-turner)
[![npm version](https://badge.fury.io/js/time-turner.svg)](https://badge.fury.io/js/time-turner)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**time-turner** provides a simple way of rounding time to the nearest minutes (nearest quarter, nearest 30 minutes etc.) in a browser & Node.js.

The library is available as an [npm package](https://www.npmjs.com/package/time-turner). To install the package run:

```
npm install time-turner --save
# or with yarn
yarn add time-turner
```

## **Docs**
---
### **roundToNearestMinutes(input, nearestMinutes)**

Rounds the given time to the nearest specified minutes

#### Arguments
| Name        | Type           | Description  |
| ------------- |:-------------:| -----:|
| input     | string or Date | Time to round|
| nearestMinutes      | number      | The closest minute to round to. Must be from `1` to `30`. If `0` is provided it will return the same time or Date  |

#### Returns ( Date | string | undefined )
`Date` - If input is a valid date string (ex. `2019-08-30 14:14 UTC+8`) or a Date object.

`string` - Returns the rounded time in the same format that it was given unless given input is a date string. For example if input is `10:12 AM`, it will return the rounded time as `10:15 AM` which has the same format of `hh:mm A` as the input. 

`undefined` - If arguments provided are invalid or if an error occured while rounding the time. The library will not throw any error.

#### Usage

```js
// CommonJS
// var { roundToNearestMinutes } = require('time-turner');

// ES2015
import { roundToNearestMinutes } from 'time-turner';

roundToNearestMinutes('10:12am', 15); // => '10:15am'
roundToNearestMinutes('04:06 PM', 10); // => '04:10 PM'
roundToNearestMinutes('04:06 PM', 10); // => '04:10 PM'
roundToNearestMinutes('01:02:34.75', 10); // => '01:00:00.00'
roundToNearestMinutes('8:22:25 PM', 10); // => '8:20:00 PM'
roundToNearestMinutes('2:33p.m.', 10)  // => '2:30p.m.'

roundToNearestMinutes('8:22:25 PM', 10); // => '8:20:00 PM'

roundToNearestMinutes('11:51P.M.', 10); // => '11:50P.M'
roundToNearestMinutes('11:59P.M.', 10); // => '12:00A.M'
roundToNearestMinutes('23:59', 10); // => '00:00'

// will return undefined for the following calls
roundToNearestMinutes('08:70', 15); // => undefined
roundToNearestMinutes('2019-08-30', 5); // => undefined

roundToNearestMinutes('2019-08-30 14:14 UTC+8', 15)); // => new Date('2019-08-30T06:15:00.000Z')
roundToNearestMinutes('2009-06-15T13:45:30', 10)); // => new Date('2009-06-15T05:50:00.000Z')
roundToNearestMinutes('2019-08-30 14:14 UTC+8', 0); // => new Date('2019-08-30T06:14:00.000Z')

```

## License

MIT © Ana Liza Pandac