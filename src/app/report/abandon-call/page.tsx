import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
import { headers } from 'next/headers';

import { paths } from '@/consts';

const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const AbandonCallReportPage = dynamic(
  () => import('@/components/template/AbandonCallReportPage')
);

const AbandonCallReport = async () => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  const pathValues = Object.values(paths);
  const currPath: any = pathValues.find(d => d.href === pathname);
  const currParentMenu: string = currPath ? currPath.parentMenu : '';

  const secretKey: string = await checkValidAuth(currParentMenu);

  return (
    <AdminLayout secretKey={secretKey}>
      <AbandonCallReportPage />
    </AdminLayout>
  );
};

export default AbandonCallReport;
