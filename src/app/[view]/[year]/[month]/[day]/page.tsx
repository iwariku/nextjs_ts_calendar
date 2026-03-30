import CalendarDay from '@/components/CalendarDay';
import { getCalendarData } from '@/utils/calendar';
import { format, isToday } from 'date-fns';
import React from 'react';

type PageProps = {
  params: Promise<{
    view: string;
    year: string;
    month: string;
    day: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  // --- 日にち取得ロジック ---
  // 1. パラメータを取り出す
  const { view, year, month, day } = await params;

  const { calendarMatrix } = getCalendarData(year, month, day);

  const DAYS_OF_WEEK = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className="max-w-4xl mx-auto border shadow-lg">
      {/* 1. 曜日のヘッダー行 */}
      <div className="grid grid-cols-7 border-b bg-yellow-200">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="border-b border-r p-2 text-center font-bold">
            {d}
          </div>
        ))}
      </div>
      {/* 2. カレンダーの日付部分 */}
      <div className="grid grid-cols-7">
        {calendarMatrix.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((date, dayIndex) => (
              <CalendarDay key={dayIndex} date={date} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Page;
