import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const AbandonCallReportPage = dynamic(
  () => import('@/components/template/AbandonCallReportPage')
);

const AbandonCallReport = async () => {
  const secretKey: string = await checkValidAuth();

  return (
    <AdminLayout secretKey={secretKey}>
      <AbandonCallReportPage />
    </AdminLayout>
  );
};

export default AbandonCallReport;
