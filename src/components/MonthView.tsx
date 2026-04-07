'use client';

import { Schedule } from '@/lib/db';
import { ScheduleModal } from './CreateSchedule';
import { CalendarWeek } from './CalendarWeek';
import { useCalendarModal } from '@/hooks/useCalendarModal';
import { UpdateSchedule } from './UpdateSchedule';

type PropsType = {
  matrix: Date[][];
  allSchedules: Schedule[];
};

export const MonthView = ({ matrix, allSchedules }: PropsType) => {
  const {
    isModal,
    setIsModal,
    selectDate,
    selectSchedule,
    setSelectSchedule,
    handleSelectSchedule,
    handleSelectDate,
    handleFormAction,
    handleDeleteAction,
  } = useCalendarModal();

  return (
    <>
      {matrix.map((week, weekIndex) => (
        <CalendarWeek
          key={weekIndex}
          week={week}
          allSchedules={allSchedules}
          onDayClick={handleSelectDate}
          onSelectSchedule={handleSelectSchedule}
        />
      ))}

      {isModal && (
        <>
          {selectSchedule ? (
            // 編集モード：selectSchedule があるとき
            <UpdateSchedule
              selectDate={selectDate}
              selectSchedule={selectSchedule}
              onClose={() => {
                setIsModal(false);
                setSelectSchedule(undefined); // 閉じる時にリセット
              }}
              onAction={handleFormAction}
              onDelete={handleDeleteAction}
            />
          ) : (
            // 新規作成モード：selectSchedule が無いとき
            <ScheduleModal
              selectDate={selectDate}
              onClose={() => setIsModal(false)}
              onAction={handleFormAction}
            />
          )}
        </>
      )}
    </>
  );
};
