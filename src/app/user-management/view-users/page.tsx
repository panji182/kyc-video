import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const ViewUsersPage = dynamic(
  () => import('@/components/template/ViewUsersPage')
);

const ViewUsers = async () => {
  const secretKey: string = await checkValidAuth();

  return (
    <AdminLayout secretKey={secretKey}>
      <ViewUsersPage />
    </AdminLayout>
  );
};

export default ViewUsers;
