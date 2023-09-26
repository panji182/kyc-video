'use client';

import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { toRem } from '@/helpers/globalFunctions';
import { HeadCell } from '@/types/atoms/table';

interface EnhancedTableProps {
  headCells: HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { headCells } = props;

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: 'rgba(222,222,222, .3)' }}>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{ fontWeight: 'bold' }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const dataRows = [
  {
    userLevel: 'admin',
    read: '',
    update: '',
    delete: '',
  },
  {
    userLevel: 'agent',
    read: '',
    update: '',
    delete: '',
  },
];

const headCells: HeadCell[] = [
  {
    id: 'userLevel',
    numeric: false,
    disablePadding: false,
    label: 'User Level',
  },
  {
    id: 'read',
    numeric: false,
    disablePadding: false,
    label: 'Read',
  },
  {
    id: 'update',
    numeric: false,
    disablePadding: false,
    label: 'Update',
  },
  {
    id: 'delete',
    numeric: false,
    disablePadding: false,
    label: 'Delete',
  },
];

const SetRoleAndPermissions = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () => dataRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage]
  );

  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: '600', mb: toRem(16) }}
        gutterBottom
      >
        Role and Permissions
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Paper
          sx={{
            width: '100%',
            mb: 2,
          }}
        >
          <TableContainer
            sx={{
              width: '100%',
              overflowX: 'auto',
            }}
          >
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead headCells={headCells} />
              <TableBody>
                {visibleRows.map((row: any) => (
                  <TableRow hover key={row.userLevel}>
                    {headCells.map(cell => {
                      const cellValue = cell.id
                        ? row[cell.id.toString()]
                        : null;
                      return (
                        <TableCell
                          key={cell.id}
                          align={cell.numeric ? 'right' : 'left'}
                        >
                          {cellValue ?? '-'}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={(dataRows || []).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default SetRoleAndPermissions;
