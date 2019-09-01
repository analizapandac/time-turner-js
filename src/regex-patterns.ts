// For more information about each regex, see the links above each pattern for more details

// https://regex101.com/r/7CJJl3/1
export const AM_PM = /(a\.?m\.?|p\.?m\.?)$/i;
// https://regex101.com/r/CYsdOB/2/
export const HOURS_AND_MINUTES = /(^(0?[1-9]|1[012]):([0-5][0-9]|[1-9]))|(^([01]?[0-9]|2[0-3]):([0-5][0-9]|[1-9]))/;
// https://regex101.com/r/Nc0t3O/2
export const TWELVE_HOUR_FORMAT = /^(0?[1-9]|1[012]):([0-5][0-9]|[1-9])(:([0-5][0-9]|[1-9]))?(\.\d{1,3})?(\s*(a\.?m\.?|p\.?m\.?))?$/i;
// https://regex101.com/r/LBoYE1/2
export const TWENTY_FOUR_HOUR_FORMAT = /^([01]?[0-9]|2[0-3]):([0-5][0-9]|[1-9])(:([0-5][0-9]|[1-9]))?(\.\d{1,3})?$/;
// https://regex101.com/r/Ld23AW/2
export const ONLY_HOURS_AND_TIME_PERIOD = /^(0?[1-9]|1[012])\s*(a\.?m\.?|p\.?m\.?)$/i;
// https://regex101.com/r/66uwbp/2
export const TIME_WITH_LEADING_ZERO = /^0/;
// https://regex101.com/r/rjC20E/2
export const DATE_WITH_HOURS_AND_MINUTES = /(0?[1-9]|1[012]):([0-5][0-9])|([01]?[0-9]|2[0-3]):([0-5][0-9])/;
// https://regex101.com/r/995esm/2
export const IS_HOUR_BEFORE_MIDNIGHT = /^11:([3-5][0-9])(:([0-5][0-9]|[1-9]))?(\.\d{1,3})?(\s*(p\.?m\.?))?$/i;
// https://regex101.com/r/PzPwLx/2/
export const IS_TWELVE_PM = /^12:00?(\.\d{1,3})?(\s*(p\.?m\.?))?$/i;