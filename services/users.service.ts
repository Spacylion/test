import {Observable} from 'rxjs';
import {WsService} from '@app/shared/ws.service';
import {arrToClass, toClass} from '@app/shared/rxjs-operators';

export class User {
//
}

export interface UserFilters {
    [key: string]: unknown;
}


export class UsersService {
    constructor(
        private wsService: WsService
    ) {
    }

    getUsers(filters: UserFilters = {}): Observable<User[]> {
        return this.wsService
            .send<User[]>('/users', {filters})
            .pipe(arrToClass(User));
    }

    getUserById(userId: number): Observable<User> {
        return this.wsService
            .send<User>('/users', {id: userId})
            .pipe(
                take(1),
                toClass(User)
            );
    }
}
