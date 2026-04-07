import { Schedule } from '@/lib/db';
import {
  createSchedule,
  deleteSchedule,
  updateSchedule,
} from '@/utils/actions';
import { useState } from 'react';

export const useCalendarModal = () => {
  const [isModal, setIsModal] = useState(false);
  const [selectDate, setSelectDate] = useState<Date>();
  const [selectSchedule, setSelectSchedule] = useState<Schedule>();

  const handleSelectDate = (selectDate: Date) => {
    setIsModal(true);
    setSelectDate(selectDate);
  };

  // 予定をクリックした時用の関数
  const handleSelectSchedule = (schedule: Schedule) => {
    setIsModal(true);
    setSelectSchedule(schedule);
    setSelectDate(new Date(schedule.date));
  };

  const handleCreate = async (formData: FormData) => {
    await createSchedule(formData);
    setIsModal(false);
  };

  const handleUpdate = async (formData: FormData) => {
    await updateSchedule(formData);
    setIsModal(false);
    setSelectSchedule(undefined);
  };

  const handleDelete = async (formData: FormData) => {
    await deleteSchedule(formData);
    setIsModal(false);
    setSelectSchedule(undefined);
  };

  return {
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
  };
};
