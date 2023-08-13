import { Component, Input, inject, signal } from '@angular/core';
import { PriceActionService } from './services/price-action.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pos';
}
