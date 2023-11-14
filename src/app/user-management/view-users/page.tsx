'use client';

import dynamic from 'next/dynamic';
const UserAuthentication = dynamic(
  () => import('@/components/template/Layouts/UserAuthentication')
);
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const ViewUsersPage = dynamic(
  () => import('@/components/template/ViewUsersPage')
);

const ViewUsers = () => {
  return (
    <UserAuthentication secretKey={process.env.SECRET_KEY || ''}>
      <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
        <ViewUsersPage />
      </AdminLayout>
    </UserAuthentication>
  );
};

export default ViewUsers;
