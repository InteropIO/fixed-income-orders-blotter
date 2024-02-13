/**
 * @experimental context type representing an order. To be used with OMS and EMS systems.
 *
 * This type currently only defines a required `id` field, which should provide a reference
 * to the order in one or more systems, an optional human readable `name` field to be used
 * to summarize the order and an optional `details` field that may be used to provide
 * additional detail about the order, including a context representing a `product`, which
 * may be extended with arbitrary properties. The `details.product` field is currently typed
 * as a unspecified Context type, but both `details` and `details.product` are expected to
 * be standardized in future.
 */
export interface FDC3_Order {
  /**
   * Optional additional details about the order, which may include a product element that is
   * an, as yet undefined but extensible, Context
   */
  details?: OrderDetails;
  /**
   * One or more identifiers that refer to the order in an OMS, EMS or related system.
   * Specific key names for systems are expected to be standardized in future.
   */
  id: { [key: string]: string };
  /**
   * An optional human-readable summary of the order.
   */
  name?: string;
  type: OrderType;
  [property: string]: any;
}

/**
 * Optional additional details about the order, which may include a product element that is
 * an, as yet undefined but extensible, Context
 */
export interface OrderDetails {
  product?: Product;
  [property: string]: any;
}

/**
 * @experimental context type representing a tradable product. To be used with OMS and EMS
 * systems.
 *
 * This type is currently only loosely defined as an extensible context object, with an
 * optional instrument field.
 *
 * The Product schema does not explicitly include identifiers in the id section, as there is
 * not a common standard for such identifiers. Applications can, however, populate this part
 * of the contract with custom identifiers if so desired.
 */
export interface Product {
  /**
   * One or more identifiers that refer to the product. Specific key names for systems are
   * expected to be standardized in future.
   */
  id: { [key: string]: string };
  /**
   * financial instrument that relates to the definition of this product
   */
  instrument?: Instrument;
  /**
   * A human-readable summary of the product.
   */
  name?: string;
  type: ProductType;
  [property: string]: any;
}

/**
 * financial instrument that relates to the definition of this product
 *
 * A financial instrument from any asset class.
 */
export interface Instrument {
  /**
   * Any combination of instrument identifiers can be used together to resolve ambiguity, or
   * for a better match. Not all applications will use the same instrument identifiers, which
   * is why FDC3 allows for multiple to be specified. In general, the more identifiers an
   * application can provide, the easier it will be to achieve interoperability.
   *
   * It is valid to include extra properties and metadata as part of the instrument payload,
   * but the minimum requirement is for at least one instrument identifier to be provided.
   *
   * Try to only use instrument identifiers as intended. E.g. the `ticker` property is meant
   * for tickers as used by an exchange.
   * If the identifier you want to share is not a ticker or one of the other standardized
   * fields, define a property that makes it clear what the value represents. Doing so will
   * make interpretation easier for the developers of target applications.
   */
  id: InstrumentIdentifiers;
  /**
   * The `market` map can be used to further specify the instrument and help achieve
   * interoperability between disparate data sources. This is especially useful when using an
   * `id` field that is not globally unique.
   */
  market?: Market;
  type: InstrumentType;
  name?: string;
  [property: string]: any;
}

/**
 * Any combination of instrument identifiers can be used together to resolve ambiguity, or
 * for a better match. Not all applications will use the same instrument identifiers, which
 * is why FDC3 allows for multiple to be specified. In general, the more identifiers an
 * application can provide, the easier it will be to achieve interoperability.
 *
 * It is valid to include extra properties and metadata as part of the instrument payload,
 * but the minimum requirement is for at least one instrument identifier to be provided.
 *
 * Try to only use instrument identifiers as intended. E.g. the `ticker` property is meant
 * for tickers as used by an exchange.
 * If the identifier you want to share is not a ticker or one of the other standardized
 * fields, define a property that makes it clear what the value represents. Doing so will
 * make interpretation easier for the developers of target applications.
 */
export interface InstrumentIdentifiers {
  /**
   * <https://www.bloomberg.com/>
   */
  bbg?: string;
  /**
   * <https://www.cusip.com/>
   */
  cusip?: string;
  /**
   * <https://www.factset.com/>
   */
  fdsID?: string;
  /**
   * <https://www.openfigi.com/>
   */
  figi?: string;
  /**
   * <https://www.isin.org/>
   */
  isin?: string;
  /**
   * <https://permid.org/>
   */
  permid?: string;
  /**
   * <https://www.refinitiv.com/>
   */
  ric?: string;
  /**
   * <https://www.lseg.com/sedol>
   */
  sedol?: string;
  /**
   * Unstandardized stock tickers
   */
  ticker?: string;
  [property: string]: any;
}

/**
 * The `market` map can be used to further specify the instrument and help achieve
 * interoperability between disparate data sources. This is especially useful when using an
 * `id` field that is not globally unique.
 */
export interface Market {
  /**
   * <https://www.bloomberg.com/>
   */
  bbg?: string;
  /**
   * <https://www.iso.org/iso-3166-country-codes.html>
   */
  countryIsoalpha2?: string;
  /**
   * <https://en.wikipedia.org/wiki/Market_Identifier_Code>
   */
  mic?: string;
  /**
   * Human readable market name
   */
  name?: string;
  [property: string]: any;
}

export enum InstrumentType {
  Fdc3Instrument = 'fdc3.instrument',
}

export enum ProductType {
  Fdc3Product = 'fdc3.product',
}

export enum OrderType {
  Fdc3Order = 'fdc3.order',
}
