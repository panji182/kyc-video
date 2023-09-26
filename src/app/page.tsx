import AdminLayout from '@/components/template/Layouts/AdminLayout';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <AdminLayout>
      <>
        <Typography variant="h4" gutterBottom>
          This is Home Page
        </Typography>
      </>
    </AdminLayout>
  );
}
