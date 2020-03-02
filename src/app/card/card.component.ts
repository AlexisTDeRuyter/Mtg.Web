import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Card } from '../core/scryfall/card';
import { AssertIsDefined } from '../helpers/assertIsDefined';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'card',
    templateUrl: 'card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {

    @Input() card: Card | undefined | null;

    constructor(@Inject('Window') private window: Window) {
    }

    navigateToScryfall(): void {
        AssertIsDefined(this.card, 'Card');

        this.window.open(this.card?.scryfall_uri, '_blank');
    }
}
