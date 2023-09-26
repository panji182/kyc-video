import React from 'react';
import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
import Typography from '@mui/material/Typography';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);

const ServerConfiguration = () => {
  checkValidAuth();

  return (
    <AdminLayout>
      <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
        This is Server Configuration Page
      </Typography>
    </AdminLayout>
  );
};

export default ServerConfiguration;
