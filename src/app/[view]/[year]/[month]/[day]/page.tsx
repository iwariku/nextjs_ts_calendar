import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  format,
} from 'date-fns';
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

  // 2. パスから受け取った文字列をからDateオブジェクトを生成
  // string型かで受け取るので、Number型にキャスト
  const targetDate = new Date(Number(year), Number(month) - 1, Number(day));

  // 3. カレンダーの表示範囲(開始日と修了日)を計算
  const start = startOfWeek(startOfMonth(targetDate));
  const end = endOfWeek(endOfMonth(targetDate));

  // 4. 全日程の配列を作成
  const calendarDays = eachDayOfInterval({ start, end });

  // --- カレンダー形成ロジック ---
  const generateCalendarMatrix = (days: Date[]): Date[][] => {
    const matrix: Date[][] = [];
    const daysCopy = [...days];

    while (daysCopy.length > 0) {
      const oneWeek = daysCopy.splice(0, 7);
      matrix.push(oneWeek);
    }

    return matrix;
  };

  const calendarMatrix = generateCalendarMatrix(calendarDays);

  // reduceを使った以下のコードは可読性が低いため使わない
  // const calendarMatrix = calendarDays.reduce(
  //   (acc: Date[][], curr: Date, i: number) => {
  //     if (i % 7 === 0) {
  //       acc.push([curr]);
  //     } else {
  //       acc[acc.length - 1].push(curr);
  //     }
  //     return acc;
  //   },
  //   [],
  // );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {view === 'month' ? '月表示' : '週表示'}: {year}年{month}月
      </h1>

      <p className="mb-2">カレンダーのマス目数: {calendarDays.length}</p>

      <ul className="list-disc ml-5 bg-amber-200">
        <li>開始日: {format(calendarDays[0], 'yyyy/MM/dd (E)')}</li>
        <li>
          終了日:{' '}
          {format(calendarDays[calendarDays.length - 1], 'yyyy/MM/dd (E)')}
        </li>
      </ul>
    </div>
  );
};

export default Page;
