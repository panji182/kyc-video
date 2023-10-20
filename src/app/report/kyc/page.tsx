import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const KycReportPage = dynamic(
  () => import('@/components/template/KycReportPage')
);

const KycReport = async () => {
  checkValidAuth();

  return (
    <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
      <KycReportPage />
    </AdminLayout>
  );
};

export default KycReport;
