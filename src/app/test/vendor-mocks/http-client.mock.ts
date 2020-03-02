import { HttpClient } from '@angular/common/http';
import { AsyncSubject } from 'rxjs';
import { ObservableSpy } from '../custom-spy';
import { AssertIsDefined } from '../../helpers/assertIsDefined';

export class MockHttpClient {
    mock: jasmine.SpyObj<HttpClient>;

    get: ObservableSpy<any>;

    private getSubject: AsyncSubject<any> | undefined;

    constructor() {
        this.mock = jasmine.createSpyObj('HttpClient', [
            'get'
        ]);

        this.get = this.mock.get as ObservableSpy<any>;
        this.get.and.callFake(() => {
            this.getSubject = new AsyncSubject();
            return this.getSubject;
        });
        this.get.next = (stub: any) => {
            AssertIsDefined(this.getSubject);
            this.getSubject.next(stub);
            this.getSubject.complete();
            this.getSubject = undefined;
        };
        this.get.error = (error?: Error) => {
            AssertIsDefined(this.getSubject);
            this.getSubject.error(error);
            this.getSubject.complete();
            this.getSubject = undefined;
        };
    }
}
