import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const ServerConfigurationPage = dynamic(
  () => import('@/components/template/ServerConfigurationPage')
);

const ServerConfiguration = async () => {
  checkValidAuth();

  return (
    <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
      <ServerConfigurationPage />
    </AdminLayout>
  );
};

export default ServerConfiguration;
