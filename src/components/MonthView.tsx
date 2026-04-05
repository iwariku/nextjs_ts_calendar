'use client';

import React, { useState } from 'react';
import Form from 'next/form';
import CalendarDay from './CalendarDay';
import { createSchedule } from '@/utils/actions';
import { format } from 'date-fns';
import { Schedule } from '@/lib/db';

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
