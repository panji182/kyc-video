import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const ViewUsersPage = dynamic(
  () => import('@/components/template/ViewUsersPage')
);

const ViewUsers = async () => {
  checkValidAuth();

  return (
    <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
      <ViewUsersPage />
    </AdminLayout>
  );
};

export default ViewUsers;
