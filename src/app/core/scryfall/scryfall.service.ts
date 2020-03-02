import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from './card';
import { Catalog } from './catalog';

@Injectable({ providedIn: 'root' })
export class ScryfallService {

    constructor(private httpClient: HttpClient) {
    }

    getRandomCard(): Observable<Card> {
        return this.httpClient.get<Card>('http://localhost:8080/cards/random');
    }

    searchCards(searchText: string): Observable<Catalog> {
        return this.httpClient.get<Catalog>(`https://api.scryfall.com/cards/autocomplete?q=${searchText}`);
    }

    getCardByExactName(cardName: string): Observable<Card> {
        return this.httpClient.get<Card>(`https://api.scryfall.com/cards/named?exact=${cardName}`);
    }
}
