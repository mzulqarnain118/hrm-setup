import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtHelperService , JWT_OPTIONS} from '@auth0/angular-jwt';
import { UserService } from './services/user.service';

@NgModule({
    providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, UserService],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        SigninComponent,
        FormComponent
    ]
})
export class AuthModule { }
