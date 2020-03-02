import { HomeComponent } from './home.component';
import { ScryfallService } from '../core/scryfall/scryfall.service';
import { MatButtonModule } from '@angular/material/button';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { MockScryfallService } from '../core/scryfall/scryfall.service.mock';
import { CardStub } from '../core/scryfall/stubs/card.stub';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MockCardComponent } from '../card/card.component.mock';
import { TestHelper } from '../test/test-helper';
import { CardComponent } from '../card/card.component';
import { Card } from '../core/scryfall/card';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('When Home is initialized', () => {

    let fixture: ComponentFixture<HomeComponent>,
        componentElement: DebugElement,
        loader: HarnessLoader;

    let mockScryfallService: MockScryfallService,
        buttonHarness: MatButtonHarness;

    let expectedCard: Card;

    beforeEach(async () => {
        mockScryfallService = new MockScryfallService();
        expectedCard = new CardStub({});
        setupTestFixture();
        buttonHarness = await loader.getHarness<MatButtonHarness>(MatButtonHarness);
    });

    it('gets a random card', () => {
        expect(mockScryfallService.getRandomCard).toHaveBeenCalled();
    });

    it('displays the card component', () => {
        const cardComponent = TestHelper.getChildComponent<CardComponent>(componentElement, 'card');
        expect(cardComponent.card).toBeNull();
    });

    it('displays a button to get a new random card', async () => {
        expect(await buttonHarness.getText()).toEqual('Get Random Card');
    });

    describe('And the card is returned', () => {

        beforeEach(async () => {
            mockScryfallService.getRandomCard.next(expectedCard);
            await fixture.whenStable();
            fixture.detectChanges();
        });

        it('gives the card to the card component', () => {
            const cardComponent = TestHelper.getChildComponent<CardComponent>(componentElement, 'card');

            expect(cardComponent.card).toBe(expectedCard);
        });
    });

    describe('And the `Get Random Card` button is clicked', () => {

        beforeEach(async () => {
            mockScryfallService.getRandomCard.calls.reset();
            await buttonHarness.click();
        });

        it('gets a new random card', () => {
            expect(mockScryfallService.getRandomCard).toHaveBeenCalled();
        });
    });

    function setupTestFixture(): void {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                MockCardComponent
            ],
            providers: [
                { provide: ScryfallService, useFactory: () => mockScryfallService }
            ],
            imports: [ MatButtonModule ]
        });

        fixture = TestBed.createComponent(HomeComponent);
        componentElement = fixture.debugElement;

        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.autoDetectChanges(true);
    }
});
