'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';

interface Data {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  userLevel: string;
  status: string;
  picture: string;
}

const rows = [
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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
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

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;

  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: 'rgba(222,222,222, .3)' }}>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'bold' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export const TableComp = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('firstName');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        sx={{
          width: '100%',
          mb: 2,
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map(row => {
                return (
                  <TableRow hover key={row.firstName}>
                    <TableCell align={headCells[0].numeric ? 'right' : 'left'}>
                      {row.firstName}
                    </TableCell>
                    <TableCell align={headCells[1].numeric ? 'right' : 'left'}>
                      {row.middleName}
                    </TableCell>
                    <TableCell align={headCells[2].numeric ? 'right' : 'left'}>
                      {row.lastName}
                    </TableCell>
                    <TableCell align={headCells[3].numeric ? 'right' : 'left'}>
                      {row.email}
                    </TableCell>
                    <TableCell align={headCells[4].numeric ? 'right' : 'left'}>
                      {row.userLevel}
                    </TableCell>
                    <TableCell align={headCells[5].numeric ? 'right' : 'left'}>
                      {row.status}
                    </TableCell>
                    <TableCell align={headCells[6].numeric ? 'right' : 'left'}>
                      {row.picture}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
