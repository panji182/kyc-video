import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const ViewUsersPage = dynamic(
  () => import('@/components/template/ViewUsersPage')
);

const ViewUsers = () => {
  checkValidAuth();

  return (
    <AdminLayout>
      <ViewUsersPage />
    </AdminLayout>
  );
};

export default ViewUsers;
