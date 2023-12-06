import { User } from "./user";

export interface StudentUser {
    id: string;
    name: string;
    country: string;
    doB: Date;
    address: string;
    user: User;
    userId: string;
}