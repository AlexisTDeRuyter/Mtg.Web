import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ScryfallService } from '../core/scryfall/scryfall.service';
import { debounceTime, flatMap, map, startWith } from 'rxjs/operators';
import { Catalog } from '../core/scryfall/catalog';
import { AssertIsDefined } from '../helpers/assertIsDefined';
import { MatOption } from '@angular/material/core';
import { Card } from '../core/scryfall/card';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'card-search',
    templateUrl: 'card-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardSearchComponent {

    cardForm: FormGroup = this.formBuilder.group({
        cardGroup: ''
    });

    get cardControl(): AbstractControl {
        const control = this.cardForm.get('cardGroup');
        AssertIsDefined(control);
        return control;
    }

    filteredCards: Observable<string[]>;

    catalog: Observable<Catalog>;

    selectedCard: Card | undefined;

    constructor(private scryfallService: ScryfallService,
                private formBuilder: FormBuilder) {
        this.catalog = this.cardControl.valueChanges.pipe(
            startWith(''),
            debounceTime(100),
            flatMap(searchText => this.scryfallService.searchCards(searchText))
        );
        this.filteredCards = this.catalog.pipe(
            map(catalog => catalog.data)
        );
    }

    async getSelectedCard(cardName: MatOption): Promise<void> {
        this.selectedCard = await this.scryfallService.getCardByExactName(this.cardControl.value).toPromise();
    }
}
