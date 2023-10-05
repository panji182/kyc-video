'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { toRem } from '@/helpers/globalFunctions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import {
  HeadCell,
  Order,
  EnhancedTableToolbarProps,
  EnhancedTableProps,
} from '@/types/atoms/table';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends string | number | symbol>(
  order: Order,
  orderBy: Key
): (
  // eslint-disable-next-line no-unused-vars
  a: { [key in Key]: number | string },
  // eslint-disable-next-line no-unused-vars
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
  // eslint-disable-next-line no-unused-vars
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

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { setSearch } = props;

  return (
    <Toolbar
      sx={{
        p: toRem(8),
        bgcolor: theme =>
          alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
      }}
    >
      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Search"
        sx={{
          width: '150px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          '& input': {
            padding: toRem(8),
          },
          '& fieldset': {
            border: 0,
          },
        }}
        onChange={e => setSearch(e.target.value)}
      />
    </Toolbar>
  );
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    headCells,
    order,
    orderBy,
    onRequestSort,
    showEditor,
    customActionButton,
  } = props;
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
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
        {(showEditor || customActionButton) && <TableCell>&nbsp;</TableCell>}
      </TableRow>
    </TableHead>
  );
}

type Props = {
  data: any[];
  fieldOrderBy: string;
  headCells: HeadCell[];
  showEditor?: boolean;
  idFieldName?: string;
  // eslint-disable-next-line no-unused-vars
  customActionButton?: (id: any) => React.ReactNode;
  sx?: any;
};

const TableComp = ({
  data,
  fieldOrderBy,
  headCells,
  showEditor = true,
  idFieldName,
  customActionButton,
}: Props) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>(fieldOrderBy);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState<string>('');
  console.log(188, search);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
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
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const handleEdit = (id: number) => {
    alert(`${id} Edited !`);
  };

  const handleDelete = (id: number) => {
    alert(`${id} Deleted !`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        sx={{
          width: '100%',
          mb: 2,
        }}
      >
        <EnhancedTableToolbar setSearch={setSearch} />
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
          }}
        >
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              showEditor={showEditor}
              customActionButton={customActionButton}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow hover key={index}>
                  {headCells.map(cell => {
                    const cellValue = cell.id ? row[cell.id.toString()] : null;
                    return (
                      <TableCell
                        key={cell.id}
                        align={cell.numeric ? 'right' : 'left'}
                      >
                        {cellValue ?? '-'}
                      </TableCell>
                    );
                  })}
                  {showEditor && (
                    <TableCell key={`editor${index}`} align={'center'}>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => handleEdit(0)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClick={() => handleDelete(0)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  )}
                  {idFieldName && customActionButton && (
                    <TableCell key={`action${index}`} align={'center'}>
                      <Stack direction="row" spacing={1}>
                        {customActionButton(row[idFieldName])}
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={(data || []).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TableComp;
