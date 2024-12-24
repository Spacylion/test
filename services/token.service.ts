import {APP_KEYCLOAK_REFRESH, APP_KEYCLOAK_TOKEN} from "../shared/constants";
import {AuthTokens} from "../models/auth.model";
import {LocalStorage, SessionStorage} from '@app/shared/storage';

export class Storage {
    setItem(key: string, value: any) {
        //
    }
}

export class LocalStorage extends Storage {
    //
}

export class SessionStorage extends Storage {
    //
}

export class TokenService {
    constructor(
        private localStorage: LocalStorage,
        private sessionStorage: SessionStorage
    ) {
    }

    public saveToken(key: string, value: unknown, useLocalStorage = true): void {
        if (useLocalStorage) {
            this.localStorage.setItem(key, JSON.stringify(value));
        } else {
            this.sessionStorage.setItem(key, JSON.stringify(value));
        }
    }

    public saveTokens(tokens: AuthTokens): void {
        this.saveToken(APP_KEYCLOAK_REFRESH, tokens.refresh_token, false);
        this.saveToken(APP_KEYCLOAK_TOKEN, tokens.access_token, false);
    }
}
