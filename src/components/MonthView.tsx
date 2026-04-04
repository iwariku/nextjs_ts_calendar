'use client';

import React, { useState } from 'react';
import CalendarDay from './CalendarDay';

type PropsType = {
  matrix: Date[][];
};

export const MonthView = ({ matrix }: PropsType) => {
  const [isModal, setIsModal] = useState(false);
  const [selectDate, setSelectDate] = useState<Date | null>(null);

  const handleSelectDate = (selectDate: Date) => {
    setIsModal(true);
    setSelectDate(selectDate);

    console.log(isModal);
    console.log(selectDate);
  };

  console.log(isModal);

  return (
    <>
      {matrix.map((week, weekIndex) => (
        <React.Fragment key={weekIndex}>
          {week.map((date, dayIndex) => (
            <CalendarDay
              key={dayIndex}
              date={date}
              onDayClick={handleSelectDate}
            />
          ))}
        </React.Fragment>
      ))}

      {isModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">予定を作成</h2>
            <p>日付: {selectDate?.toLocaleDateString()}</p>

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
