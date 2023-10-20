import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const CampaignPage = dynamic(
  () => import('@/components/template/CampaignPage')
);

const ServerConfiguration = async () => {
  checkValidAuth();

  return (
    <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
      <CampaignPage />
    </AdminLayout>
  );
};

export default ServerConfiguration;
