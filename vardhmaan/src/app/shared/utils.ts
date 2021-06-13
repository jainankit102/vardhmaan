import { LousGridMeta } from '../user';

export class Utils {
    static getSumOfDigits(number: number): number {
        if (!isNaN(number)) {
            return number.toString().split('').map(Number).reduce((acc, curr) => acc + curr, 0);
        }
        return number;
    }

    static calculateAge(date: Date) {
        var ageDifMs = Date.now() - date.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    static getVowelChars(word: string) {
        return word.split('').filter(char => this.isVowel(char)).join('');
    }

    static getCharNumberCount(word: string) {
        return word.split('').reduce((acc, curr: any) => {
            return +acc + numberLinkCorrospondingToAlphbate(curr);
        }, 0);
    }

    static isVowel(char: string): boolean {
        char = char.toUpperCase();
        return char === 'A' || char === 'E' || char === 'I' || char === 'O' || char === 'U';
    }

    static isSpecialNumber(number: number): boolean {
        return number === 11 || number === 22 || number === 33;
    }

    static getSumInSingleNumber(number: number | string, isSupportSpecialNumber = false): number {
        if (!isNaN(+number) && 9 < +number) {
            if (isSupportSpecialNumber && this.isSpecialNumber(+number)) {
                return +number;
            } else {
                const sum = this.getSumOfDigits(+number);
                return this.getSumInSingleNumber(sum, isSupportSpecialNumber);
            }
        } else {
            return +number;
        }
    }

    static getNumberOccuranceChar(word: string, char: string): number {
        return word.split('').filter(c => c === char).length;
    }
}

export function getLousGridMetaData(): Array<LousGridMeta> {
    return [
        {
            value: 'T',
            className: 'column-title-item '
        },
        {
            value: 'W',
            className: 'column-title-item '
        },
        {
            value: 'A',
            className: 'column-title-item '
        },
        {
            value: '',
            className: 'empty-item'
        },
        {
            value: 'X',
            placeholder: 4
        },
        {
            value: 'X',
            placeholder: 9
        },
        {
            value: 'X',
            placeholder: 2
        },
        {
            value: 'M',
            className: 'column-title-item '
        },
        {
            value: 'X',
            placeholder: 3
        },
        {
            value: 'X',
            placeholder: 5
        },
        {
            value: 'X',
            placeholder: 7
        },
        {
            value: 'E',
            className: 'column-title-item '
        },
        {
            value: 'X',
            placeholder: 8
        },
        {
            value: 'X',
            placeholder: 1
        },
        {
            value: 'X',
            placeholder: 6
        },
        {
            value: 'P',
            className: 'column-title-item '

        }
    ]
}
export const AlphateWithNumer: any = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14,
    'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26
}

export function numberLinkCorrospondingToAlphbate(char: string): any {
    switch (char.toUpperCase()) {
        case 'A':
        case 'J':
        case 'S':
            return 1;
        case 'B':
        case 'K':
        case 'T':
            return 2;
        case 'C':
        case 'L':
        case 'U':
            return 3;
        case 'D':
        case 'M':
        case 'V':
            return 4;
        case 'E':
        case 'N':
        case 'W':
            return 5;
        case 'F':
        case 'O':
        case 'X':
            return 6;
        case 'G':
        case 'P':
        case 'Y':
            return 7;
        case 'H':
        case 'Q':
        case 'Z':
            return 8;
        case 'I':
        case 'R':
        case '*':
            return 9;
        default:
            return 0;
    }
}