import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  authorize_uri: string = environment.authorize_uri;
  logout_url: string = environment.logout_url;

  isLoggedIn: boolean;
  isAdmin: boolean;

  params: any = {
    client_id: environment.client_id,
    redirect_uri: environment.redirect_uri,
    scope: environment.scope,
    response_type: environment.response_type,
    response_mode: environment.response_mode,
    code_challenge_method: environment.code_challenge_method,
    code_challenge: environment.code_challenge
  }

  constructor(
    private tokenService: TokenService
  ) {
    this.isLoggedIn = false;
    this.isAdmin = false;
  }

  onLogin(): void {
    const httpParams = new HttpParams({ fromObject: this.params });
    const codeUrl = this.authorize_uri + httpParams.toString();
    location.href = codeUrl;
  }

  onLogout(): void {
    location.href = this.logout_url;
  }

  getLogged() {
    this.isLoggedIn = this.tokenService.isLoggedIn();
    this.isAdmin = this.tokenService.isAdmin();
  }
}
