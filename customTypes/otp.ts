import { User } from "./user";

export interface OTP {
    id: string;
    code: string;
    user: User;
    userId: string;
    updatedAt: Date;
    expiresAt: Date;
    verifiedAt: Date;
}
