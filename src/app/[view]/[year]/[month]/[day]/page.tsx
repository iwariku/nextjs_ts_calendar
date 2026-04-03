import CalendarDay from '@/components/CalendarDay';
import {
  getCalendarData,
  getNavigationPaths,
  getNavigationWeek,
  getWeekData,
} from '@/utils/calendar';
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

  // viewによって呼ぶ関数を変える
  const { calendarMatrix } =
    view === 'month'
      ? getCalendarData(year, month, day)
      : getWeekData(year, month, day);

  // const { calendarMatrix } = getCalendarData(year, month, day);

  // const { prevPath, nextPath } = getNavigationPaths(year, month);
  const { prevPath, nextPath } = getNavigationWeek(year, month, day);

  // const { calendarWeek } = getWeekData(year, month, day);

  const DAYS_OF_WEEK = ['日', '月', '火', '水', '木', '金', '土'];
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

      <div className="flex border rounded-md p-1 bg-gray-50">
        <Link
          href={`/month/${year}/${month}/${day}`}
          className="px-4 py-1 hover:bg-white hover:shadow-sm rounded-md transition-all"
        >
          月
        </Link>
        <Link
          href={`/week/${year}/${month}/${day}`}
          className="px-4 py-1 hover:bg-white hover:shadow-sm rounded-md transition-all"
        >
          週
        </Link>
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
          {view === 'month'
            ? // 今までの月表示ロジック
              calendarMatrix.map((week, weekIndex) => (
                <React.Fragment key={weekIndex}>
                  {week.map((date, dayIndex) => (
                    <CalendarDay key={dayIndex} date={date} />
                  ))}
                </React.Fragment>
              ))
            : // ★週表示（1重ループ）
              // 2次元配列の 0番目（今週分）を取り出して map で回す
              calendarMatrix[0].map((date, dayIndex) => (
                <div
                  key={dayIndex}
                  className="min-h-[400px] border-r p-2 bg-gray-50"
                >
                  <CalendarDay date={date} />
                  {/* ここに将来的に時間軸の枠などを入れるイメージ */}
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Page;
