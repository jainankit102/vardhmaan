export interface UserInfo {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    age?: number;
}

export interface PrintTemplateMeta {
    title: string;
    value?: any;
    iconName: string;
    rawCalculcation?: any
}

export interface AllNumberData {
    psychicNumber: string | number;
    destinyByDate: string | number;
    destinyByName: string | number;
    kuaNumber: string | number;
    soulNumber: string | number;
    personalityNumber: string | number;
}

export enum AllTypeOfNumbers {
    PSYCHIC = 'psychic',
    DESTINY_BY_NAME = 'destinyByName',
    DESTINY_BY_DOB = 'destinyByDOB',
    SOUL = 'soul',
    KUA = 'kua',
    PERSONALITY = 'personality'
}

export interface LousGridMeta {
    placeholder?: number;
    value: number | string;
    specialNumber?: string | number;
    className?: string;
}

export interface PlanesOfNumberMeta {
    type?: string;
    title: string;
    value: string | number;
    expression: string;
}

export interface PinnacleNumberMeta {
    title: string;
    value: number;
    period: string;
    valueExpression?: string;
    periodExpression?: string;
}