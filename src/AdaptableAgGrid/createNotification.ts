import { Order, raiseIntent } from '@finos/fdc3';
// import IODesktop, { IOConnectDesktop } from '@interopio/desktop';
import '@interopio/fdc3';

export interface IO_Order extends Order {
  details: Order['details'] & Misc;
}

export interface Misc {
  misc: {
    Status: string;
    TransactionType: string;
    Description: string;
    Issuer: string;
    IssuerLEI: string;
    Yield: number;
    Maturity: number;
    TargetPrice: number;
    OrderSize: number;
    ExecutedAmount: number;
    Account: string;
    Manager: string;
    Trader: string;
    Industry: string;
  };
}

export async function createNotification(
  ioD: any, // IOConnectDesktop.API,
  order: IO_Order,
) {
  if (!order) return;
  const {
    TransactionType: side,
    OrderSize: size,
    Manager: fundManager,
  } = order.details.misc;

  const { ISIN } = order.details.product!.instrument!.id;

  const notificationOptions = {
    title: `New Incoming Order: ${side}, ${size}, ${ISIN}`,
    body: `from ${fundManager}`,
    actions: [
      {
        action: 'ViewOrder',
        title: 'ViewOrder',
      },
    ],
  };

  // Raise the notification
  const notification = await ioD.notifications.raise(notificationOptions);

  // Handle the action button click
  notification.onaction = (actionEvent: any) => {
    if (actionEvent.action === 'ViewOrder') {
      // Raise the FDC3 intent with the order blotter
      // raiseIntent("ViewOrder", order, 'adaptable-blotter-orders')
      raiseIntent('ViewOrder', order, { appId: 'adaptable-blotter-orders' })
        .then(console.log)
        .catch((err) => console.error('Failed to raise the FDC3 intent', err));
    }
  };
}
