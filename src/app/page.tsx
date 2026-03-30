import { format } from 'date-fns';
import { redirect } from 'next/navigation';

export default function Home() {
  const date = new Date();
  const formatedDate = format(date, 'yyyy/MM/dd');
  const redirectPath = `/month/${formatedDate}`;

  redirect(redirectPath);
}
