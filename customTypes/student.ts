import { User } from "./user";

export interface StudentUser {
    id: string;
    name: string;
    country: string;
    dateOfBirth: Date;
    address: string;
    user: User;
    userId: string;
}