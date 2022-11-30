import * as dateFns from 'date-fns';

export type Timezone = {
  minusSign: boolean;
  hours: number;
  minutes: number;
};

export function getTimeBasedOnTimezone(timezoneObj: Timezone, date?: Date | number): Date {
  let timeBasedOnTimezone = new Date(date) || new Date();
  if (timezoneObj.minusSign) {
    timeBasedOnTimezone = dateFns.subHours(timeBasedOnTimezone, timezoneObj.hours);
    timeBasedOnTimezone = dateFns.subMinutes(timeBasedOnTimezone, timezoneObj.minutes);
  } else {
    timeBasedOnTimezone = dateFns.addHours(timeBasedOnTimezone, timezoneObj.hours);
    timeBasedOnTimezone = dateFns.addMinutes(timeBasedOnTimezone, timezoneObj.minutes);
  }
  return timeBasedOnTimezone;
}

export function getDayMinutesFromTimestamp(timestamp: number) {
  const startOfDay = new Date(timestamp).setUTCHours(0, 0, 0, 0);
  return dateFns.differenceInMinutes(new Date(timestamp), startOfDay);
}

export function setTimestampBasedOnDayMinutes(timestamp: number, requiredMinutes: number) {
  const startOfDay = new Date(timestamp).setUTCHours(0, 0, 0, 0);
  return dateFns.addMinutes(startOfDay, requiredMinutes).getTime();
}

export function getTimezone(timezoneAsString = '+02:00') {
  if (timezoneAsString.search(/\-|\+/) < 0) timezoneAsString = '+02:00';
  const mathOperation = timezoneAsString.slice(0, 1);
  const value = timezoneAsString.replace(mathOperation, '');
  const hours = isNaN(Number(value.split(':')[0])) ? 2 : Number(value.split(':')[0]);
  const minutes = isNaN(value as any)
    ? 0
    : isNaN(Number(value.split(':')[1]))
    ? 0
    : Number(value.split(':')[1]);
  return { minusSign: mathOperation === '-', hours, minutes };
}
