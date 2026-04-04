'use client';

import React, { useState } from 'react';
import CalendarDay from './CalendarDay';

type PropsType = {
  weekDays: Date[];
};

export const WeekView = ({ weekDays }: PropsType) => {
  const [isModal, setIsModal] = useState(false);

  console.log(isModal);

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
