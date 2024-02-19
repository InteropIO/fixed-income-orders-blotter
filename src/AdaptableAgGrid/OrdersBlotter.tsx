import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Root } from 'react-dom/client';
import { GridOptions, RowClickedEvent } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import AdaptableReact, {
  AdaptableApi,
  AdaptableOptions,
} from '@adaptabletools/adaptable-react-aggrid';
import { columnDefs, defaultColDef } from './columnDefs';
import { AdaptableOrderColumns, rowData } from './rowData';
import { renderReactRoot } from '../react-18-utils';
import { agGridModules } from './agGridModules';

import '@interopio/theme-demo-apps/dist/io.applications.css';
import { useIOConnect } from '@interopio/react-hooks';
import { IOConnectWorkspaces } from '@interopio/workspaces-api';

const renderWeakMap: WeakMap<HTMLElement, Root> = new WeakMap();
const Revision = 4;

export const OrdersBlotter = () => {
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
      adaptableId: 'AdaptableFixedIncomeOrders',
      fdc3Options: {
        enableLogging: false,
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
          },
        },
        actionColumnDefaultConfiguration: {
          width: 50,
        },
      },
      predefinedConfig: {
        Dashboard: {
          DashboardTitle: 'Orders',
          showQuickSearchInHeader: false,
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

  useEffect(() => {
    async function setMyWorkspaceId() {
      const inWsp = await (window as any).io.workspaces?.inWorkspace();
      if (!inWsp) {
        return;
      }

      const myWorkspace = await (window as any).io.workspaces?.getMyWorkspace();
      await (window as any).io.windows.my().updateContext({
        workspaceId: myWorkspace?.id,
      });
    }

    setMyWorkspaceId();
  }, []);

  const workspaceRef = useRef<IOConnectWorkspaces.Workspace | null>(null);
  useIOConnect(async (io) => {
    const workspaceId = (await io.windows.my().getContext()).workspaceId;
    const currentWorkspace =
      (await io.workspaces?.getAllWorkspaces())?.find(
        ({ id }) => id === workspaceId,
      ) || (await io.workspaces?.getMyWorkspace());

    workspaceRef.current = currentWorkspace || null;
  });

  const ISIN_CONTEXT = 'ISIN_CONTEXT';
  const ORDERID_CONTEXT = 'ORDERID_CONTEXT';
  const updateWorkspaceContext = (
    workspace: IOConnectWorkspaces.Workspace | null,
    row?: AdaptableOrderColumns,
  ) => {
    if (workspace && row !== undefined) {
      workspace.updateContext({
        [ISIN_CONTEXT]: {
          name: row.ISIN,
          id: {
            ISIN: row.ISIN,
          },
        },
        [ORDERID_CONTEXT]: {
          name: row.OrderID,
          id: {
            OrderID: row.OrderID,
          },
        },
        cacheBuster: Date.now(),
      });
    }
  };

  const onRowClicked = useCallback(
    (event: RowClickedEvent<any>) => {
      updateWorkspaceContext(workspaceRef.current, event.data);
    },
    [workspaceRef],
  );

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
        }}
      />
      <div className="ag-tick42 flex-1 ">
        <AgGridReact
          onRowClicked={onRowClicked}
          gridOptions={gridOptions}
          modules={agGridModules}
        />
      </div>
    </div>
  );
};
