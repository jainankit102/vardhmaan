export interface UserInfo {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    age?: number;
}

export interface LousGridMeta {
    placeholder?: number;
    value: number | string;
    specialNumber?: string | number;
    className?: string;
}