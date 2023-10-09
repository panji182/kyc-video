import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { userMenuAccess } from '@/consts';
import { UserMenuAccess } from '@/types/const';
import { decrypt } from '@/helpers/globalFunctions';

export const secretKeyPromise = new Promise<string>(myResolve => {
  myResolve('cimb-phincon-09-2023');
});

export const checkValidAuth = async (currParentMenu: string) => {
  const secretKey: string = await secretKeyPromise;
  const cookieStore = cookies();
  const auth = cookieStore.get('auth');

  console.log(17, currParentMenu);
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
