import { Header } from '@/components/Header';
import { MonthView } from '@/components/MonthView';
import { WeekHeader } from '@/components/WeekHeader';
import { WeekView } from '@/components/WeekView';
import {
  getCalendarData,
  getNavigationPaths,
  getNavigationWeek,
  getWeekData,
} from '@/utils/calendar';
import { schedules } from '@/lib/db';
import React from 'react';

type PageProps = {
  params: Promise<{
    view: string;
    year: string;
    month: string;
    day: string;
  }>;
};

const CalendarPage = async ({ params }: PageProps) => {
  // 1. パラメータを取り出す
  const dateParams = await params;
  const { view } = dateParams;

  // viewによって呼ぶ関数を変える
  const { calendarMatrix } =
    view === 'month' ? getCalendarData(dateParams) : getWeekData(dateParams);

  const { prevPath, nextPath } =
    view === 'month'
      ? getNavigationPaths(dateParams)
      : getNavigationWeek(dateParams);

  return (
    <>
      <Header prevPath={prevPath} nextPath={nextPath} params={dateParams} />

      <div className="max-w-4xl mx-auto border shadow-lg">
        <WeekHeader />

        {/* 2. カレンダーの日付部分 */}
        <div className="grid grid-cols-7">
          {view === 'month' ? (
            <MonthView matrix={calendarMatrix} allSchedules={schedules} />
          ) : (
            // calendarMatrix[0]はパスから受け取った日を含む1週間を示す
            <WeekView weekDays={calendarMatrix[0]} />
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
