import { format, isToday } from 'date-fns';
import React from 'react';

const CalendarDay = ({ date }: { date: Date }) => {
  const isCurrentDay = isToday(date);

  return (
    <div className="border-b border-r p-2 h-24 text-right bg-white">
      <span
        className={`
          inline-flex items-center justify-center w-8 h-8 
          ${isCurrentDay ? 'bg-blue-600 text-white rounded-full' : ''}
        `}
      >
        {format(date, 'd')}
      </span>
    </div>
  );
};

export default CalendarDay;
