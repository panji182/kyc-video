export interface HeadCell {
  disablePadding: boolean;
  id: string | number;
  label: string;
  numeric: boolean;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
  headCells: HeadCell[];
  onRequestSort: (
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<unknown>,
    // eslint-disable-next-line no-unused-vars
    property: any
  ) => void;

  order: Order;
  orderBy: string;
  showEditor: boolean;
}
