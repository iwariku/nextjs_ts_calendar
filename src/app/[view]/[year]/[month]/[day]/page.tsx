import CalendarDay from '@/components/CalendarDay';
import { getCalendarData } from '@/utils/calendar';
import { addMonths, format, isToday } from 'date-fns';
import Link from 'next/link';
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

  // ===================================
  // --- 次月、前月のロジックの案 範囲始め---

  // --- 1. 現在表示している日の Date オブジェクトを作る ---
  // year, month, day は string なので、Date に変換する必要があります
  const currentDate = new Date(Number(year), Number(month) - 1, Number(day));

  // --- 2. 前月と翌月を計算する ---
  const prevMonthDate = addMonths(currentDate, -1);
  const nextMonthDate = addMonths(currentDate, 1);

  // --- 3. Link に渡すための URL 文字列を作る ---
  const MONTH_STR = 'month'; // 将来的に年、月、週、日のオブジェクト形式で渡す設計が良さそう
  const FIRST_DAY = '01';

  const prevDatePart = format(prevMonthDate, 'yyyy/MM');
  const nextDatePart = format(nextMonthDate, 'yyyy/MM');

  const prevPath = `/${MONTH_STR}/${prevDatePart}/${FIRST_DAY}`;
  const nextPath = `/${MONTH_STR}/${nextDatePart}/${FIRST_DAY}`;

  // --- 次月、前月のロジックの案 範囲終わり---
  // ===================================

  return (
    <>
      <div className="max-w-4xl mx-auto flex items-center gap-4 p-4 bg-white">
        <div className="flex items-center">
          <Link href={prevPath} className="p-2 hover:bg-gray-100 rounded-full">
            ＜
          </Link>
          <Link href={nextPath} className="p-2 hover:bg-gray-100 rounded-full">
            ＞
          </Link>
        </div>
        <h2 className="text-xl font-semibold">
          {year}年{month}月
        </h2>
      </div>

      <div className="max-w-4xl mx-auto border shadow-lg">
        {/* 1. 曜日のヘッダー行 */}
        <div className="grid grid-cols-7 border-b bg-yellow-200">
          {DAYS_OF_WEEK.map((d) => (
            <div
              key={d}
              className="border-b border-r p-2 text-center font-bold"
            >
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
    </>
  );
};

export default Page;
