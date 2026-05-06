import { Routes } from '@angular/router';
import { Homepage } from './components/homepage/homepage';
import { Prelievo } from './components/prelievo/prelievo';
import { Deposito } from './components/deposito/deposito';
import { Movimenti } from './components/movimenti/movimenti';
import { Saldo } from './components/saldo/saldo';

export const routes: Routes = [
    { path: '', component: Homepage },
    { path: 'prelievo', component: Prelievo },
    { path: 'deposito', component: Deposito },
    { path: 'movimenti', component: Movimenti },
    { path: 'saldo', component: Saldo },
    { path: '**', redirectTo: '' }
];
