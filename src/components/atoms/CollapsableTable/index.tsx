import * as React from 'react';
import { updatedDataContext } from '@/components/template/ServerConfigurationPage';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { visuallyHidden } from '@mui/utils';

import styles from './index.styles';

import {
  HeadCell,
  Order,
  EnhancedTableToolbarProps,
  EnhancedTableProps,
} from '@/types/atoms/selectableTable';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof string | number | symbol>(
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

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    headCells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: 'rgba(222,222,222, .3)' }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
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

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : null}
    </Toolbar>
  );
}

type Props = {
  data: any[];
  fieldOrderBy: string;
  headCells: HeadCell[];
  // eslint-disable-next-line no-unused-vars
  onGetSelectedData: (selData: any[]) => void;
};

const CollapsableTable = ({
  data,
  fieldOrderBy,
  headCells,
  onGetSelectedData,
}: Props) => {
  const [groupedData, setGroupedData] = React.useState<any[]>([]);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>(fieldOrderBy);
  const [selected, setSelected] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [collapsedRow, setCollapsedRow] = React.useState<any>({});
  const countedSelectedData = React.useMemo(
    () => selected.filter(d => !!d.section),
    [selected]
  );
  const { setEditedData, setOpenEditor, usedMode } =
    React.useContext(updatedDataContext);

  const rowGrouping = (p_data: any[]) => {
    const groupObject = p_data.reduce((result: any, d) => {
      if (!result[d.section]) result[d.section] = [];
      result[d.section].push(d);
      return result;
    }, {});
    let finalResult: any[] = [];
    Object.keys(groupObject).forEach(d => {
      finalResult.push({
        name: d,
        section: null,
        key: null,
        value: null,
      });
      finalResult = finalResult.concat(groupObject[d]);
    });
    return finalResult;
  };

  React.useEffect(() => {
    setGroupedData(rowGrouping(data));
  }, [data]);

  React.useEffect(() => {
    onGetSelectedData(countedSelectedData);
  }, [countedSelectedData]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = groupedData.map(n => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameValue: string,
    sectionValue: string
  ) => {
    setSelected((prevState: any[]) => {
      let isParentRow = false,
        prev = [...prevState];
      const selectedIndex = prev.findIndex(d => d.name === nameValue);
      if (sectionValue === '') isParentRow = true;
      if (selectedIndex > -1) {
        if (!event.target.checked) {
          if (isParentRow) {
            prev = prev.filter(d => d.name.indexOf(nameValue) < 0);
          } else {
            prev.splice(selectedIndex, 1);
          }
        }
      } else {
        let dt = [];
        if (isParentRow) {
          dt = groupedData.filter(d => d.name.indexOf(nameValue) > -1);
        } else {
          dt.push(groupedData.find(d => d.name === nameValue));
        }
        prev = prev.concat(dt);
      }

      return prev;
    });
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

  const isSelected = (name: string | number) => {
    const nm = name.toString();
    return !!selected.find(d => d.name === nm);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - groupedData.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(groupedData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [groupedData, order, orderBy, page, rowsPerPage]
  );

  React.useEffect(() => {
    setCollapsedRow(() =>
      data.reduce((result, d) => {
        if (!result[d.section]) result[d.section] = false;
        return result;
      }, {})
    );
  }, [data]);

  const handleRowCollapse = (sectionName: string) => {
    setCollapsedRow((prevState: any) => {
      let objRow = { ...prevState };
      objRow = {
        ...objRow,
        [sectionName]: !objRow[sectionName],
      };
      return objRow;
    });
  };

  const handleGetData = (data: any) => {
    setEditedData(data);
    if (data.section) {
      usedMode('Edit');
      setOpenEditor(true);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {countedSelectedData.length > 0 && (
          <EnhancedTableToolbar numSelected={countedSelectedData.length} />
        )}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={groupedData.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                const sectionValue = (row['section'] || '').toString();
                const nameValue = row['name'].toString();
                const showRow = collapsedRow[sectionValue] ?? true;

                return sectionValue === '' || showRow ? (
                  <TableRow
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={event =>
                          handleClick(event, nameValue, sectionValue)
                        }
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {headCells.map(cell => {
                      const cellValue = cell.id
                        ? row[cell.id.toString()]
                        : null;
                      return (
                        <TableCell
                          key={`${cell.id}${index}`}
                          align={cell.numeric ? 'right' : 'left'}
                          sx={cell.id === 'name' ? styles.tableCell : {}}
                        >
                          {cell.id === 'name' && sectionValue === '' && (
                            <>
                              {collapsedRow[nameValue] ? (
                                <ArrowDropDownIcon
                                  onClick={() => handleRowCollapse(nameValue)}
                                  sx={styles.collapsedButton}
                                />
                              ) : (
                                <ArrowRightIcon
                                  onClick={() => handleRowCollapse(nameValue)}
                                  sx={styles.collapsedButton}
                                />
                              )}
                            </>
                          )}
                          <Typography onClick={() => handleGetData(row)}>
                            {cellValue ?? '-'}
                          </Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ) : null;
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={(groupedData || []).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CollapsableTable;
