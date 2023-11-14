'use client';

import dynamic from 'next/dynamic';
const UserAuthentication = dynamic(
  () => import('@/components/template/Layouts/UserAuthentication')
);
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const HolidayPage = dynamic(() => import('@/components/template/HolidayPage'));

const Holiday = () => {
  return (
    <UserAuthentication secretKey={process.env.SECRET_KEY || ''}>
      <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
        <HolidayPage />
      </AdminLayout>
    </UserAuthentication>
  );
};

export default Holiday;
