export interface TodoItem {
    id: number
    name: string
    status: Status
}

export interface User {
    id: number
    username: string
    password: string
    firstName: string
    lastName: string
}

export enum Status {
    Active = "active",
    Complete = "complete"
}

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}
