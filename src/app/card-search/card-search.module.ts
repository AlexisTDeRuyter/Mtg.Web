import { NgModule } from '@angular/core';
import { CardSearchComponent } from './card-search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ MatAutocompleteModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule ],
    exports: [
        CardSearchComponent
    ],
    declarations: [ CardSearchComponent ],
    providers: [],
})
export class CardSearchComponentModule {
}
