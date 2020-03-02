import { AssertionError } from 'assert';

export function AssertIsDefined<T>(val: T, valName: string = 'value'): asserts val is NonNullable<T> {
    if (val === undefined || val === null) {
        throw new AssertionError({
                message: `Expected ${valName} to be defined, but received ${val}`,
                expected: valName,
                actual: val
            }
        );
    }
}
