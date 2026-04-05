// DBとは繋がないためメモリ上でデータを格納する。
// サーバーが起動してる間だけデータが保持される

export type Schedule = {
  id: string;
  title: string;
  date: string;
};

// サーバー側のメモリ上に配列を用意
export const schedules: Schedule[] = [];
