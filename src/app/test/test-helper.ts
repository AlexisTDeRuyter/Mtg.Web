import { DebugElement, getDebugNode, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AssertIsDefined } from '../helpers/assertIsDefined';

export class TestHelper {

    constructor() {
    }

    static getNativeElement(componentElement: DebugElement, cssSelector: string): any {
        TestHelper.assertElementExists(componentElement, cssSelector);

        return componentElement
            .query(By.css(cssSelector))
            .nativeElement;
    }

    static getInnerTextOfElement(componentElement: DebugElement, cssSelector: string): string {

        TestHelper.assertElementExists(componentElement, cssSelector);

        return componentElement
            .query(By.css(cssSelector))
            .nativeElement
            .innerText;
    }

    static getInnerTextOfElements(componentElement: DebugElement, cssSelector: string): string[] {
        TestHelper.assertElementExists(componentElement, cssSelector);

        return componentElement
            .queryAll(By.css(cssSelector))
            .map(a => a.nativeElement.innerText);
    }

    static getInnerTextOfChildElement(componentElement: DebugElement, cssSelector: string, index: number): string {
        TestHelper.assertElementExists(componentElement, cssSelector);

        return componentElement
            .queryAll(By.css(cssSelector))[index]
            .nativeElement
            .innerText;
    }

    static getInnerHtmlOfElement(componentElement: DebugElement, cssSelector: string): string {

        TestHelper.assertElementExists(componentElement, cssSelector);

        return componentElement
            .query(By.css(cssSelector))
            .nativeElement
            .innerHTML;
    }

    static getTextContentOfElement(componentElement: DebugElement, cssSelector: string): string {

        TestHelper.assertElementExists(componentElement, cssSelector);

        return componentElement
            .query(By.css(cssSelector))
            .nativeElement
            .textContent;
    }

    static getCountOfElements(componentElement: DebugElement, cssSelector: string): number {
        TestHelper.assertElementExists(componentElement, cssSelector);

        return componentElement
            .queryAll(By.css(cssSelector))
            .length;
    }

    static getCountOfChildren(componentElement: DebugElement, cssSelector: string): number {
        TestHelper.assertElementExists(componentElement, cssSelector);

        return componentElement
            .query(By.css(cssSelector))
            .children
            .length;
    }

    static getChildComponent<T>(componentElement: DebugElement, cssSelector: string): T {
        TestHelper.assertElementExists(componentElement, cssSelector);

        const nestedComponent = componentElement.query(By.css(cssSelector)).nativeElement;

        const debugNode = getDebugNode(nestedComponent);

        AssertIsDefined(debugNode);

        return debugNode.componentInstance;
    }

    static getDirective<T>(componentElement: DebugElement, type: Type<T>): T {

        const directiveEl = componentElement.query(By.directive(type));

        expect(directiveEl).not.toBeFalsy();

        return directiveEl.injector.get(type);
    }

    static assertCountOfElementsIsExpected(componentElement: DebugElement, cssSelector: string, expectedCount: number) {
        const actualCount = TestHelper.getCountOfElements(componentElement, cssSelector);

        expect(actualCount)
            .toBe(expectedCount);
    }

    static assertInnerTextOfElementIsExpected(componentElement: DebugElement, cssSelector: string, expectedInnerText: string): void {
        TestHelper.assertElementExists(componentElement, cssSelector);
        const actualInnerText = TestHelper.getInnerTextOfElement(componentElement, cssSelector);
        expect(actualInnerText.toLowerCase().trim()).toEqual(expectedInnerText.toLowerCase().trim());
    }

    static assertInnerTextOfElementsAreExpected(componentElement: DebugElement, cssSelector: string, expectedText: string[]): void {
        const actualInnerText = TestHelper.getInnerTextOfElements(componentElement, cssSelector);

        if (actualInnerText.length !== expectedText.length) {
            fail(`Expected ${expectedText.length} "${cssSelector}" elements but found ${actualInnerText.length}`);
        }

        actualInnerText
            .forEach((item, index) => expect(item.toLowerCase().trim()).toEqual(expectedText[index].toLowerCase().trim()));
    }

