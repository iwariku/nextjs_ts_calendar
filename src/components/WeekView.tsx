'use client';

import React, { useState } from 'react';
import CalendarDay from './CalendarDay';
import { createSchedule } from '@/utils/actions';
import { Schedule } from '@/lib/db';
import Form from 'next/form';
import { format } from 'date-fns';

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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">予定を作成</h2>

            <Form action={handleFormAction}>
              <input
                type="text"
                name="title"
                placeholder="タイトルを入力してください"
              />
              <input
                type="text"
                name="date"
                readOnly
                value={selectDate ? format(selectDate, 'yyyy/MM/dd') : ''}
              />
              <button type="submit">保存</button>
            </Form>

            <button
              onClick={() => setIsModal(false)}
              className="mt-4 px-4 pt-2 bg-blue-600 text-white rounded"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
};
