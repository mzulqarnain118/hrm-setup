import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/_Services/api.service';
import { UserService } from 'src/app/auth/services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'millLogo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    standalone: true,
    imports: [AsyncPipe],
})

// Just for displaying the logo
export class LogoComponent{
  imageUrl$ = new Observable<string>();
  showSignOutMenu = false;

  constructor(private apiService: ApiService, private user:UserService ) {}
  ngOnInit() {
    this.imageUrl$ = this.apiService.getLogo().pipe(map((res: any) => res.url));
  }

  showSignOut(){
    this.user.logout();
  }

  toggleSignOut() {
    this.showSignOutMenu = !this.showSignOutMenu;
  }
}
