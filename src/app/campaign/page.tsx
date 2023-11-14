'use client';

import dynamic from 'next/dynamic';
const UserAuthentication = dynamic(
  () => import('@/components/template/Layouts/UserAuthentication')
);
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const CampaignPage = dynamic(
  () => import('@/components/template/CampaignPage')
);

const ServerConfiguration = () => {
  return (
    <UserAuthentication secretKey={process.env.SECRET_KEY || ''}>
      <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
        <CampaignPage />
      </AdminLayout>
    </UserAuthentication>
  );
};

export default ServerConfiguration;
