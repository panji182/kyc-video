import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const DailySummaryPage = dynamic(
  () => import('@/components/template/DailySummaryReportPage')
);

const DailySummaryReport = () => {
  checkValidAuth();

  return (
    <AdminLayout>
      <DailySummaryPage />
    </AdminLayout>
  );
};

export default DailySummaryReport;
