import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter, usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';

import { paths, userMenuAccess } from '@/consts';
import { UserMenuAccess } from '@/types/const';
import { decrypt } from '@/helpers/globalFunctions';

import { Roles } from '@/consts';

type UserAuthenticationProps = {
  secretKey: string;
  children?: any;
};

const UserAuthentication = ({
  secretKey,
  ...props
}: UserAuthenticationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const pathValues = Object.values(paths);
  const currPath: any = pathValues.find(d => d.href === pathname);
  const currParentMenu: string = currPath ? currPath.parentMenu : '';
  const [verified, setVerified] = useState<boolean>(false);

  const auth: string = getCookie('auth') || '';
  const authCookie = auth !== '' && secretKey ? decrypt(auth, secretKey) : null;

  useEffect(() => {
    if (authCookie) {
      if (authCookie.isVerified !== 'verified') {
        router.push('/login');
      }
      if (pathname === paths.dashboard.href) {
        switch (authCookie.role) {
          case Roles.operator:
            router.push(paths.channel.href);
            break;
          case Roles.reporter:
            router.push(paths.recording.href);
            break;
          default:
            setVerified(true);
        }
      } else if (
        !(
          userMenuAccess[authCookie.role as keyof UserMenuAccess] || []
        ).includes(currParentMenu)
      ) {
        router.push('/404');
      } else {
        setVerified(true);
      }
    } else {
      router.push('/login');
    }
  }, [router, pathname, authCookie]);

  // a loading component that prevents the page from rendering
  return verified ? (
    props.children
  ) : (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme: any) => theme.zIndex.drawer + 1,
        background:
          'linear-gradient(188.34deg, #263544 0%, #405A73 37.81%, #5585B5 71.15%, #79A9D9 100%)',
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default UserAuthentication;
