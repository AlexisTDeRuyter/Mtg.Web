import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '../core/core.module';

@NgModule({
    imports: [
        MatCardModule,
        CommonModule,
        MatButtonModule,
        CoreModule
    ],
    exports: [ CardComponent ],
    declarations: [ CardComponent ],
    providers: [],
})
export class CardModule {
}
