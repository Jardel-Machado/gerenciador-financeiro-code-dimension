import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionRequest } from 'src/app/shared/transaction/interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly api = 'http://localhost:3000/transactions';

  private readonly httpClient = inject(HttpClient);

  getById(id: number) {
    return this.httpClient.get<Transaction>(`${this.api}/${id}`);
  }

  getAll() {
    return this.httpClient.get<Transaction[]>(this.api);
  }

  create(request: TransactionRequest) {
    return this.httpClient.post<Transaction>(this.api, request);
  }

  update(id: number, request: TransactionRequest) {
    return this.httpClient.put<Transaction>(`${this.api}/${id}`, request);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.api}/${id}`);
  }
}
