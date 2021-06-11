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
            return +acc + AlphateWithNumer[curr.toUpperCase()];
        }, 0);
    }

    static isVowel(char: string): boolean {
        char = char.toUpperCase();
        return char === 'A' || char === 'E' || char === 'I' || char === 'O' || char === 'U';
    }

    static isSpecialNumber(number: number): boolean {
        return number === 11 || number === 22 || number === 33;
    }

    static getSumInSingleNumber(number: number | string): number {
        if (!isNaN(+number) && 9 < +number && !this.isSpecialNumber(+number)) {
            const sum = this.getSumOfDigits(+number);
            return this.getSumInSingleNumber(sum);
        } else {
            return +number;
        }
    }
}

export const AlphateWithNumer: any = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14,
    'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26
}