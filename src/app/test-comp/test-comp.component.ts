import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'test-comp',
    template: '<div>oh hai</div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TestComponent {
}
