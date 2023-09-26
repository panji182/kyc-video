import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const ChannelPage = dynamic(() => import('@/components/template/ChannelPage'));
const Channel = () => {
  checkValidAuth();

  return (
    <AdminLayout>
      <ChannelPage />
    </AdminLayout>
  );
};

export default Channel;
