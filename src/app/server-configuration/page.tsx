'use client';

import dynamic from 'next/dynamic';
const UserAuthentication = dynamic(
  () => import('@/components/template/Layouts/UserAuthentication')
);
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const ServerConfigurationPage = dynamic(
  () => import('@/components/template/ServerConfigurationPage')
);

const ServerConfiguration = () => {
  return (
    <UserAuthentication secretKey={process.env.SECRET_KEY || ''}>
      <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
        <ServerConfigurationPage />
      </AdminLayout>
    </UserAuthentication>
  );
};

export default ServerConfiguration;
