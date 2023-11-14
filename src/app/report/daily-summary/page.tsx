'use client';

import dynamic from 'next/dynamic';
const UserAuthentication = dynamic(
  () => import('@/components/template/Layouts/UserAuthentication')
);
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const DailySummaryPage = dynamic(
  () => import('@/components/template/DailySummaryReportPage')
);

const DailySummaryReport = () => {
  return (
    <UserAuthentication secretKey={process.env.SECRET_KEY || ''}>
      <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
        <DailySummaryPage />
      </AdminLayout>
    </UserAuthentication>
  );
};

export default DailySummaryReport;
