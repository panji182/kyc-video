import dynamic from 'next/dynamic';
import { checkValidAuth } from '@/app/helpers/globalFunctions';
const AdminLayout = dynamic(
  () => import('@/components/template/Layouts/AdminLayout')
);
const DashboardPage = dynamic(
  () => import('@/components/template/DashboardPage')
);

const Home = async () => {
  checkValidAuth();

  return (
    <AdminLayout secretKey={process.env.SECRET_KEY || ''}>
      <DashboardPage />
    </AdminLayout>
  );
};

export default Home;
