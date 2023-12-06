import { ParentUser  } from "./user";

export interface Organization {
    id: string;
    name: string;
    parentUser: ParentUser[];
}