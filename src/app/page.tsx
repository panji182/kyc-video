'use client';

import dynamic from 'next/dynamic';
const UserAuthentication = dynamic(
  () => import('@/components/template/Layouts/UserAuthentication')
);
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const DashboardPage = dynamic(
  () => import('@/components/template/DashboardPage')
);

const Home = () => {
  return (
    <UserAuthentication secretKey={process.env.SECRET_KEY || ''}>
      <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
        <DashboardPage />
      </AdminLayout>
    </UserAuthentication>
  );
};

export default Home;
