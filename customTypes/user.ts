import { Organization } from "./organization";
import { OTP } from "./otp";

export interface User extends UserCreationResponse {
    otp: OTP;
}

export interface UserCreationResponse {
    id: string;
    email: string;
    phone: string;
    name: string;
    organization: Organization;
    organizationId: string;
    accountVerified: boolean;
    // users and otp are not included here
}