import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank-service';

@Component({
  selector: 'app-saldo',
  imports: [],
  templateUrl: './saldo.html',
  styleUrl: './saldo.css',
})
export class Saldo implements OnInit {
  balance = 0;
  fiatCurrency = 'EUR';
  cryptoSymbol = 'BTC';
  fiatBalance: number | null = null;
  cryptoBalance: number | null = null;
  error = '';

  constructor(private bankService: BankService) {}

  ngOnInit() {
    this.balance = this.bankService.getBalance();

    this.bankService.convertBalanceToFiat(this.fiatCurrency).subscribe({
      next: (value) => (this.fiatBalance = value),
      error: (err) =>
        (this.error = `Errore conversione fiat: ${err?.message ?? err}`),
    });

    this.bankService.convertBalanceToCrypto(this.cryptoSymbol).subscribe({
      next: (value) => (this.cryptoBalance = value),
      error: (err) =>
        (this.error = `Errore conversione crypto: ${err?.message ?? err}`),
    });
  }
}