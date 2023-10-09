import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
import { cookies } from 'next/headers';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const RecordingPage = dynamic(
  () => import('@/components/template/RecordingPage')
);

const Recording = async () => {
  const cookieStore = cookies();
  const auth = cookieStore.get('auth');
  console.log(9, auth);
  const secretKey: string = await checkValidAuth();

  return (
    <AdminLayout secretKey={secretKey}>
      <RecordingPage />
    </AdminLayout>
  );
};

export default Recording;
