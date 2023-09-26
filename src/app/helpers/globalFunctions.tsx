import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const checkValidAuth = () => {
  const cookieStore = cookies();
  const auth = cookieStore.get('auth');
  if (auth) {
    auth.value !== 'verified' && redirect('/login');
  } else {
    redirect('/login');
  }
};
