import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BankService } from '../../services/bank-service';

@Component({
  selector: 'app-deposito',
  imports: [FormsModule],
  templateUrl: './deposito.html',
  styleUrl: './deposito.css',
})
export class Deposito {
  amount: number = 0;
  description: string = '';
  bankService: BankService;

  constructor(bankService: BankService) {
    this.bankService = bankService;
  }

  depositaImporto(importo: number, description: string) {
    if (isNaN(importo) || importo <= 0) {
      console.error('Importo non valido');
      return;
    }
    // Logica per effettuare un deposito con l'importo specificato
    console.log(`Deposito effettuato per l'importo: ${importo}`);

    this.bankService.addTransaction('deposit', importo, description);
  }
}
