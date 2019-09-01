import { Hours, Minutes } from './custom-types';
import * as RegexPatterns from './regex-patterns';
import {
  addLeadingZero,
  convertToTwelvePmToTwelveAm,
  convertTwentyFourHourToZeroZero,
  getFloorAndCeilingMinutes,
  getMinutesIntervalsInAnHour,
  hasValidArguments,
  replaceAllDigitsWithZeroes,
} from './utils';

type RoundToNearestMinutesArguments = [string | Date, number];
type RoundToNearestMinutesFromTimeArguments = [string, number];
type RoundToNearestMinutesFromDateArguments = [Date, number];
type RoundToNearestMinutesReturnTypes = string | Date | undefined;
type RoundToNearestMinutesFromTimeReturnTypes = string | undefined;
type RoundFromDateReturnTypes = Date;

const roundToNearestMinutesFromTime: (
  ...args: RoundToNearestMinutesFromTimeArguments
) => RoundToNearestMinutesFromTimeReturnTypes = (input, nearestMinutes) => {
  if (nearestMinutes <= 0) {
    return input;
  }

  if (RegexPatterns.ONLY_HOURS_AND_TIME_PERIOD.test(input)) {
    return input;
  }

  if (!RegexPatterns.TWELVE_HOUR_FORMAT.test(input) && !RegexPatterns.TWENTY_FOUR_HOUR_FORMAT.test(input)) {
    console.error(`roundToNearestMinutes('${input}', ${nearestMinutes}) '${input}' is not a valid time.`);
    return undefined;
  }

  let timeSuffix = input.replace(RegexPatterns.HOURS_AND_MINUTES, '');
  const timeHasTwelveHourFormat = RegexPatterns.AM_PM.test(timeSuffix);
  let timeComponents;
  let hoursAndMinutes;
  if (timeHasTwelveHourFormat) {
    timeComponents = input.match(RegexPatterns.TWELVE_HOUR_FORMAT);
  } else {
    // 24 hour format
    timeComponents = input.match(RegexPatterns.TWENTY_FOUR_HOUR_FORMAT);
  }

  hoursAndMinutes = timeComponents ? timeComponents[0] : null;

  if (!hoursAndMinutes) {
    return undefined;
  }

  let hours: Hours = parseInt(hoursAndMinutes.split(':')[0], 10);
  let minutes: Minutes = parseInt(hoursAndMinutes.split(':')[1], 10);

  // get minutes intervals in hour based on given nearestMinutes
  const minutesIntervalsInAnHour = getMinutesIntervalsInAnHour(nearestMinutes);

  // if input time's minutes is in the intervals, return original time
  // example, roundToNearestMinutes('10:15 AM', 15) should return '10:15 AM'
  // since nearest 15 minutes is 10:15

  if (minutesIntervalsInAnHour.indexOf(minutes) < 0) {
    // get closest minutes
    const floorAndCeilMinutes = getFloorAndCeilingMinutes(minutesIntervalsInAnHour, minutes);
    const floorMinutes: Minutes = floorAndCeilMinutes[0];
    const ceilMinutes: Minutes = floorAndCeilMinutes[1];

    // get difference between minutes from floored minutes and input's minutes
    const diffFromFloor = minutes - floorMinutes;

    // get difference between minutes from ceiling minutes and input's minutes
    const diffFromCeil = ceilMinutes - minutes;

    // if diffFromFloor < diffFromCeil, return hour:floorMinutes
    if (diffFromFloor <= diffFromCeil) {
      minutes = floorMinutes;
    }
    // if diffFromFloor > diffFromCeil, return hour:ceilMinutes
    if (diffFromFloor > diffFromCeil) {
      minutes = ceilMinutes;
    }

    if (minutes >= 60) {
      minutes = minutes - 60;
      hours++;
    }
  }

  timeSuffix = replaceAllDigitsWithZeroes(timeSuffix);
  let roundedTime = `${hours}:${addLeadingZero(minutes)}${timeSuffix}`;

  if (!timeHasTwelveHourFormat || RegexPatterns.TIME_WITH_LEADING_ZERO.test(input)) {
    roundedTime = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}${timeSuffix}`;
    // in case, it's 24:00, it should be 00:00
    roundedTime = convertTwentyFourHourToZeroZero(roundedTime);
  }

  if (RegexPatterns.IS_HOUR_BEFORE_MIDNIGHT.test(input) && RegexPatterns.IS_TWELVE_PM.test(roundedTime)) {
    roundedTime = convertToTwelvePmToTwelveAm(roundedTime);
  }

  return roundedTime;
};

const roundToNearestMinutesFromDate: (...args: RoundToNearestMinutesFromDateArguments) => RoundFromDateReturnTypes = (
  date,
  nearestMinutes,
) => {
  if (nearestMinutes <= 0) {
    return date;
  }

  const coeff = 1000 * 60 * nearestMinutes;
  return new Date(Math.round(date.getTime() / coeff) * coeff);
};

// allow roundingUp or roundingDown options only?
export const roundToNearestMinutes: (...args: RoundToNearestMinutesArguments) => RoundToNearestMinutesReturnTypes = (
  input,
  nearestMinutes,
) => {
  try {
    if (!hasValidArguments(input, nearestMinutes)) {
      return undefined;
    }

    if (typeof input === 'string') {
      input = input.trim(); // remove extra whitespaces from start and end

      // check first if it's a date
      const numberOfMilleseconds = Date.parse(input);
      if (numberOfMilleseconds && !Number(input)) {
        // check if there's a valid time in date string
        if (!RegexPatterns.DATE_WITH_HOURS_AND_MINUTES.test(input)) {
          console.error(`roundToNearestMinutes('${input}', ${nearestMinutes}) '${input}' does not have a valid time.`);
          return undefined;
        }
        return roundToNearestMinutesFromDate(new Date(input), nearestMinutes);
      } else {
        return roundToNearestMinutesFromTime(input, nearestMinutes);
      }
    } else {
      // input is instanceOf Date
      return roundToNearestMinutesFromDate(input, nearestMinutes);
    }
  } catch (err) {
    console.error(`roundToNearestMinutes(${input}, ${nearestMinutes}) error: ${err}`);
    return undefined;
  }
};
