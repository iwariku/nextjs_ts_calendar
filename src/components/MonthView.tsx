'use client';

import React, { useState } from 'react';
import Form from 'next/form';
import CalendarDay from './CalendarDay';
import { createSchedule } from '@/utils/actions';
import { format } from 'date-fns';
import { Schedule } from '@/lib/db';
import { ScheduleModal } from './ScheduleModal';
import { CalendarWeek } from './CalendarWeek';

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
        <CalendarWeek
          key={weekIndex}
          week={week}
          allSchedules={allSchedules}
          onDayClick={handleSelectDate}
        />
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
