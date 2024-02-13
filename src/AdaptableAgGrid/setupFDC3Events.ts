import {
  AdaptableApi,
  SelectionChangedInfo,
} from '@adaptabletools/adaptable-react-aggrid';
import debounce from 'lodash/debounce';

export async function setupFDC3Events(adaptableApi: AdaptableApi) {
  // FIXME AFL: debounce is required because the SelectionChagnedEvent is called twice!!
  // first time with the previous(obsolete) selection and the second time with the new selection
  // remove lodash npm dependency once the bug is fixed,
  // also the SelectionChangedEvent is called even on clicking on already selected row
  // see ##2222
  const debouncedSelectionChanged = debounce(
    (selectionChangedInfo: SelectionChangedInfo) => {
      const selectedGridRow = selectionChangedInfo.selectedRowInfo.gridRows[0];
      if (selectedGridRow?.rowNode) {
        const fdc3Api = adaptableApi.fdc3Api;
        fdc3Api.broadcastFromRow(selectedGridRow.rowNode, 'fdc3.instrument');
      }
    },
    500,
  );

  adaptableApi.eventApi.on(
    'SelectionChanged',
    (selectionChangedInfo: SelectionChangedInfo) =>
      debouncedSelectionChanged(selectionChangedInfo),
  );
}
