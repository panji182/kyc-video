import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const SetRoleAndPermissions = dynamic(
  () => import('@/components/template/SetRoleAndPermissionsPage')
);

const RoleAndPermissions = async () => {
  checkValidAuth();

  return (
    <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
      <SetRoleAndPermissions />
    </AdminLayout>
  );
};

export default RoleAndPermissions;
