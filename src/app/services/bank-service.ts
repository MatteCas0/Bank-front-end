import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  account: Account = {
    id: '1',
    owner_name: 'John Doe',
    currency: 'EUR',
    createdAt: new Date().toISOString(),
  };

  movimenti: Transaction[] = [
    {
      id: '1',
      amount: 100,
      description: 'Deposit',
      type: 'deposit',
      account_id: '1',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      amount: 50,
      description: 'Withdrawal',
      type: 'withdrawal',
      account_id: '1',
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      amount: 200,
      description: 'Deposit',
      type: 'deposit',
      account_id: '1',
      created_at: new Date().toISOString(),
    },
    {
      id: '4',
      amount: 30,
      description: 'Withdrawal',
      type: 'withdrawal',
      account_id: '1',
      created_at: new Date().toISOString(),
    }
  ];

  constructor(private http: HttpClient) {}

  getAccount(): Account {
    return this.account;
  }

  getTransactions(): Transaction[] {
    return this.movimenti;
  }

  getBalance(): number {
    const deposits = this.movimenti
      .filter((t) => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0);
    const withdrawals = this.movimenti
      .filter((t) => t.type === 'withdrawal')
      .reduce((sum, t) => sum + t.amount, 0);
    return deposits - withdrawals;
  }

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
}
