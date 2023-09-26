import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const KycReportPage = dynamic(
  () => import('@/components/template/KycReportPage')
);

const KycReport = () => {
  checkValidAuth();

  return (
    <AdminLayout>
      <KycReportPage />
    </AdminLayout>
  );
};

export default KycReport;
