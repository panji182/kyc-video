import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import { paths, userMenuAccess } from '@/consts';
import { UserMenuAccess } from '@/types/const';
import { decrypt } from '@/helpers/globalFunctions';

export const secretKeyPromise = new Promise<string>(myResolve => {
  myResolve('cimb-phincon-09-2023');
});

export const checkValidAuth = async () => {
  const secretKey: string = await secretKeyPromise;
  const headersList = headers();
  const pathname = headersList.get('x-my-pathname') || '';
  const pathValues = Object.values(paths);
  const currPath: any = pathValues.find(d => d.href === pathname);
  const currParentMenu: string = currPath ? currPath.parentMenu : '';

  const cookieStore = cookies();
  const auth = cookieStore.get('auth');

  if (auth) {
    const authValues: any = decrypt(auth.value, secretKey);
    authValues.isVerified !== 'verified' && redirect('/login');
    !(userMenuAccess[authValues.role as keyof UserMenuAccess] || []).includes(
      currParentMenu
    ) && redirect('/404');
  } else {
    redirect('/login');
  }
  return secretKey;
};
