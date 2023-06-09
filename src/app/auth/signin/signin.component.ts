import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    standalone: true,
    imports: [FormComponent],
})
export class SigninComponent {
  constructor() {}
}
import { Component } from '@angular/core';
