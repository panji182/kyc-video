import React from 'react';
import AdminLayout from '@/components/template/Layouts/AdminLayout';
import RecordingPage from '@/components/template/RecordingPage';

type Props = {};

const Recording = (props: Props) => {
  return (
    <AdminLayout>
      <RecordingPage />
    </AdminLayout>
  );
};

export default Recording;
