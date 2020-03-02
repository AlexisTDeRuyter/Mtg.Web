import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { DebugElement, Component } from '@angular/core';
import { MockWindow } from '../test/vendor-mocks/window.mock';
import { MatCardModule } from '@angular/material/card';
import { TestHelper } from '../test/test-helper';
import { Card } from '../core/scryfall/card';
import { CardStub } from '../core/scryfall/stubs/card.stub';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('When CardComponent is initialized', () => {

    let hostFixture: ComponentFixture<TestHostComponent>,
        componentElement: DebugElement,
        loader: HarnessLoader;

    let mockWindow: MockWindow,
        buttonHarness: MatButtonHarness;

    let expectedCard: Card;

    beforeEach(async () => {
        expectedCard = new CardStub({});
        mockWindow = new MockWindow();
        setupTestFixture();
        buttonHarness = await loader.getHarness<MatButtonHarness>(MatButtonHarness);
    });

    it('displays the card', async () => {
        TestHelper.assertInnerTextOfElementIsExpected(componentElement, 'mat-card-title', expectedCard.name);

        const imgEl = TestHelper.getNativeElement(componentElement, 'img');
        expect(imgEl.src).toBe(expectedCard.image_uris?.art_crop);

        expect(await buttonHarness.isDisabled()).toBeFalse();

        expect(await buttonHarness.getText()).toEqual('See in Scryfall');
    });

    describe('And the `See in Scryfall` link is clicked', () => {

        beforeEach(async () => {
            await buttonHarness.click();
        });

        it('navigates to scryfall in a new tab', () => {
            expect(mockWindow.open).toHaveBeenCalledWith(expectedCard.scryfall_uri, '_blank');
        });
    });

    describe('And the card is set to undefined', () => {

        beforeEach(() => {
            hostFixture.componentInstance.card = undefined;
            hostFixture.detectChanges();
        });

        it('disables the button', async () => {
            expect(await buttonHarness.isDisabled()).toBeTrue();
        });
    });

    describe('And the card is set to a new card', () => {

        let expectedUpdatedCard: Card;

        beforeEach(() => {
            expectedUpdatedCard = new CardStub({ name: 'updatedName' });
            hostFixture.componentInstance.card = expectedUpdatedCard;
            hostFixture.detectChanges();
        });

        it('updates to the new card', () => {
            TestHelper.assertInnerTextOfElementIsExpected(componentElement, 'mat-card-title', expectedUpdatedCard.name);
        });
    });

    function setupTestFixture(): void {
        TestBed.configureTestingModule({
            declarations: [
                TestHostComponent,
                CardComponent
            ],
            providers: [
                { provide: 'Window', useFactory: () => mockWindow }
            ],
            imports: [ MatCardModule ]
        });

        hostFixture = TestBed.createComponent(TestHostComponent);
        componentElement = hostFixture.debugElement;

        hostFixture.componentInstance.card = expectedCard;

        loader = TestbedHarnessEnvironment.loader(hostFixture);

        hostFixture.autoDetectChanges(true);
    }
});

@Component({
    template: '<card [card]="card"></card>'
})
class TestHostComponent {
    card: Card | undefined;
}
