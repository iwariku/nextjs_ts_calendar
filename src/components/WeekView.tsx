'use client';

import { Schedule } from '@/lib/db';
import { ScheduleModal } from './ScheduleModal';
import { CalendarWeek } from './CalendarWeek';
import { useCalendarModal } from '@/hooks/useCalendarModal';
import { UpdateSchedule } from './UpdateSchedule';

type PropsType = {
  week: Date[];
  allSchedules: Schedule[];
};

export const WeekView = ({ week, allSchedules }: PropsType) => {
  const {
    isModal,
    setIsModal,
    selectDate,
    selectSchedule,
    setSelectSchedule,
    handleSelectSchedule,
    handleSelectDate,
    handleFormAction,
  } = useCalendarModal();

  return (
    <>
      <CalendarWeek
        week={week}
        allSchedules={allSchedules}
        onDayClick={handleSelectDate}
        onSelectSchedule={handleSelectSchedule}
      />

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
