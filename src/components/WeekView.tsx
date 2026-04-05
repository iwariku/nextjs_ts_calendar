'use client';

import React, { useState } from 'react';
import CalendarDay from './CalendarDay';
import { createSchedule } from '@/utils/actions';
import { Schedule } from '@/lib/db';
import Form from 'next/form';
import { format } from 'date-fns';
import { ScheduleModal } from './ScheduleModal';
import { CalendarWeek } from './CalendarWeek';

type PropsType = {
  week: Date[];
  allSchedules: Schedule[];
};

export const WeekView = ({ week, allSchedules }: PropsType) => {
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
      <CalendarWeek
        week={week}
        allSchedules={allSchedules}
        onDayClick={handleSelectDate}
      />

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
