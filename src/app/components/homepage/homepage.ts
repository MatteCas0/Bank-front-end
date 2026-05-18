import { Component, Signal } from '@angular/core';
import { BankService } from '../../services/bank-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  nomeUtente: string = "schifo";
  balance: Signal<number>;

  constructor(private bankService: BankService) {
    this.balance = toSignal(this.bankService.getBalance(), { initialValue: 0 });
  }

}
