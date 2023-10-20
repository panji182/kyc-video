import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const RecordingPage = dynamic(
  () => import('@/components/template/RecordingPage')
);

const Recording = async () => {
  checkValidAuth();

  return (
    <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
      <RecordingPage />
    </AdminLayout>
  );
};

export default Recording;
