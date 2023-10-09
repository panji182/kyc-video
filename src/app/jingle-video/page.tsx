import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const JingleVideoPage = dynamic(
  () => import('@/components/template/JingleVideoPage')
);
const JingleVideo = async () => {
  const secretKey: string = await checkValidAuth();

  return (
    <AdminLayout secretKey={secretKey}>
      <JingleVideoPage />
    </AdminLayout>
  );
};

export default JingleVideo;
