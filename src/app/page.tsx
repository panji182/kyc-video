import { checkValidAuth } from '@/app/helpers/globalFunctions';
import AdminLayout from '@/components/template/Layouts/AdminLayout';
import Typography from '@mui/material/Typography';

const Home = () => {
  checkValidAuth();

  return (
    <AdminLayout>
      <>
        <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
          This is Dahsboard Page
        </Typography>
      </>
    </AdminLayout>
  );
};

export default Home;
