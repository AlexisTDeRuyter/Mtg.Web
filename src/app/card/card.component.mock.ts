import { Component, Input } from '@angular/core';
import { Card } from '../core/scryfall/card';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'card',
    template: '<div>Card</div>'
})
export class MockCardComponent {
    @Input() card: Card | undefined;
}
