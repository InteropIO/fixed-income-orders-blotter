import React from 'react';
import { OrdersBlotter } from './AdaptableAgGrid';
import { IOConnectContext } from '@interopio/react-hooks';

function App() {
  const io = React.useContext(IOConnectContext);

  (window as any).io = io;

  return (
    <div className="selection:bg-green-900">
      <OrdersBlotter></OrdersBlotter>
    </div>
  );
}

export default App;
