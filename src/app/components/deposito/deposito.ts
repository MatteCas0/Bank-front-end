import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deposito',
  imports: [FormsModule],
  templateUrl: './deposito.html',
  styleUrl: './deposito.css',
})
export class Deposito {
  amount: number = 0;

  depositaImporto(importo: number) {
    if (isNaN(importo) || importo <= 0) {
      console.error('Importo non valido');
      return;
    }
    // Logica per effettuare un prelievo con l'importo specificato
    console.log(`Deposito effettuato per l'importo: ${importo}`);
  }
}
