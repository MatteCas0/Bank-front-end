import { Component, signal, Signal } from '@angular/core';
import { BankService } from '../../services/bank-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Transaction } from '../../models/transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css'],
})
export class Homepage {
  nomeUtente: string = "schifo";
  balance: Signal<number>;

  movimenti: Signal<Transaction[]> = signal([]);

  constructor(private bankService: BankService) {
    this.balance = toSignal(this.bankService.getBalance(), { initialValue: 0 });
    this.movimenti = toSignal(this.bankService.getHomepageTransactions(), { initialValue: [] });
  }

}
