export interface User {
    id: number;
    fullName: string;
    username: string;
    gender: string;
    phone: string;
    email: string;
    password: string;
    activated: boolean;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}
