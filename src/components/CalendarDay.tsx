import { Schedule } from '@/lib/db';
import { format, isToday } from 'date-fns';
import React from 'react';

type PropsType = {
  date: Date;
  allSchedules: Schedule[];
  onDayClick: (date: Date) => void;
  onSelectSchedule: (schedule: Schedule) => void;
};

const CalendarDay = ({
  date,
  allSchedules,
  onDayClick,
  onSelectSchedule,
}: PropsType) => {
  const isCurrentDay = isToday(date);

  const dateStr = format(date, 'yyyy/MM/dd');
  const Schedules = allSchedules.filter((s) => s.date === dateStr);

  return (
    <div
      onClick={() => onDayClick(date)}
      className="border-b border-r p-2 h-24 text-right bg-white"
    >
      <span
        className={`
          inline-flex items-center justify-center w-8 h-8 
          ${isCurrentDay ? 'bg-blue-600 text-white rounded-full' : ''}
        `}
      >
        {format(date, 'd')}
      </span>

      <div className="mt-1">
        {Schedules.map((schedule) => (
          <button
            key={schedule.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelectSchedule(schedule);
            }}
          >
            {schedule.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
