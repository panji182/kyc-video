import { checkValidAuth } from '@/app/helpers/globalFunctions';
import AdminLayout from '@/components/template/Layouts/AdminLayout';
import Typography from '@mui/material/Typography';
import { headers } from 'next/headers';

import { paths } from '@/consts';

const Home = async () => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  const pathValues = Object.values(paths);
  const currPath: any = pathValues.find(d => d.href === pathname);
  const currParentMenu: string = currPath ? currPath.parentMenu : '';

  console.log(22, pathname);
  const secretKey: string = await checkValidAuth(currParentMenu);

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
