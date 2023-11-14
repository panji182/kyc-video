'use client';

import dynamic from 'next/dynamic';
const UserAuthentication = dynamic(
  () => import('@/components/template/Layouts/UserAuthentication')
);
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const VideoJinglePage = dynamic(
  () => import('@/components/template/VideoJinglePage')
);

const VideoJingle = () => {
  return (
    <UserAuthentication secretKey={process.env.SECRET_KEY || ''}>
      <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
        <VideoJinglePage />
      </AdminLayout>
    </UserAuthentication>
  );
};

export default VideoJingle;
