import { Component } from '@angular/core';
import { List } from './components/list/list';

@Component({
  selector: 'app-root',
  imports: [List],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'address-book';
}
