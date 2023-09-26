import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const SetRoleAndPermissions = dynamic(
  () => import('@/components/template/SetRoleAndPermissionsPage')
);

const RoleAndPermissions = () => {
  checkValidAuth();

  return (
    <AdminLayout>
      <SetRoleAndPermissions />
    </AdminLayout>
  );
};

export default RoleAndPermissions;
