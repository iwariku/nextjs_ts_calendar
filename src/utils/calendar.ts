import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export type CalendarData = {
  calendarMatrix: Date[][];
};

export const getCalendarData = (
  yearStr: string,
  monthStr: string,
  dayStr: string,
): CalendarData => {
  // paramsからはstringで受け取るためNumber型にキャスト
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  const targetDate = new Date(year, month - 1, day);

  // 2. カレンダーの表示範囲(開始日と修了日)を計算
  const start = startOfWeek(startOfMonth(targetDate));
  const end = endOfWeek(endOfMonth(targetDate));

  // 3. 1ヶ月の範囲の日数を取得
  const calendarDays = eachDayOfInterval({ start, end });

  // --- カレンダー形成 ---
  // reduceを使ったコードは可読性が低いため使わない;
  const matrix: Date[][] = [];
  const daysCopy = [...calendarDays];
  while (daysCopy.length > 0) {
    matrix.push(daysCopy.splice(0, 7));
  }

  return {
    calendarMatrix: matrix,
  };
};
