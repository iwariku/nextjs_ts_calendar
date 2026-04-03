import Link from 'next/link';

type PropsType = {
  prevPath: string;
  nextPath: string;
  year: string;
  month: string;
  day: string;
  view: string;
};

export const Header = ({
  prevPath,
  nextPath,
  year,
  month,
  day,
  view,
}: PropsType) => {
  return (
    <>
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Link
              href={prevPath}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-xl"
            >
              ＜
            </Link>
            <Link
              href={nextPath}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-xl"
            >
              ＞
            </Link>
          </div>
          <h2 className="text-2xl font-medium min-w-[150px]">
            {year}年{month}月
          </h2>
        </div>

        <div className="flex items-center border rounded-md p-1 bg-gray-50 shadow-sm">
          <Link
            href={`/month/${year}/${month}/${day}`}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              view === 'month'
                ? 'bg-white shadow text-blue-600'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            月
          </Link>
          <Link
            href={`/week/${year}/${month}/${day}`}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              view === 'week'
                ? 'bg-white shadow text-blue-600'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            週
          </Link>
        </div>
      </div>
    </>
  );
};