    static assertInnerHtmlOfElementIsExpected(componentElement: DebugElement, cssSelector: string, expectedInnerHtml: string): void {
        TestHelper.assertElementExists(componentElement, cssSelector);
        const actualInnerHtml = TestHelper.getInnerHtmlOfElement(componentElement, cssSelector);
        expect(actualInnerHtml.trim()).toEqual(expectedInnerHtml.trim());
    }

    static assertTextContentOfElementIsExpected(componentElement: DebugElement, cssSelector: string, expectedTextContent: string): void {
        TestHelper.assertElementExists(componentElement, cssSelector);
        const actualTextContent = TestHelper.getTextContentOfElement(componentElement, cssSelector);
        expect(actualTextContent.trim()).toEqual(expectedTextContent.trim());
    }

    static clickElement(componentElement: DebugElement, cssSelector: string): void {

        TestHelper.assertElementExists(componentElement, cssSelector);

        componentElement
            .query(By.css(cssSelector))
            .nativeElement
            .click();
    }

    static clickElementAtIndex(componentElement: DebugElement, cssSelector: string, index: number): void {

        componentElement
            .queryAll(By.css(cssSelector))[index]
            .nativeElement
            .click();
    }

    static dispatchEvent(componentElement: DebugElement, cssSelector: string, eventName: string) {
        TestHelper.assertElementExists(componentElement, cssSelector);

        componentElement
            .query(By.css(cssSelector))
            .nativeElement
            .dispatchEvent(new Event(eventName), { bubbles: true });
    }

    static setInputValue(componentElement: DebugElement, cssSelector: string, value: string): void {
        TestHelper.assertElementExists(componentElement, cssSelector);

        const element = componentElement
            .query(By.css(cssSelector))
            .nativeElement;

        element.value = value;

        element.dispatchEvent(new Event('input'));
    }

    static assertElementHasClass(componentElement: DebugElement, cssSelector: string, className: string): void {
        const element = componentElement
            .query(By.css(cssSelector))
            .nativeElement;

        expect(element.classList.contains(className))
            .toBeTruthy();
    }

    static assertElementDoesNotHaveClass(componentElement: DebugElement, cssSelector: string, className: string): void {
        const element = componentElement
            .query(By.css(cssSelector))
            .nativeElement;

        expect(element.classList.contains(className))
            .toBeFalsy();
    }

    static assertElementExists(componentElement: DebugElement, cssSelector: string): void {
        const debugElement = componentElement.query(By.css(cssSelector));

        if (!debugElement) {
            fail(`Element "${cssSelector}" did not exist when it should.`);
        } else {
            expect(debugElement.nativeElement)
                .toBeTruthy();
        }
    }

    static assertElementDoesNotExist(componentElement: DebugElement, cssSelector: string): void {
        const debugElement = componentElement.query(By.css(cssSelector));

        if (debugElement) {
            fail(`Element "${cssSelector}" is in the DOM when it shouldn't be.`);
        }
    }

    static assertElementIsEnabled(componentElement: DebugElement, cssSelector: string): void {
        TestHelper.assertElementExists(componentElement, cssSelector);

        const element = componentElement
            .query(By.css(cssSelector))
            .nativeElement;

        expect(element.disabled).toBeFalsy();
    }

    static assertElementIsDisabled(componentElement: DebugElement, cssSelector: string): void {
        TestHelper.assertElementExists(componentElement, cssSelector);

        const element = componentElement
            .query(By.css(cssSelector))
            .nativeElement;

        expect(element.disabled).toBeTruthy();
    }

    static assertElementIsHidden(componentElement: DebugElement, cssSelector: string): void {
        TestHelper.assertElementExists(componentElement, cssSelector);

        const element = componentElement
            .query(By.css(cssSelector))
            .nativeElement;

        expect(element.hidden).toBe(true);
    }

    static assertAllPropertiesEqual(object1: any, object2: any) {
        expect(JSON.stringify(object1)).toEqual(JSON.stringify(object2));
    }
}
