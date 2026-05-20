import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prelievo',
  imports: [FormsModule],
  templateUrl: './prelievo.html',
  styleUrl: './prelievo.css',
})
export class Prelievo {

  amount: number = 0;
  description: string = '';

  prelievaImporto(importo: number) {
    if (isNaN(importo) || importo <= 0) {
      console.error('Importo non valido');
      return;
    }
    // Logica per effettuare un prelievo con l'importo specificato
    console.log(`Prelievo effettuato per l'importo: ${importo}`);
  }
}
