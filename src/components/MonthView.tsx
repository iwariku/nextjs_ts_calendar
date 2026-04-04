// components/MonthView.tsx
import React from 'react';
import CalendarDay from './CalendarDay';

type PropsType = {
  matrix: Date[][];
};

export const MonthView = ({ matrix }: PropsType) => {
  return (
    <>
      {matrix.map((week, weekIndex) => (
        <React.Fragment key={weekIndex}>
          {week.map((date, dayIndex) => (
            <CalendarDay key={dayIndex} date={date} />
          ))}
        </React.Fragment>
      ))}
    </>
  );
};
