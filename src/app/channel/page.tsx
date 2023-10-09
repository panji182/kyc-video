import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
import { cookies } from 'next/headers';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const ChannelPage = dynamic(() => import('@/components/template/ChannelPage'));

const Channel = async () => {
  const cookieStore = cookies();
  const auth = cookieStore.get('auth');
  console.log(9, auth);
  const secretKey: string = await checkValidAuth();

  return (
    <AdminLayout secretKey={secretKey}>
      <ChannelPage />
    </AdminLayout>
  );
};

export default Channel;
