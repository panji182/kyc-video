import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
import { headers } from 'next/headers';

import { paths } from '@/consts';

const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const WorkHourPage = dynamic(
  () => import('@/components/template/WorkHourPage')
);

const WorkHour = async () => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  const pathValues = Object.values(paths);
  const currPath: any = pathValues.find(d => d.href === pathname);
  const currParentMenu: string = currPath ? currPath.parentMenu : '';

  const secretKey: string = await checkValidAuth(currParentMenu);

  return (
    <AdminLayout secretKey={secretKey}>
      <WorkHourPage />
    </AdminLayout>
  );
};

export default WorkHour;
