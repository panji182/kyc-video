import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
import { headers } from 'next/headers';

import { paths } from '@/consts';

const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const ChannelPage = dynamic(() => import('@/components/template/ChannelPage'));
const Channel = async () => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  const pathValues = Object.values(paths);
  const currPath: any = pathValues.find(d => d.href === pathname);
  const currParentMenu: string = currPath ? currPath.parentMenu : '';

  console.log(22, pathname);
  const secretKey: string = await checkValidAuth(currParentMenu);

  return (
    <AdminLayout secretKey={secretKey}>
      <ChannelPage />
    </AdminLayout>
  );
};

export default Channel;
