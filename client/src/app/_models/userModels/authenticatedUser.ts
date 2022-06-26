export class AuthenticatedUser {
    constructor(public nick: string, public userName: string, public token: string, public id: string, public accountId: string) {
    }
}