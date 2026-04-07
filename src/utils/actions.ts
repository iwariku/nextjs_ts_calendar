'use server';

import { schedules } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createSchedule(formData: FormData) {
  const title = formData.get('title');
  const date = formData.get('date');

  if (typeof title !== 'string' || typeof date !== 'string') {
    return;
  }

  schedules.push({
    id: crypto.randomUUID(),
    title: title,
    date: date,
  });

  revalidatePath('/');
}

export const updateSchedule = async (formData: FormData) => {
  const id = formData.get('id');
  const title = formData.get('title');
  const date = formData.get('date');

  if (
    typeof id !== 'string' ||
    typeof title !== 'string' ||
    typeof date !== 'string'
  ) {
    return;
  }

  // idが一致する要素が「何番目」にあるか探す
  const index = schedules.findIndex((s) => s.id === id);

  // もし見つかったら、その場所を上書きする
  if (index !== -1) {
    schedules[index] = { id, title, date };
  }

  revalidatePath('/');
};

export const deleteSchedule = async (formData: FormData) => {
  const id = formData.get('id');

  if (typeof id !== 'string') {
    return;
  }

  const index = schedules.findIndex((s) => s.id === id);

  if (index !== -1) {
    schedules.splice(index, 1);
  }

  revalidatePath('/');
};
