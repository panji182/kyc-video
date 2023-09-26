import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const CampaignPage = dynamic(
  () => import('@/components/template/CampaignPage')
);

const ServerConfiguration = () => {
  checkValidAuth();

  return (
    <AdminLayout>
      <CampaignPage />
    </AdminLayout>
  );
};

export default ServerConfiguration;
