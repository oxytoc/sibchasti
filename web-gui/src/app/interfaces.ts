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

export enum Gender {
  'm' = 'm',
  'f' = 'f'
}

export enum Role {
  admin = 'admin',
  user = 'user'
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  age: number;
  gender: Gender;
  firstName: string;
  secondName: string;
  thirdName: string;
  phoneNumber: string;
  role?: Role;
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

export interface PartIdWithDemands {
  partId: number;
  demands: string[];
}

export interface PredictParts {
  id: number,
  period: number,
  forecast: PartIdWithDemands[]
}

export interface LoginInterface {
  username: string;
  password: string;
}

export interface SignUp {
  name?: string;
  username?: string;
  age?: number;
  gender?: string;
  email?: string;
  password?: string;
  role?: string;
  firstName?: string;
  secondName?: string;
  thirdName?: string;
  phoneNumber?: string;
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
