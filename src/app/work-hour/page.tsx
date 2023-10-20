import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const WorkHourPage = dynamic(
  () => import('@/components/template/WorkHourPage')
);

const WorkHour = async () => {
  checkValidAuth();

  return (
    <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
      <WorkHourPage />
    </AdminLayout>
  );
};

export default WorkHour;
