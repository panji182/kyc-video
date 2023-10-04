import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const ServerConfigurationPage = dynamic(
  () => import('@/components/template/ServerConfigurationPage')
);

const ServerConfiguration = () => {
  checkValidAuth();

  return (
    <AdminLayout>
      <ServerConfigurationPage />
    </AdminLayout>
  );
};

export default ServerConfiguration;
