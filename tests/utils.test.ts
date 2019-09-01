import { convertToTwelvePmToTwelveAm, getFloorAndCeilingMinutes, getMinutesIntervalsInAnHour } from '../src/utils';

test('getMinutesIntervalsInAnHour', () => {
  expect(getMinutesIntervalsInAnHour(15)).toEqual([0, 15, 30, 45, 60]);
  expect(getMinutesIntervalsInAnHour(5)).toEqual([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]);
});

test('getFloorAndCeilingMinutes', () => {
  expect(getFloorAndCeilingMinutes([0, 15, 30, 45, 60], 13)).toEqual([0, 15]);
  expect(getFloorAndCeilingMinutes([0, 15, 30, 45, 60, 75], 65)).toEqual([60, 75]);
});

test('convertToTwelvePmToTwelveAm', () => {
  expect(convertToTwelvePmToTwelveAm('12:00pm')).toEqual('12:00am');
  expect(convertToTwelvePmToTwelveAm('12:00p.m.')).toEqual('12:00a.m.');
  expect(convertToTwelvePmToTwelveAm('12:00P.m.')).toEqual('12:00A.m.');
  expect(convertToTwelvePmToTwelveAm('12:00P.M.')).toEqual('12:00A.M.');
  expect(convertToTwelvePmToTwelveAm('12:00PM')).toEqual('12:00AM');
  expect(convertToTwelvePmToTwelveAm('12:00PM.')).toEqual('12:00AM.');
  expect(convertToTwelvePmToTwelveAm('12:00 pm')).toEqual('12:00 am');
  expect(convertToTwelvePmToTwelveAm('12:00 PM')).toEqual('12:00 AM');
  expect(convertToTwelvePmToTwelveAm('12:00 p.m.')).toEqual('12:00 a.m.');
  expect(convertToTwelvePmToTwelveAm('12:00 P.M.')).toEqual('12:00 A.M.');
});
