import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  
  private apiUrl = 'http://localhost';

  private movimenti: Observable<Transaction[]> = of([]);
  private movimentiHomepage: Observable<Transaction[]> = of([]);

  constructor(private http: HttpClient) {
    this.movimenti = http.get<Transaction[]>(`${this.apiUrl}/accounts/1/movimenti`);
    this.movimentiHomepage = http.get<Transaction[]>(`${this.apiUrl}/accounts/1/movimenti_homepage`);
  }
  
  /*
  getAccount(): Account {
    return this.account;
  }
  getCurrency(): string {
    return this.account.currency;
  }
  */

  getMovimenti(): Observable<Transaction[]> {
    return this.movimenti;
  }

  getTransactions(): Observable<Transaction[]> {
    return this.movimenti;
  }

  getHomepageTransactions(): Observable<Transaction[]> {
    return this.movimentiHomepage;
  }

  getBalance(): Observable<number> {
    return this.movimenti.pipe(
      map((transactions) => {
        const deposits = transactions
          .filter((t) => t.type === 'deposit')
          .reduce((sum, t) => sum + t.amount, 0);
        const withdrawals = transactions
          .filter((t) => t.type === 'withdrawal')
          .reduce((sum, t) => sum + t.amount, 0);
        return deposits - withdrawals;
      })
    );
  }

  addTransaction(type: 'deposit' | 'withdrawal', amount: number, description: string) {
    this.http.post<Transaction>(`${this.apiUrl}/accounts/1/deposit`, {
      type,
      amount,
      description
    });
  }
/*
  convertBalanceToFiat(targetCurrency: string): Observable<number> {
    const amount = this.getBalance();
    return this.http
      .get<{ amount: number; base: string; date: string; rates: Record<string, number> }>(
        'https://api.frankfurter.dev/v1/latest?base=USD',
        {
          params: {
            amount: amount,
            from: this.account.currency,
            to: targetCurrency,
          },
        }
      )
      .pipe(map((res) => res.rates[targetCurrency]));
  }

  convertBalanceToCrypto(cryptoSymbol: string): Observable<number> {
    const balance = this.getBalance();
    const symbol = `${cryptoSymbol.toUpperCase()}USDT`;
    return this.http
      .get<{ symbol: string; price: string }>(
        'https://api.binance.com/api/v3/ticker/price',
        { params: { symbol } }
      )
      .pipe(map((res) => balance / parseFloat(res.price)));
  }
*/
}
