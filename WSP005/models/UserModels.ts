export default class User {
    id: number;
    username: string;
    password: string;

    created_at: Date;
    updated_at: Date;

}

export class UserSession {
    // id:number;
    // username: string;
    // password: string;
    // image:string;
    // created_at:Date;
    // updated_at:Date;
    user?: {
        loggedIn?: boolean
        username?: string
        password?: number
        counter?: number
        liked_usernames?: Array<string>
        userId?: number
    }
    grant?: any
}