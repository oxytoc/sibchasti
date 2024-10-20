export interface Part {
  id: number;
  brand: string;
  name: string;
  quantity: number;
  article: number;
  vin: string;
  type: string;
  price: number;
  partImage?: DatabaseFile;
  partImageId?: string;
  carModel: string;
  description: string;
}

export enum TranlatedKeyPart {
  brand = 'Марка',
  carModel = 'Модель',
  article = 'Артикул',
  type = 'Тип',
  quantity = 'Колличество',
  vin = 'Вин номер',
}

export interface ObjectInformation {
  parameter: string;
  value: string;
}

export enum Role {
  'm' = 'm',
  'f' = 'f'
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  age: number;
  gender: Role;
  firstName: string;
  secondName: string;
  thirdName: string;
  phoneNumber: string;
}

export enum OrderStatus {
  open = 'open',
  closed = 'closed'
}

export interface Order {
  id: number;
  orderDate: string;
  clientId: number,
  orderStatus: OrderStatus,
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
