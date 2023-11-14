'use client';

import dynamic from 'next/dynamic';
const UserAuthentication = dynamic(
  () => import('@/components/template/Layouts/UserAuthentication')
);
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const KycReportPage = dynamic(
  () => import('@/components/template/KycReportPage')
);

const KycReport = () => {
  return (
    <UserAuthentication secretKey={process.env.SECRET_KEY || ''}>
      <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
        <KycReportPage />
      </AdminLayout>
    </UserAuthentication>
  );
};

export default KycReport;
