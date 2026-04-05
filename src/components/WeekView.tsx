'use client';

import React, { useState } from 'react';
import CalendarDay from './CalendarDay';
import { createSchedule } from '@/utils/actions';
import { Schedule } from '@/lib/db';
import Form from 'next/form';
import { format } from 'date-fns';
import { ScheduleModal } from './ScheduleModal';

type PropsType = {
  weekDays: Date[];
  allSchedules: Schedule[];
};

export const WeekView = ({ weekDays, allSchedules }: PropsType) => {
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
      {weekDays.map((date, dayIndex) => (
        <React.Fragment key={dayIndex}>
          <CalendarDay
            key={dayIndex}
            date={date}
            onDayClick={handleSelectDate}
            allSchedules={allSchedules}
          />
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
