'use client';

import dynamic from 'next/dynamic';
const UserAuthentication = dynamic(
  () => import('@/components/template/Layouts/UserAuthentication')
);
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const SetRoleAndPermissions = dynamic(
  () => import('@/components/template/SetRoleAndPermissionsPage')
);

const RoleAndPermissions = () => {
  return (
    <UserAuthentication secretKey={process.env.SECRET_KEY || ''}>
      <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
        <SetRoleAndPermissions />
      </AdminLayout>
    </UserAuthentication>
  );
};

export default RoleAndPermissions;
