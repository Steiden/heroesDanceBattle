export class Validator {

    static constraintLength(e: Event, constraint: number): void {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        if (input.value.length > constraint) {
            input.value = input.value.slice(0, constraint);
        }
    }

    static withoutSymbols(e: Event): void {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        input.value = input.value.replace(/\D/g, '');
    }

    static withoutDoubleZeroes(e: Event): void {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        if (input.value === '00') {
            input.value = '0';
        }
    }
}