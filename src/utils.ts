import { Hours, Minutes } from './custom-types';

export const addLeadingZero = (time: Hours | Minutes): string => {
  // adding leading zero to hours and minutes if it's not two-digit
  if (time && Number(time) < 10) {
    return `0${time}`;
  }
  // if time is a falsy value ("" or 0)
  if (!time) {
    return '00';
  }
  return `${time}`;
};

export const getFloorAndCeilingMinutes = (numbers: number[], minutes: number): number[] => {
  // if numbers is <= 2 return numbers
  if (numbers.length <= 2) {
    return numbers;
  }
  // get mid of array
  const midIndex = numbers.length / 2;
  const left = numbers.slice(0, midIndex);
  const right = numbers.slice(midIndex);

  const lastItemOfLeft = left[left.length - 1];
  const firstItemOfRight = right[0];

  // if lastItemOfLeft < minutes and firstItemOfRight > minutes
  // return both immediately
  if (lastItemOfLeft < minutes && firstItemOfRight > minutes) {
    return [lastItemOfLeft, firstItemOfRight];
  }

  // compare if last item of left array is greater than given minutes, if yes, call getFloorAndCeilingMinutes with left array
  if (lastItemOfLeft > minutes) {
    return [].concat.apply(getFloorAndCeilingMinutes(left, minutes));
  }

  // compare if first item of right array is less than given minutes, if yes, call getFloorAndCeilingMinutes with right array
  if (firstItemOfRight < minutes) {
    return [].concat.apply(getFloorAndCeilingMinutes(right, minutes));
  }
  return [];
};

export const getMinutesIntervalsInAnHour = (interval: number): number[] => {
  // get number of intervals
  const MINUTES_IN_HOUR = 60;
  const numIntervals = MINUTES_IN_HOUR / interval;
  const intervalsOfMinutes = [0];
  let currentMinute = 0;

  for (let i = 1; i <= numIntervals; i++) {
    currentMinute += interval;
    intervalsOfMinutes.push(currentMinute);
  }
  return intervalsOfMinutes;
};

export const replaceAllDigitsWithZeroes = (time: string): string => {
  return time.replace(/\d/g, '0');
};

export const hasValidArguments = (input: string | Date, nearestMinutes: number): boolean => {
  if (
    (typeof input !== 'string' && Object.prototype.toString.call(input) !== '[object Date]') ||
    typeof nearestMinutes !== 'number'
  ) {
    return false;
  }

  if (typeof input === 'string' && input.trim().length === 0) {
    return false;
  }

  if (nearestMinutes > 30) {
    console.error(
      `roundToNearestMinutes('${input}', ${nearestMinutes}) ${nearestMinutes} is not an allowed value for nearestMinutes. Value must only be from 1-30`,
    );
    return false;
  }
  return true;
};

export const convertToTwelvePmToTwelveAm = (time: string): string => {
  return time.replace('p', 'a').replace('P', 'A');
};

export const convertTwentyFourHourToZeroZero = (time: string): string => {
  if (time === '24:00') {
    return '00:00';
  }
  return time;
};
