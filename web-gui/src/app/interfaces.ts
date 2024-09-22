export interface Part {
  id: number;
  brand: string;
  name: string;
  quantity: number;
  partCode: number;
  vin: string;
  type: string;
  price: number;
  partImage?: DatabaseFile;
  partImageId?: string;
  carBrand: string;
}

export interface Client {
  id: number;
  firstName: string;
  secondName: string;
  thirdName: string;
  phoneNumber: string;
}

export interface Order {
  id: number;
  orderDate: string;
  clientId: number,
  partQuantities: PartQuantity[];
}

export interface PartQuantity {
  quantity: number;
  partId: number;
}

export interface PredictParts {
  timeSeries: number[];
  predicts: number[];
  errors: number[];
}

export interface LoginInterface {
  username: string;
  password: string;
}

export interface DatabaseFile {
  id: number;
  filename: string;
  data: Uint8Array;
}

export enum FilterType {
  STRING_FILTER = 'STRING_FILTER',
  NUMBER_FILTER = 'NUMBER_FILTER',
  DATE_FILTER = 'DATE_FILTER',
  BOOLEAN_FILTER = 'BOOLEAN_FILTER',
  ENUM_FILTER = 'ENUM_FILTER',
}

export interface FilterInterface {
  name: string;
  showName: string;
  type: FilterType;
  enum?: string[];
}

export interface FilterChanged {
  name: string;
  value: any;
}
