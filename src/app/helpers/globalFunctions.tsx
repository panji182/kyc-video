import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import { paths, userMenuAccess } from '@/consts';
import { UserMenuAccess } from '@/types/const';
import { decrypt } from '@/helpers/globalFunctions';

import { Roles } from '@/consts';

export const checkValidAuth = () => {
  const headersList = headers();
  const pathname = headersList.get('x-my-pathname') || '';
  const pathValues = Object.values(paths);
  const currPath: any = pathValues.find(d => d.href === pathname);
  const currParentMenu: string = currPath ? currPath.parentMenu : '';

  const cookieStore = cookies();
  const auth = cookieStore.get('auth');

  if (auth) {
    const authValues: any = decrypt(auth.value, process.env.SECRET_KEY || '');
    authValues.isVerified !== 'verified' && redirect('/login');
    if (pathname === paths.dashboard.href) {
      switch (authValues.role) {
        case Roles.operator:
          redirect(paths.channel.href);
        case Roles.reporter:
          redirect(paths.recording.href);
      }
    } else {
      !(userMenuAccess[authValues.role as keyof UserMenuAccess] || []).includes(
        currParentMenu
      ) && redirect('/404');
    }
  } else {
    redirect('/login');
  }
};
