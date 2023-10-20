import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const AbandonCallReportPage = dynamic(
  () => import('@/components/template/AbandonCallReportPage')
);

const AbandonCallReport = async () => {
  checkValidAuth();

  return (
    <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
      <AbandonCallReportPage />
    </AdminLayout>
  );
};

export default AbandonCallReport;
