import addDays from 'date-fns/addDays';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import endOfDay from 'date-fns/endOfDay';
import getHours from 'date-fns/getHours';
import getSeconds from 'date-fns/getSeconds';
import getYear from 'date-fns/getYear';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import isValid from 'date-fns/isValid';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import setSeconds from 'date-fns/setSeconds';
import setYear from 'date-fns/setYear';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import { IUtils } from '../IUtils';
export default class DateFnsUtils implements IUtils<Date> {
  locale?: Locale;
  addDays: typeof addDays;
  isValid: typeof isValid;
  getDiff: typeof differenceInMilliseconds;
  isAfter: typeof isAfter;
  isBefore: typeof isBefore;
  startOfDay: typeof startOfDay;
  endOfDay: typeof endOfDay;
  getHours: typeof getHours;
  setHours: typeof setHours;
  setMinutes: typeof setMinutes;
  getSeconds: typeof getSeconds;
  setSeconds: typeof setSeconds;
  isSameDay: typeof isSameDay;
  getStartOfMonth: typeof startOfMonth;
  getYear: typeof getYear;
  setYear: typeof setYear;
  dateTime12hFormat: string;
  dateTime24hFormat: string;
  time12hFormat: string;
  time24hFormat: string;
  dateFormat: string;
  constructor({ locale }?: { locale?: Locale });
  date(value?: any): Date | null;
  parse(value: string, formatString: string): Date | null;
  format(date: Date, formatString: string): string;
  isEqual(date: Date, comparing: Date): boolean;
  isNull(date: Date): boolean;
  isAfterDay(date: Date, value: Date): boolean;
  isBeforeDay(date: Date, value: Date): boolean;
  isBeforeYear(date: Date, value: Date): boolean;
  isAfterYear(date: Date, value: Date): boolean;
  formatNumber(num: string): string;
  getMinutes(date: Date): number;
  getMonth(date: Date): number;
  getMeridiemText(ampm: 'am' | 'pm'): 'AM' | 'PM';
  getNextMonth(date: Date): Date;
  getPreviousMonth(date: Date): Date;
  mergeDateAndTime(date: Date, time: Date): Date;
  getWeekdays(): string[];
  getWeekArray(date: Date): Date[][];
  getYearRange(start: Date, end: Date): Date[];
  getCalendarHeaderText(date: Date): string;
  getYearText(date: Date): string;
  getDatePickerHeaderText(date: Date): string;
  getDateTimePickerHeaderText(date: Date): string;
  getDayText(date: Date): string;
  getHourText(date: Date, ampm: boolean): string;
  getMinuteText(date: Date): string;
  getSecondText(date: Date): string;
}
