import { Schedule } from '@/lib/db';
import React from 'react';
import CalendarDay from './CalendarDay';

type PropsType = {
  week: Date[];
  allSchedules: Schedule[];
  onDayClick: (date: Date) => void;
  onSelectSchedule: (schedule: Schedule) => void;
};

export const CalendarWeek = ({
  week,
  allSchedules,
  onDayClick,
  onSelectSchedule,
}: PropsType) => {
  return (
    <div className="contents">
      {week.map((date, dayIndex) => (
        <CalendarDay
          key={dayIndex}
          date={date}
          onDayClick={onDayClick}
          allSchedules={allSchedules}
          onSelectSchedule={onSelectSchedule}
        />
      ))}
    </div>
  );
};
