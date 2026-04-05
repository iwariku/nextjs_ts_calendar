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
