import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { User, Order, Part, PredictParts, OrderStatus, UserOrder } from '../interfaces';

interface ServerPartQuantity {
  id: number;
  quantity: number;
  part: Part;
}

interface ServerOrder {
  id: number;
  orderDate: string;
  client: User;
  orderStatus: OrderStatus;
  partQuantities: ServerPartQuantity[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = 'http://localhost:3000/api';

  getParts(params?: Record<string, any>): Observable<Part[]> {
    console.log(params);
    const path = this.baseUrl + '/parts';
    return this.http.get<any>(path , { params });
  }

  getPartByIds(ids: number[]): Observable<Part[]> {
    const path = this.baseUrl + '/parts/getById';
    return this.http.post<any>(path , { id: ids });
  }

  createPart(part: Part): Observable<any> {
    console.log(part);
    const path = this.baseUrl + '/parts';
    return this.http.post<any>(path, part);
  }

  deleteParts(parts: Part[]): Observable<any> {
    const path = this.baseUrl + '/parts/delete';
    const partIds = parts.map(part => part.id)
    return this.http.post<any>(path, partIds);
  }

  getUsers(): Observable<User[]> {
    const path = this.baseUrl + '/users';
    return this.http.get<any>(path);
  }

  createUser(user: User): Observable<any> {
    const path = this.baseUrl + '/users/create';
    return this.http.post<any>(path, user);
  }

  getUserById(userId: string): Observable<User> {
    const path = this.baseUrl + '/users/findOne';
    return this.http.post<any>(path, { id: userId });
  }

  deleteUsers(clients: User[]): Observable<any> {
    const path = this.baseUrl + '/users/delete';
    const partIds = clients.map(client => client.id)
    return this.http.post<any>(path, partIds);
  }

  getOrders(): Observable<Order[]> {
    const path = this.baseUrl + '/orders';
    return this.http.get<ServerOrder[]>(path).pipe(
      map(serverOrders => {
        return serverOrders.map(
          so => ({
            ...so,
            orderDate: new Date(so.orderDate).toUTCString(),
            clientId:so.client.id,
            partQuantities: so.partQuantities.map(q => ({quantity: q.quantity, partId: q.part.id}))
          })
        )
      })
    );
  }

  makePredictForecast(period: number): Observable<any>{
    const path = this.baseUrl + '/forecast/predictForecast';
    return this.http.post(path, {period});
  }

  retrainForecast(): Observable<any>{
    const path = this.baseUrl + '/forecast/retrainForecast';
    return this.http.post(path, {});
  }

  getForecastDemands(): Observable<PredictParts[]>{
    const path = this.baseUrl + '/forecast';
    return this.http.get<PredictParts[]>(path);
  }

  getPersonalOffers(userId: number): Observable<Part[]> {
    const path = this.baseUrl + '/personalOffers/getOffers';
    return this.http.post<Part[]>(path, { userId });
  }

  retrainPersonalOffers(): Observable<any> {
    const path = this.baseUrl + '/personalOffers/retrainOffers';
    return this.http.post<any>(path, {});
  }

  createOrder(order: Order): Observable<any> {
    const path = this.baseUrl + '/orders';
    return this.http.post<any>(path, order);
  }

  makeUserOrder(order: UserOrder): Observable<any> {
    const path = this.baseUrl + '/orders/makeUserOrder';
    return this.http.post<any>(path, order);
  }

  getUserOrders(): Observable<ServerOrder[]> {
    const path = this.baseUrl + '/orders/getUserOrders';
    return this.http.get<any>(path);
  }

  deleteOrders(orders: Order[]): Observable<any> {
    const path = this.baseUrl + '/orders/delete';
    const partIds = orders.map(order => order.id)
    return this.http.post<any>(path, partIds);
  }

  getRecommendsByPartName(partName: string): Observable<Part[]> {
    const path = this.baseUrl + '/personalOffers';
    return this.http.post<Part[]>(path, { items: [partName] });
  }
}
