'use client';
import { Schedule } from '@/lib/db';
import { format } from 'date-fns';
import Form from 'next/form';

type PropsType = {
  selectDate: Date | undefined;
  selectSchedule: Schedule;
  onClose: () => void;
  onAction: (formData: FormData) => Promise<void>;
  onDelete: (formData: FormData) => Promise<void>;
};

export const UpdateSchedule = ({
  selectDate,
  selectSchedule,
  onClose,
  onAction,
  onDelete,
}: PropsType) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-[448px] relative text-gray-900">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Form action={onDelete}>
            <input type="hidden" name="id" value={selectSchedule?.id} />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={(e) => !confirm('削除しますか？') && e.preventDefault()}
            >
              予定の削除
            </button>
          </Form>

          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <h2 className="text-xl font-bold mb-6 text-gray-700">予定を修正</h2>

        <Form action={onAction} className="flex flex-col gap-6">
          <input type="hidden" name="id" value={selectSchedule?.id} />

          <input
            type="text"
            name="title"
            required
            autoFocus
            defaultValue={selectSchedule?.title}
            className="w-full text-2xl border-b-2 border-gray-200 focus:border-blue-600 outline-none pb-2 transition-all"
          />

          <div className="flex items-center gap-3 text-gray-600">
            <input
              type="text"
              name="date"
              readOnly
              value={selectDate ? format(selectDate, 'yyyy/MM/dd') : ''}
              className="text-sm outline-none bg-transparent font-medium"
            />
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              更新
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
