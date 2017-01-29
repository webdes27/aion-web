import { Directive, OnChanges, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[collapse]',
    host: {
        '[attr.aria-expanded]': 'expand',
        '[attr.aria-hidden]': '!expand',
        '[class.in]': 'expand',
        '[class.collapse]': '!expand',
        '[class.collapsing]': 'collapsing',
    }
})
export class CollapseDirective implements OnChanges {
    
    @Input() collapse: boolean;
    public collapsing: boolean = false;
    public expand: boolean = false;

    constructor(private elementRef: ElementRef) {}

    ngOnChanges(changes) {
        if (changes.collapse) {
            if (this.collapse) {
                this.hide()
            } else {
                this.show();
            }
        }
    }

    hide(): void {
        this.collapsing = true;
        this.collapsing = false;
        this.expand = false;
    }

    show(): void {
        this.collapsing = true;
        this.collapsing = false;
        this.expand = true;
    }

    private get elementHeight(): number {
        let el = this.elementRef.nativeElement;
        var height = el.offsetHeight;
        var style = getComputedStyle(el);

        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
    }

}
