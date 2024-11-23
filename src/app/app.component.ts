import { Component } from '@angular/core';
import { EditContactComponent } from './Component/edit-contact/edit-contact.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Contacts App';
}
