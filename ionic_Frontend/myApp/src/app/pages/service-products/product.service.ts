import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Prod {
  id?: string;
  name: string;
  description: string;
  price?: string;
  date?: Date;
  image?: {
    formats: {
      small: {
        url: string;
      };
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API='http://localhost:1337/products'
  constructor(private http:HttpClient) { }

  getProduts() { 
    return this.http.get<Prod[]>(this.API);
  }
  getProdutsFind(id) {
    return this.http.get<Prod>(`${this.API}/${id}`);
  }
  addProduts(name,description,price) { 
    return this.http.post<Prod[]>(this.API, {name,description,price})
  }
  updateProduts(id,prod:Prod) {
    return this.http.put<Prod[]>(`${this.API}/${id}`, prod);
  }
  deleteProduts(id) {
    return this.http.delete<Prod>(`${this.API}/${id}`);
  }

}
