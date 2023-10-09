import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const KycReportPage = dynamic(
  () => import('@/components/template/KycReportPage')
);

const KycReport = async () => {
  const secretKey: string = await checkValidAuth();

  return (
    <AdminLayout secretKey={secretKey}>
      <KycReportPage />
    </AdminLayout>
  );
};

export default KycReport;
