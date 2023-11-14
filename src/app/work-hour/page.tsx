'use client';

import dynamic from 'next/dynamic';
const UserAuthentication = dynamic(
  () => import('@/components/template/Layouts/UserAuthentication')
);
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const WorkHourPage = dynamic(
  () => import('@/components/template/WorkHourPage')
);

const WorkHour = () => {
  return (
    <UserAuthentication secretKey={process.env.SECRET_KEY || ''}>
      <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
        <WorkHourPage />
      </AdminLayout>
    </UserAuthentication>
  );
};

export default WorkHour;
