'use client';

import React, { useState } from 'react';
import Form from 'next/form';
import CalendarDay from './CalendarDay';
import { createSchedule } from '@/utils/actions';
import { format } from 'date-fns';
import { Schedule } from '@/lib/db';
import { ScheduleModal } from './ScheduleModal';

type PropsType = {
  matrix: Date[][];
  allSchedules: Schedule[];
};

export const MonthView = ({ matrix, allSchedules }: PropsType) => {
  const [isModal, setIsModal] = useState(false);
  const [selectDate, setSelectDate] = useState<Date>();

  const handleSelectDate = (selectDate: Date) => {
    setIsModal(true);
    setSelectDate(selectDate);

    console.log(isModal);
    console.log(selectDate);
  };

  const handleFormAction = async (formData: FormData) => {
    await createSchedule(formData);
    setIsModal(false);
  };

  return (
    <>
      {matrix.map((week, weekIndex) => (
        <React.Fragment key={weekIndex}>
          {week.map((date, dayIndex) => (
            <CalendarDay
              key={dayIndex}
              date={date}
              onDayClick={handleSelectDate}
              allSchedules={allSchedules}
            />
          ))}
        </React.Fragment>
      ))}

      {isModal && (
        <ScheduleModal
          selectDate={selectDate}
          onClose={() => setIsModal(false)}
          onAction={handleFormAction}
        />
      )}
    </>
  );
};
