import React from 'react';
import CalendarDay from './CalendarDay';

type PropsType = {
  weekDays: Date[];
};

export const WeekView = ({ weekDays }: PropsType) => {
  return (
    <>
      {weekDays.map((date, dayIndex) => (
        <React.Fragment key={dayIndex}>
          <CalendarDay date={date} />
        </React.Fragment>
      ))}
    </>
  );
};
