import type { BeeInputDateType, BeeInputType } from './types';

export const formatDates: Record<BeeInputDateType, string> = {
  'datetime-local': 'yyyy-MM-ddTHH:mm',
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM'
};

export const dateTypes = Object.keys(formatDates) as BeeInputType[];
