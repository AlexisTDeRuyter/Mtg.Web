import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScryfallService } from '../core/scryfall/scryfall.service';
import { Card } from '../core/scryfall/card';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'home',
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {

    constructor(private scryfallService: ScryfallService) {
    }

    card$: Observable<Card>;

    ngOnInit(): void {
        this.getRandomCard();
    }

    getRandomCard(): void {
        this.card$ = this.scryfallService.getRandomCard();
    }
}
