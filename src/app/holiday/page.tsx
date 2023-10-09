import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const HolidayPage = dynamic(() => import('@/components/template/HolidayPage'));

const Holiday = async () => {
  const secretKey: string = await checkValidAuth();

  return (
    <AdminLayout secretKey={secretKey}>
      <HolidayPage />
    </AdminLayout>
  );
};

export default Holiday;
