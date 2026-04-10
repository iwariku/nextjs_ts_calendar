export const WeekHeader = () => {
  const DAYS_OF_WEEK = ['日', '月', '火', '水', '木', '金', '土'];
  return (
    <>
      <div className="grid grid-cols-7 border-b bg-yellow-200">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="border-b border-r p-2 text-center font-bold">
            {d}
          </div>
        ))}
      </div>
    </>
  );
};
