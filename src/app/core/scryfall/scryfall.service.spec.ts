import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ScryfallService } from './scryfall.service';
import { MockHttpClient } from '../../test/vendor-mocks/http-client.mock';
import { Card } from './card';
import { CardStub } from './stubs/card.stub';

describe('Scryfall Service', () => {

    let sut: ScryfallService;

    let mockHttpClient: MockHttpClient;

    let expectedCard: Card;

    beforeEach(() => {
        mockHttpClient = new MockHttpClient();
        expectedCard = new CardStub({});
        createTestFixture();
    });

    describe('When getRandomCard is called', () => {

        it('gets a random card', async () => {
            const randomCardProm = sut.getRandomCard().toPromise();
            mockHttpClient.get.next(expectedCard);
            const response = await randomCardProm;

            expect(mockHttpClient.get).toHaveBeenCalledWith('https://api.scryfall.com/cards/random');
            expect(response).toBe(expectedCard);
        });
    });

    function createTestFixture(): void {
        TestBed.configureTestingModule({
            providers: [
                ScryfallService,
                { provide: HttpClient, useValue: mockHttpClient }
            ]
        });

        sut = TestBed.inject<ScryfallService>(ScryfallService);
    }
});
