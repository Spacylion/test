import {AuthResponse, RegistrationData} from "../models/auth.model";
import {TokenService} from "./token.service";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ConfigService} from "../config/config.service";

export class AuthService {
    constructor(
        private readonly http: HttpClient,
        private readonly tokenService: TokenService,
        private readonly configService: ConfigService
    ) {
    }

    register(token: string, data: RegistrationData): Observable<AuthResponse> {
        const request = {token, ...data};

        return this.http
            .post<AuthResponse>(
                `${this.configService.apiUrl}/auth/register`,
                request
            )
            .pipe(
                tap(response => this.tokenService.saveTokens(response))
            );
    }
}
