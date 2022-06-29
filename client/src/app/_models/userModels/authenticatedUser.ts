export class AuthenticatedUser {
    constructor(public userName: string, public email: string, public token: string, public id: string, public accountId: string) {
    }
}