export class Validator {
    static constraintLength(e, constraint) {
        const input = e.target;
        if (input.value.length > constraint) {
            input.value = input.value.slice(0, constraint);
        }
    }
    static withoutSymbols(e) {
        const input = e.target;
        input.value = input.value.replace(/\D/g, '');
    }
    static withoutDoubleZeroes(e) {
        const input = e.target;
        if (input.value === '00') {
            input.value = '0';
        }
    }
}
