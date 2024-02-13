import { ColDef } from '@ag-grid-community/core';
import { AdaptableOrderColumns } from './rowData';

export const defaultColDef: ColDef = {
  filter: true,
  floatingFilter: true,
  sortable: true,
  resizable: true,
  editable: true,
  enableRowGroup: true,
};

export const columnDefs: ColDef<AdaptableOrderColumns>[] = [
  {
    field: 'OrderID',
    headerName: 'Order ID',
    type: 'abColDefNumber',
  },
  {
    field: 'Status',
    headerName: 'Status',
    type: 'abColDefString',
  },
  {
    field: 'TransactionType',
    headerName: 'Transaction Type',
    type: 'abColDefString',
  },
  {
    field: 'Description',
    headerName: 'Description',
    type: 'abColDefString',
  },
  {
    field: 'ISIN',
    headerName: 'Isin',
    type: 'abColDefString',
  },
  {
    field: 'Issuer',
    headerName: 'Issuer',
    type: 'abColDefString',
  },
  {
    field: 'IssuerLEI',
    headerName: 'Issuer LEI',
    type: 'abColDefString',
  },
  {
    field: 'Yield',
    headerName: 'Yield',
    type: 'abColDefNumber',
  },
  {
    field: 'Maturity',
    headerName: 'Maturity',
    type: 'abColDefDate',
  },
  {
    field: 'TargetPrice',
    headerName: 'Target Price',
    type: 'abColDefNumber',
  },
  {
    field: 'OrderSize',
    headerName: 'Order Size',
    type: 'abColDefNumber',
  },
  {
    field: 'CreationDateTime',
    headerName: 'Creation DateTime',
    type: 'abColDefNumber',
  },
];
