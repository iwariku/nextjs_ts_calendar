import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
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

export const getNavigationPaths = (yearStr: string, monthStr: string) => {
  const year = Number(yearStr);
  const month = Number(monthStr);

  // --- 1. 現在表示している日の Date オブジェクトを作る ---
  // year, month, day は string なので、Date に変換する必要があります
  const currentDate = new Date(Number(year), Number(month) - 1);

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

  return {
    prevPath,
    nextPath,
  };
};
