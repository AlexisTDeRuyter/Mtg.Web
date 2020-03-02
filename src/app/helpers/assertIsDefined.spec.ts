import { AssertIsDefined } from './assertIsDefined';

describe('AssertIsDefined', () => {

    describe('is called with 0', () => {

        it('does not throw an error', () => {
            expect(() => AssertIsDefined(0)).not.toThrowError();
        });
    });

    describe('is called with an empty string', () => {

        it('does not throw an error', () => {
            expect(() => AssertIsDefined('')).not.toThrowError();
        });
    });

    describe('is called with false', () => {

        it('does not throw an error', () => {
            expect(() => AssertIsDefined(false)).not.toThrowError();
        });
    });

    describe('is called with undefined', () => {

        it('throws an AssertionError', () => {
            expect(() => AssertIsDefined(undefined)).toThrowError(`Expected value to be defined, but received undefined`);
        });
    });

    describe('is called with null', () => {

        it('throws an AssertionError', () => {
            expect(() => AssertIsDefined(null)).toThrowError('Expected value to be defined, but received null');
        });
    });

    describe('is called with a valueName', () => {

        it('throws an AssertionError with the valueName', () => {
            expect(() => AssertIsDefined(null, 'number'))
                .toThrowError('Expected number to be defined, but received null');
        });
    });
});
