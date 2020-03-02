import { ComponentHarness, BaseHarnessFilters, HarnessPredicate } from '@angular/cdk/testing';

export class CardHarness extends ComponentHarness {

    static hostSelector = 'card';

    protected getTitleElement = this.locatorFor('mat-card-title');

    static with(options: CardHarnessFilters): HarnessPredicate<CardHarness> {
        const harnessMatcher = (harness: CardHarness, title: string | null) => {
            return HarnessPredicate.stringMatches(harness.getTitleText(), title);
        };
        return new HarnessPredicate(CardHarness, options)
            .addOption('title', options.title, harnessMatcher);
    }

    async getTitleText(): Promise<string | null> {
        const titleEl = await this.getTitleElement();
        return titleEl.text();
    }
}

export interface CardHarnessFilters extends BaseHarnessFilters {
    title?: string;
}
