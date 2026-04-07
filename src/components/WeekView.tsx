'use client';

import { Schedule } from '@/lib/db';
import { ScheduleModal } from './CreateSchedule';
import { CalendarWeek } from './CalendarWeek';
import { useCalendarModal } from '@/hooks/useCalendarModal';
import { EditSchedule } from './EditSchedule';

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
    handleCreate,
    handleUpdate,
    handleDelete,
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
            <EditSchedule
              selectDate={selectDate}
              selectSchedule={selectSchedule}
              onClose={() => {
                setIsModal(false);
                setSelectSchedule(undefined); // 閉じる時にリセット
              }}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ) : (
            // 新規作成モード：selectSchedule が無いとき
            <ScheduleModal
              selectDate={selectDate}
              onClose={() => setIsModal(false)}
              onCreate={handleCreate}
            />
          )}
        </>
      )}
    </>
  );
};
