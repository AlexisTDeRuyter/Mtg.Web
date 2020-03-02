import { NgModule } from '@angular/core';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        { provide: 'Window', useFactory: windowFactory }
    ]
})
export class CoreModule {
}

export function windowFactory(): Window {
    return window;
}
