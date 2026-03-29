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

  // clientで使う関数
  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className="max-w-4xl mx-auto border shadow-lg">
      {/* 1. 曜日のヘッダー行 */}
      <div className="grid grid-cols-7 border-b bg-yellow-200">
        {daysOfWeek.map((d) => (
          <div key={d} className="border-b border-r p-2 text-center font-bold">
            {d}
          </div>
        ))}
      </div>

      {/* 2. カレンダーの日付部分 */}
      <div className="grid grid-cols-7">
        {calendarMatrix.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="border-b border-r p-2 h-24 text-right"
              >
                {format(day, 'd')}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Page;
