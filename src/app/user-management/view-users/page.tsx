import React from 'react';
import AdminLayout from '@/components/template/Layouts/AdminLayout';
import ViewUsersPage from '@/components/template/ViewUsersPage';

const ViewUsers = () => {
  return (
    <AdminLayout>
      <ViewUsersPage />
    </AdminLayout>
  );
};

export default ViewUsers;
