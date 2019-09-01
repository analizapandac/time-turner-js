import { roundToNearestMinutes } from '../src/index';

test('roundToNearestMinutes: 12-hour format', () => {
  expect(roundToNearestMinutes('10:15 PM', 15)).toEqual('10:15 PM');
  expect(roundToNearestMinutes('10:13 AM', 15)).toEqual('10:15 AM');
  expect(roundToNearestMinutes('10:35am', 15)).toEqual('10:30am');

  expect(roundToNearestMinutes('12:05 PM', 10)).toEqual('12:00 PM');
  expect(roundToNearestMinutes('12:06 PM', 10)).toEqual('12:10 PM');
  expect(roundToNearestMinutes('04:06 PM', 10)).toEqual('04:10 PM');

  expect(roundToNearestMinutes('1am', 10)).toEqual('1am');
  expect(roundToNearestMinutes('1a.m.', 10)).toEqual('1a.m.');
  expect(roundToNearestMinutes('2:33p.m.', 10)).toEqual('2:30p.m.');
  expect(roundToNearestMinutes('1:2am', 10)).toEqual('1:00am');
  expect(roundToNearestMinutes('1:03am', 10)).toEqual('1:00am');

  expect(roundToNearestMinutes('10:15 PM', 0)).toEqual('10:15 PM');
  expect(roundToNearestMinutes('10:15 PM', 1)).toEqual('10:15 PM');
  expect(roundToNearestMinutes('10:15 PM', 2)).toEqual('10:14 PM');
  expect(roundToNearestMinutes('10:15pm', 3)).toEqual('10:15pm');
  expect(roundToNearestMinutes('10:59pm', 10)).toEqual('11:00pm');

  expect(roundToNearestMinutes('10:56pm', 10)).toEqual('11:00pm');
  expect(roundToNearestMinutes('10:57pm', 3)).toEqual('10:57pm'); // TODO: verify later
  expect(roundToNearestMinutes('11:00pm', 7)).toEqual('11:00pm');

  expect(roundToNearestMinutes('1:02a.m.', 10)).toEqual('1:00a.m.');

  expect(roundToNearestMinutes('10:12p.m.', 30)).toEqual('10:00p.m.');
  expect(roundToNearestMinutes('10:45p.m.', 30)).toEqual('10:30p.m.');
  expect(roundToNearestMinutes('10:47p.m.', 30)).toEqual('11:00p.m.');

  // edge cases
  expect(roundToNearestMinutes('11:51p.m.', 10)).toEqual('11:50p.m.');
  expect(roundToNearestMinutes('11:59P.M.', 10)).toEqual('12:00A.M.');
});

test('roundToNearestMinutes: 24-hour format', () => {
  expect(roundToNearestMinutes('10:15', 15)).toEqual('10:15');
  expect(roundToNearestMinutes('22:11', 15)).toEqual('22:15');
  expect(roundToNearestMinutes('00:11', 15)).toEqual('00:15');
  expect(roundToNearestMinutes('00:01', 10)).toEqual('00:00');

  expect(roundToNearestMinutes('01:02:34.75', 10)).toEqual('01:00:00.00');
  expect(roundToNearestMinutes('8:22:25 PM', 10)).toEqual('8:20:00 PM');

  expect(roundToNearestMinutes('00:3', 10)).toEqual('00:00');
  expect(roundToNearestMinutes('23:59', 10)).toEqual('00:00');
});

test('roundToNearestMinutes: dates', () => {
  expect(roundToNearestMinutes('2019-08-30 14:14 UTC+8', 15)).toEqual(new Date('2019-08-30T06:15:00.000Z'));
  expect(roundToNearestMinutes('2009-06-15T13:45:30', 10)).toEqual(new Date('2009-06-15T05:50:00.000Z'));
  expect(roundToNearestMinutes('2019-08-30 14:14 UTC+8', 0)).toEqual(new Date('2019-08-30T06:14:00.000Z'));
});

test('roundToNearestMinutes with invalid first argument', () => {
  // @ts-ignore
  expect(roundToNearestMinutes(true, 15)).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes({}, 15)).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes([], 15)).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes(12345, 15)).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes(null, 15)).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes(undefined, 15)).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes('', 15)).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes()).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes('')).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes({})).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes('Aug 10', 15)).toEqual(undefined);
  expect(roundToNearestMinutes('Aug 10 06:63', 15)).toEqual(undefined);
  expect(roundToNearestMinutes('2019-08-30', 15)).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes(2, 15)).toEqual(undefined);
  expect(roundToNearestMinutes('1', 15)).toEqual(undefined);
});

test('roundToNearestMinutes with invalid second argument', () => {
  // @ts-ignore
  expect(roundToNearestMinutes('10:15 PM', '')).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes('10:15 PM', [])).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes('10:15 PM', 35)).toEqual(undefined);
  // @ts-ignore
  expect(roundToNearestMinutes('10:16pm', 10, 'blah blach')).toEqual('10:20pm');
  // @ts-ignore
  expect(roundToNearestMinutes('10:16pm')).toEqual(undefined);
});
