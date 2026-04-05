'use client';

import { Schedule } from '@/lib/db';
import { ScheduleModal } from './ScheduleModal';
import { CalendarWeek } from './CalendarWeek';
import { useCalendarModal } from '@/hooks/useCalendarModal';

type PropsType = {
  matrix: Date[][];
  allSchedules: Schedule[];
};

export const MonthView = ({ matrix, allSchedules }: PropsType) => {
  const {
    isModal,
    setIsModal,
    selectDate,
    handleSelectDate,
    handleFormAction,
  } = useCalendarModal();

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
