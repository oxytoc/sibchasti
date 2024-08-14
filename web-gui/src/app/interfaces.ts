export interface Part {
  id: number;
  brand: string;
  name: string;
  quantity: number;
  partCode: number;
  vin: string;
  type: string;
  price: number;
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

