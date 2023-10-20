import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const VideoJinglePage = dynamic(
  () => import('@/components/template/VideoJinglePage')
);
const VideoJingle = async () => {
  checkValidAuth();

  return (
    <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
      <VideoJinglePage />
    </AdminLayout>
  );
};

export default VideoJingle;
