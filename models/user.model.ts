export interface UserResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

export class User {
    constructor(private readonly data: UserResponse) {
    }

    get fullName(): string {
        return `${this.data.firstName} ${this.data.lastName}`;
    }
}
