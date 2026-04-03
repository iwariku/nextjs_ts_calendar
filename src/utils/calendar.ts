import {
  addMonths,
  addWeeks,
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

export type CalendarParams = {
  view?: string;
  year: string;
  month: string;
  day: string;
};

export const getCalendarData = ({
  year,
  month,
  day,
}: CalendarParams): CalendarData => {
  // paramsからはstringで受け取るためNumber型にキャスト
  const numYear = Number(year);
  const numMonth = Number(month);
  const numDay = Number(day);

  const currentDate = new Date(numYear, numMonth - 1, numDay);

  // 2. カレンダーの表示範囲(開始日と修了日)を計算
  const start = startOfWeek(startOfMonth(currentDate));
  const end = endOfWeek(endOfMonth(currentDate));

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

export const getNavigationPaths = ({ year, month, day }: CalendarParams) => {
  const numYear = Number(year);
  const numMonth = Number(month);
  const numDay = Number(day);

  // --- 1. 現在表示している日の Date オブジェクトを作る ---
  // year, month, day は string なので、Date に変換する必要があります
  const currentDate = new Date(numYear, numMonth - 1, numDay);

  // --- 2. 前月と翌月を計算する ---
  const prevMonthDate = addMonths(currentDate, -1);
  const nextMonthDate = addMonths(currentDate, 1);

  // --- 3. Link に渡すための URL 文字列を作る ---
  const FIRST_DAY = '01';

  const prevDatePart = format(prevMonthDate, 'yyyy/MM');
  const nextDatePart = format(nextMonthDate, 'yyyy/MM');

  const prevPath = `/month/${prevDatePart}/${FIRST_DAY}`;
  const nextPath = `/month/${nextDatePart}/${FIRST_DAY}`;

  return {
    prevPath,
    nextPath,
  };
};

export const getWeekData = ({
  year,
  month,
  day,
}: CalendarParams): CalendarData => {
  const numYear = Number(year);
  const numMonth = Number(month);
  const numDay = Number(day);

  const targetDate = new Date(numYear, numMonth - 1, numDay);

  const start = startOfWeek(targetDate);
  const end = endOfWeek(targetDate);

  const calendarWeek = eachDayOfInterval({ start, end });

  return { calendarMatrix: [calendarWeek] };
};

export const getNavigationWeek = ({ year, month, day }: CalendarParams) => {
  const numYear = Number(year);
  const numMonth = Number(month);
  const numDay = Number(day);

  // --- 1. 現在表示している日の Date オブジェクトを作る ---
  // year, month, day は string なので、Date に変換する必要があります
  const currentDate = new Date(numYear, numMonth - 1, numDay);

  // --- 2. 先週と翌週を計算する ---
  const prevWeekDate = addWeeks(currentDate, -1);
  const nextWeekDate = addWeeks(currentDate, 1);

  // --- 移動した先の週の始めを受け取る(日曜日の日) ---
  const prevWeekStart = startOfWeek(prevWeekDate);
  const nextWeekStart = startOfWeek(nextWeekDate);

  const prevWeekPart = format(prevWeekStart, 'yyyy/MM/dd');
  const nextWeekPart = format(nextWeekStart, 'yyyy/MM/dd');

  const prevPath = `/week/${prevWeekPart}`;
  const nextPath = `/week/${nextWeekPart}`;

  return {
    prevPath,
    nextPath,
  };
};
