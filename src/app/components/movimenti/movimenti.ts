import { Component, signal } from '@angular/core';
import { BankService } from '../../services/bank-service';
import { Transaction } from '../../models/transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movimenti',
  imports: [CommonModule],
  templateUrl: './movimenti.html',
  styleUrl: './movimenti.css',
})
export class Movimenti {

  movimenti: Transaction[] = [];

  constructor(private bankService: BankService) {
    this.movimenti = this.bankService.getTransactions();
  }
}
