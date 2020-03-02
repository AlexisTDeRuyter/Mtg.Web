export interface ObservableSpy<T> extends jasmine.Spy {
    next: (stub?: T) => void;
    error: (error?: Error) => void;
}
