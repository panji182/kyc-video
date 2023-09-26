'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const PopupFormAddUser = dynamic(
  () => import('@/components/molecules/PopupFormAddUser')
);

import { toRem } from '@/helpers/globalFunctions';
import { UserInput } from '@/types/template/UserManagement';

import AddIcon from '@mui/icons-material/Add';

const dataRows = [
  {
    firstName: 'Panji1',
    middleName: 'test1',
    lastName: 'Mantra1',
    email: 'panji@yahoo.com1',
    userLevel: 'Admin1',
    status: 'Active1',
    picture: 'http://image/to/path/panji.jpg1',
  },
  {
    firstName: 'mantra2',
    middleName: 'test2',
    lastName: 'panji2',
    email: 'panji@yahoo.com2',
    userLevel: 'Admin2',
    status: 'Not Active2',
    picture: 'http://image/to/path/mantra.jpg2',
  },
  {
    firstName: 'Panji3',
    middleName: 'test3',
    lastName: 'Mantra3',
    email: 'panji@yahoo.com3',
    userLevel: 'Admin3',
    status: 'Active3',
    picture: 'http://image/to/path/panji.jpg3',
  },
  {
    firstName: 'mantra4',
    middleName: 'test4',
    lastName: 'panji4',
    email: 'panji@yahoo.com4',
    userLevel: 'Admin4',
    status: 'Not Active4',
    picture: 'http://image/to/path/mantra.jpg4',
  },
  {
    firstName: 'Panji5',
    middleName: 'test5',
    lastName: 'Mantra5',
    email: 'panji@yahoo.com5',
    userLevel: 'Admin5',
    status: 'Active5',
    picture: 'http://image/to/path/panji.jpg5',
  },
  {
    firstName: 'mantra6',
    middleName: 'test6',
    lastName: 'panji6',
    email: 'panji@yahoo.com6',
    userLevel: 'Admin6',
    status: 'Not Active6',
    picture: 'http://image/to/path/mantra.jpg6',
  },
  {
    firstName: 'Panji7',
    middleName: 'test7',
    lastName: 'Mantra7',
    email: 'panji@yahoo.com7',
    userLevel: 'Admin7',
    status: 'Active7',
    picture: 'http://image/to/path/panji.jpg7',
  },
  {
    firstName: 'mantr8a',
    middleName: 'te8st',
    lastName: 'panji8',
    email: 'panji@yah8oo.com',
    userLevel: 'Admi8n',
    status: 'Not Act8ive',
    picture: 'http://image/to/path/man8tra.jpg',
  },
  {
    firstName: 'Panj9i',
    middleName: 'tes9t',
    lastName: 'Mant9ra',
    email: 'panji@ya9hoo.com',
    userLevel: 'Adm9in',
    status: 'Act9ive',
    picture: 'http://image/to/9path/panji.jpg',
  },
  {
    firstName: 'mantr10a',
    middleName: 'test10',
    lastName: 'panji10',
    email: 'panji@yahoo.com10',
    userLevel: 'Admin10',
    status: 'Not Active10',
    picture: 'http://image/to/path/mantra.jpg10',
  },
  {
    firstName: 'Panji11',
    middleName: 'test11',
    lastName: 'Mantra11',
    email: 'panji@yahoo.com11',
    userLevel: 'Admin11',
    status: 'Active11',
    picture: 'http://image/to/path/panji.jpg11',
  },
  {
    firstName: 'mantra12',
    middleName: 'test12',
    lastName: 'panji12',
    email: 'panji@yahoo12.com',
    userLevel: 'Admin12',
    status: 'Not Active12',
    picture: 'http://image/to/path/mantra.jpg12',
  },
  {
    firstName: 'Panji13',
    middleName: 'test13',
    lastName: 'Mantra13',
    email: 'panji@yahoo.com13',
    userLevel: 'Admin13',
    status: 'Active13',
    picture: 'http://image/to/path/panji.jpg13',
  },
];

const headCells: HeadCell[] = [
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
  },
  {
    id: 'middleName',
    numeric: false,
    disablePadding: false,
    label: 'Middle Name',
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Last Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'userLevel',
    numeric: false,
    disablePadding: false,
    label: 'User Level',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'picture',
    numeric: false,
    disablePadding: false,
    label: 'Picture',
  },
];

const ViewUsersPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOnClick = () => {
    setOpen(true);
  };

  const handleSubmit = (paramResult: UserInput) => {
    console.log(21, paramResult);
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
        User Lists
      </Typography>
      <Stack direction="row" mb={toRem(24)} justifyContent="flex-end">
        <Button
          label="Create User"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOnClick}
        />
      </Stack>
      <Table data={dataRows} fieldOrderBy={'firstName'} headCells={headCells} />

      <PopupFormAddUser
        open={open}
        onSubmited={handleSubmit}
        onClosePopup={() => setOpen(false)}
      />
    </>
  );
};

export default ViewUsersPage;
