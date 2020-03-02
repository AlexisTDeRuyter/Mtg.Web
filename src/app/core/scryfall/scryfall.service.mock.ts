import { ScryfallService } from './scryfall.service';
import { AsyncSubject } from 'rxjs';
import { Card } from './card';
import { ObservableSpy } from 'src/app/test/custom-spy';
import { AssertIsDefined } from '../../helpers/assertIsDefined';

export class MockScryfallService {
    mock: jasmine.SpyObj<ScryfallService>;

    getRandomCard: ObservableSpy<Card>;

    private getRandomCardSubject: AsyncSubject<Card> | undefined;

    constructor() {
        this.mock = jasmine.createSpyObj('MockScryfallService', [
            'getRandomCard'
        ]);

        this.getRandomCard = this.mock.getRandomCard as ObservableSpy<Card>;
        this.getRandomCard.and.callFake(() => {
            this.getRandomCardSubject = new AsyncSubject<Card>();
            return this.getRandomCardSubject;
        });
        this.getRandomCard.next = (stub: Card) => {
            AssertIsDefined(this.getRandomCardSubject);
            this.getRandomCardSubject.next(stub);
            this.getRandomCardSubject.complete();
            this.getRandomCardSubject = undefined;
        };
        this.getRandomCard.error = (error?: Error) => {
            AssertIsDefined(this.getRandomCardSubject);
            this.getRandomCardSubject.error(error);
            this.getRandomCardSubject.complete();
            this.getRandomCardSubject = undefined;
        };
    }
}
