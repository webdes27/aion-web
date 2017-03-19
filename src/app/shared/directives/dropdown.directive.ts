import { Directive, Input, HostListener } from '@angular/core';


@Directive({
    selector: '[dropdown]',
    host: { '[class.open]': 'isOpen' }
})
export class DropdownDirective {

    public isOpen: boolean = false;

    constructor() {}

    toggle() {
        if (this.isOpen) {
            this.isOpen = false;
        } else {
            this.isOpen = true;
        }
    }

    @HostListener('click', ['$event'])
    public toggleDropdown(event): boolean {
        event.stopPropagation();

        this.toggle();
        return false;
    }

}
