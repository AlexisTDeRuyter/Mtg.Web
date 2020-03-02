import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CardModule } from '../card/card.module';
import { CardSearchComponentModule } from '../card-search/card-search.module';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        CardModule,
        CardSearchComponentModule
    ],
    exports: [],
    declarations: [ HomeComponent ],
    providers: [],
})
export class HomeModule {
}
