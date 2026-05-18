import { Component, Signal, signal } from '@angular/core';
import { BankService } from '../../services/bank-service';
import { Transaction } from '../../models/transaction.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movimenti',
  imports: [CommonModule],
  templateUrl: './movimenti.html',
  styleUrl: './movimenti.css',
})
export class Movimenti {

  movimenti: Signal<Transaction[]> = signal([]);

  constructor(private bankService: BankService) {
    this.movimenti = toSignal(this.bankService.getTransactions(), { initialValue: [] });
  }
}
