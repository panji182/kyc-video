import { checkValidAuth } from '@/app/helpers/globalFunctions';
import AdminLayout from '@/components/template/Layouts/AdminLayout';
import Typography from '@mui/material/Typography';
import { cookies } from 'next/headers';

const Home = async () => {
  const cookieStore = cookies();
  const auth = cookieStore.get('auth');
  console.log(9, auth);
  const secretKey: string = await checkValidAuth();

  return (
    <AdminLayout secretKey={secretKey}>
      <>
        <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
          This is Dahsboard Page
        </Typography>
      </>
    </AdminLayout>
  );
};

export default Home;
