export interface IGenerics extends Document {
    userType: string;
    email: string;
    password: string;
    phone: string;
    dob: string;
    pic?: string;
    isArchived: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    gender: string;
}