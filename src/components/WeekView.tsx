'use client';

import { Schedule } from '@/lib/db';
import { ScheduleModal } from './ScheduleModal';
import { CalendarWeek } from './CalendarWeek';
import { useCalendarModal } from '@/hooks/useCalendarModal';

type PropsType = {
  week: Date[];
  allSchedules: Schedule[];
};

export const WeekView = ({ week, allSchedules }: PropsType) => {
  const {
    isModal,
    setIsModal,
    selectDate,
    handleSelectDate,
    handleFormAction,
  } = useCalendarModal();

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
