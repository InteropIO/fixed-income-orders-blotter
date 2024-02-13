import * as React from 'react';
import { useMemo } from 'react';
import { Root } from 'react-dom/client';
import { GridOptions, IRowNode } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import AdaptableReact, {
  AdaptableApi,
  AdaptableOptions,
  RowHighlightInfo,
} from '@adaptabletools/adaptable-react-aggrid';
import { columnDefs, defaultColDef } from './columnDefs';
import { AdaptableOrderColumns, NewOrder, rowData } from './rowData';
import { renderReactRoot } from '../react-18-utils';
import { agGridModules } from './agGridModules';
import { setupFDC3Events } from './setupFDC3Events';
// import IODesktop, { IOConnectDesktop } from '@interopio/desktop';

import type { Order } from '@finos/fdc3';
import '@interopio/theme-demo-apps/dist/io.applications.css';
import { IO_Order, createNotification } from './createNotification';
const renderWeakMap: WeakMap<HTMLElement, Root> = new WeakMap();

const Revision = 4;

export const OrdersBlotter = () => {
  // const ioD = IODesktop({
  //   appManager: 'full',
  // });

  const ioD = (window as any).io;

  const gridOptions = useMemo<GridOptions<AdaptableOrderColumns>>(
    () => ({
      defaultColDef,
      columnDefs,
      rowData,
      sideBar: true,
      suppressMenuHide: true,
      enableRangeSelection: true,
      rowSelection: 'single',
      enableCharts: true,
    }),
    [],
  );
  const adaptableOptions = useMemo<AdaptableOptions<AdaptableOrderColumns>>(
    () => ({
      // licenseKey: import.meta.env.VITE_ADAPTABLE_LICENSE_KEY,
      licenseKey:
        'AppName=interop-Trial|Owner=interop|StartDate=2023-11-23|EndDate=2024-01-23|Ref=AdaptableLicense|Trial=true|TS=1700741032831|C=2692006938,2271485454,4261170317,1260976079,180944542,4061129120,1409499958,3452034758',
      primaryKey: 'OrderID',
      userName: 'Test User',
      adaptableId: 'AdaptableFinsembleOrders',
      fdc3Options: {
        enableLogging: true,
        gridDataContextMapping: {
          'fdc3.instrument': {
            name: '_field.ISIN',
            id: {
              ISIN: '_field.ISIN',
            },
          },
          'fdc3.contact': {
            name: '_field.ExecutedBroker',
            id: {},
          },
        },
        intents: {
          raises: {
            ViewChart: [
              {
                contextType: 'fdc3.instrument',
                actionButton: {
                  id: 'viewChartBtn',
                  tooltip: 'View Chart',
                  icon: '_defaultFdc3',
                  buttonStyle: {
                    tone: 'warning',
                    variant: 'outlined',
                  },
                },
              },
            ],
            ViewNews: [
              {
                contextType: 'fdc3.instrument',
                actionButton: {
                  id: 'viewNewsBtn',
                  tooltip: 'View News',
                  icon: {
                    name: 'clipboard',
                  },
                  buttonStyle: {
                    tone: 'info',
                    variant: 'outlined',
                  },
                },
              },
            ],
            ViewInstrument: [
              {
                contextType: 'fdc3.instrument',
                actionButton: {
                  id: 'viewInstrumentBtn',
                  tooltip: 'View Instrument',
                  icon: {
                    name: 'visibility-on',
                  },
                  buttonStyle: {
                    tone: 'success',
                    variant: 'outlined',
                  },
                },
              },
            ],
            StartChat: [
              {
                contextType: 'fdc3.contact',
                contextMenu: {
                  columnIds: ['ExecutedBroker'],
                  icon: '_defaultFdc3',
                },
              },
            ],
            // TODO: Overbond is supposed to support this but doesn't
            // ViewQuote: [
            //   {
            //     contextType: 'fdc3.instrument',
            //     actionButton: {
            //       id: 'ViewQuoteButton',
            //       label: 'View Quote',
            //       icon: '_defaultFdc3',
            //       tooltip: '_defaultFdc3',
            //     },
            //   },
            // ],
          },
          listensFor: ['CreateOrder', 'ViewOrder', 'UpdateOrder'],
          handleIntent: async (fdc3IntentContext) => {
            // handleIntent: (fdc3IntentContext: HandleFdc3IntentContext) => {
            console.log(`Received context: `, fdc3IntentContext);
            const { adaptableApi, context, intent } = fdc3IntentContext;
            const order = context as Order & IO_Order;
            // as unknown as FDC3_Order;
            const { details, id, name, type } = order;

            // this is bespoke to our demo and will need to be adapted for other OMS platforms
            const { ioOrderId } = id;

            if (intent === 'ViewOrder') {
              if (ioOrderId) {
                const rowHighlightInfo: RowHighlightInfo = {
                  primaryKeyValue: Number(ioOrderId),
                  timeout: 5000,
                  highlightStyle: { BackColor: 'Yellow', ForeColor: 'Black' },
                };
                adaptableApi.gridApi.jumpToRow(Number(ioOrderId));
                adaptableApi.gridApi.highlightRow(rowHighlightInfo);
              }
            }

            if (intent === 'CreateOrder') {
              if (order) {
                const { details } = order as unknown as NewOrder;
                const { product } = details;

                const newRowData: AdaptableOrderColumns = {
                  OrderID: Number(id.ioOrderId), // should auto id if it doesn't exist
                  Status: details.status || 'New',
                  TransactionType: details.transactionType,
                  Description: details.description,
                  ISIN: product?.instrument?.id?.ISIN as any,
                  Issuer: details.issuer,
                  IssuerLEI: details.issuerLEI,
                  Yield: details.yield,
                  Maturity: details.maturity,
                  TargetPrice: details.targetPrice,
                  OrderSize: details.orderSize,
                  CreationDateTime: '',
                };

                // Use Adaptable API to add the new row
                adaptableApi.gridApi
                  .addGridData([newRowData])
                  .then(() => {
                    // create a notification when a row is successfully added
                    // ioD.then((io) => {
                    createNotification(ioD, order);
                    // });
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            }

            if (intent === 'UpdateOrder') {
              // primaryKey is OrderId Column
              const node: IRowNode =
                adaptableApi.gridApi.getRowNodeForPrimaryKey(ioOrderId);
              const orderRow = node.data as AdaptableOrderColumns;
              // TODO: update the correct fields
              orderRow.Status = 'filled';
              adaptableApi.gridApi.updateGridData([orderRow]);
            }
          },
        },
        actionColumnDefaultConfiguration: {
          width: 150,
        },
      },
      predefinedConfig: {
        Dashboard: {
          DashboardTitle: 'Orders',
          showQuickSearchInHeader: false,
          // IsHidden: true,
        },
        Theme: {
          CurrentTheme: 'dark',
        },
        FormatColumn: {
          Revision,
          FormatColumns: [
            {
              Scope: {
                ColumnIds: ['TradeDate', 'SettlementDate'],
              },
              DisplayFormat: {
                Formatter: 'DateFormatter',
                Options: {
                  Pattern: 'MMM do yyyy',
                },
              },
            },
          ],
        },
        Layout: {
          Revision,
          CurrentLayout: 'Default Layout',
          Layouts: [
            {
              Name: 'Default Layout',
              Columns: [
                'OrderID',
                'Status',
                'TransactionType',
                'Description',
                'ISIN',
                'Issuer',
                'fdc3ActionColumn',
                'IssuerLEI',
                'Yield',
                'Maturity',
                'TargetPrice',
                'OrderSize',
                'CreationDateTime',
              ],
            },
          ],
        },
      },
    }),
    [],
  );

  const adaptableApiRef = React.useRef<AdaptableApi>();

  return (
    <div className={'flex h-screen flex-col'}>
      <AdaptableReact
        className={'flex-none'}
        gridOptions={gridOptions}
        adaptableOptions={adaptableOptions}
        renderReactRoot={(node, container) =>
          renderReactRoot(node, container, renderWeakMap)
        }
        onAdaptableReady={({ adaptableApi }) => {
          adaptableApiRef.current = adaptableApi;

          setupFDC3Events(adaptableApi);
        }}
      />
      <div className="ag-tick42 flex-1 ">
        <AgGridReact gridOptions={gridOptions} modules={agGridModules} />
      </div>
    </div>
  );
};