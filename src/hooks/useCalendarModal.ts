import { createSchedule } from '@/utils/actions';
import { useState } from 'react';

export const useCalendarModal = () => {
  const [isModal, setIsModal] = useState(false);
  const [selectDate, setSelectDate] = useState<Date>();

  const handleSelectDate = (selectDate: Date) => {
    setIsModal(true);
    setSelectDate(selectDate);
  };

  const handleFormAction = async (formData: FormData) => {
    await createSchedule(formData);
    setIsModal(false);
  };

  return {
    isModal,
    setIsModal,
    selectDate,
    handleSelectDate,
    handleFormAction,
  };
};
