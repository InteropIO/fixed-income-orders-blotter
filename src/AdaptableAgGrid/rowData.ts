import { Product } from '@finos/fdc3';
/**
 * @example
 * {
      type: 'fdc3.order',
      id: {
        orderId: 1026,
      },
      name: 'SHBASS 1 1/4 03/02/28',
      details: {
        creationDateTime: '',
        description: 'SHBASS 1 1/4 03/02/28',
        issuer: 'Svenska Handelsbanken AB',
        issuerLEI: 'NHBDILHZTYCNBV5UYZ31',
        maturity: 2028,
        orderSize: 1000000,
        product: {
          type: 'fdc3.product',
          id: {
            productId: '1026',
          },
          instrument: {
            type: 'fdc3.instrument',
            id: {
              isin: 'XS1782803503',
            },
          },
        },
        status: 'New',
        targetPrice: 102,
        transactionType: 'SELL',
        yield: 1.25,
      },
    }
 */
export interface NewOrder {
  type: string;
  id: {
    orderId: number;
  };
  name: string;
  details: {
    creationDateTime: string;
    description: string;
    issuer: string;
    issuerLEI: string;
    maturity: number;
    orderSize: number;
    product: Product;
    status: string;
    targetPrice: number;
    transactionType: string;
    yield: number;
  };
}
export interface AdaptableOrderColumns {
  OrderID: number;
  Status: string;
  TransactionType: 'BUY' | 'SELL' | string;
  Description: string;
  ISIN: string;
  Issuer: string;
  IssuerLEI: string;
  Yield: number;
  Maturity: number;
  TargetPrice: number;
  OrderSize: number;
  CreationDateTime: string;
}

export const rowData: AdaptableOrderColumns[] = [
  {
    OrderID: 1026,
    Status: 'New',
    TransactionType: 'SELL',
    Description: 'SHBASS 1 1/4 03/02/28',
    ISIN: 'XS1782803503',
    Issuer: 'Svenska Handelsbanken AB',
    IssuerLEI: 'NHBDILHZTYCNBV5UYZ31',
    Yield: 1.25,
    Maturity: 2028,
    TargetPrice: 102,
    OrderSize: 1000000,
    CreationDateTime: '',
  },

  {
    OrderID: 2787,
    Status: 'New',
    TransactionType: 'SELL',
    Description: 'DNBNO 1 1/8 03/20/28',
    ISIN: 'XS1794344827',
    Issuer: 'DNB Bank ASA',
    IssuerLEI: '549300GKFG0RYRRQ1414',
    Yield: 1.125,
    Maturity: 2028,
    TargetPrice: 98,
    OrderSize: 3000000,
    CreationDateTime: '',
  },
  {
    OrderID: 3223,
    Status: 'New',
    TransactionType: 'SELL',
    Description: 'GS 2 03/22/28',
    ISIN: 'XS1796209010',
    Issuer: 'Goldman Sachs Group, Inc.',
    IssuerLEI: '784F5XWPLTWKTBV3E584',
    Yield: 2,
    Maturity: 2028,
    TargetPrice: 95,
    OrderSize: 1730000,
    CreationDateTime: '',
  },
  {
    OrderID: 4409,
    Status: 'Working',
    TransactionType: 'BUY',
    Description: 'MS 0.495 10/26/29',
    ISIN: 'XS2250008245',
    Issuer: 'Morgan Stanley',
    IssuerLEI: 'IGJSJL3JD5P30I6NJZ34',
    Yield: 0.495,
    Maturity: 2029,
    TargetPrice: 98,
    OrderSize: 500000000,
    CreationDateTime: '',
  },

  {
    OrderID: 4770,
    Status: 'Working',
    TransactionType: 'BUY',
    Description: 'SANTAN 0.1 02/27/32',
    ISIN: 'ES0413900608',
    Issuer: 'Banco Santander, S.A.',
    IssuerLEI: '5493006QMFDDMYWIAM13',
    Yield: 0.1,
    Maturity: 2032,
    TargetPrice: 99,
    OrderSize: 3000000,
    CreationDateTime: '',
  },

  {
    OrderID: 7898,
    Status: 'Allocated',
    TransactionType: 'SELL',
    Description: 'HVB 0 1/2 02/23/27',
    ISIN: 'DE000HV2AYU9',
    Issuer: '\r\nUniCredit Bank AG',
    IssuerLEI: '2ZCNRR8UK83OBTEK2170',
    Yield: 0.5,
    Maturity: 2027,
    TargetPrice: 103,
    OrderSize: 3000000,
    CreationDateTime: '',
  },

  {
    OrderID: 1672,
    Status: 'Allocated',
    TransactionType: 'BUY',
    Description: 'RABOBK 3 7/8 11/30/32',
    ISIN: 'XS2524143554',
    Issuer: 'Cooperatieve Rabobank UA',
    IssuerLEI: 'DG3RU1DBUFHT4ZF9WN62',
    Yield: 3.875,
    Maturity: 2032,
    TargetPrice: 98,
    OrderSize: 2000000,
    CreationDateTime: '',
  },

  {
    OrderID: 2451,
    Status: 'Filled',
    TransactionType: 'SELL',
    Description: 'BPCEGP 4 11/29/32',
    ISIN: 'FR001400E797',
    Issuer: 'BPCE SA',
    IssuerLEI: '9695005MSX1OYEMGDF46',
    Yield: 4,
    Maturity: 2032,
    TargetPrice: 103,
    OrderSize: 1000000,
    CreationDateTime: '',
  },

  {
    OrderID: 3327,
    Status: 'Filled',
    TransactionType: 'SELL',
    Description: 'SANSCF 0 1/2 01/14/27',
    ISIN: 'XS2432530637',
    Issuer: 'Santander Consumer Finance SA',
    IssuerLEI: '5493000LM0MZ4JPMGM90',
    Yield: 0.5,
    Maturity: 2027,
    TargetPrice: 98,
    OrderSize: 1600000,
    CreationDateTime: '',
  },

  {
    OrderID: 3564,
    Status: 'Filled',
    TransactionType: 'SELL',
    Description: 'BHH 3 05/11/26',
    ISIN: 'DE000BHY0SP0',
    Issuer: 'Berlin Hyp AG',
    IssuerLEI: '529900C4RSSBWXBSY931',
    Yield: 3,
    Maturity: 2026,
    TargetPrice: 99,
    OrderSize: 2300000,
    CreationDateTime: '',
  },

  {
    OrderID: 9876,
    Status: 'Filled',
    TransactionType: 'SELL',
    Description: 'C 3.668 07/24/28',
    ISIN: 'US172967LP48',
    Issuer: 'Citigroup Inc.',
    IssuerLEI: '6SHGI4ZSSLCXXQSBB395',
    Yield: 3.668,
    Maturity: 2028,
    TargetPrice: 100.7,
    OrderSize: 4600000,
    CreationDateTime: '',
  },
];
