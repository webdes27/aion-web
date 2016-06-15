import { Injectable } from '@angular/core';
import { Observer, Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/share';

@Injectable()
export class LoadingService {
    private _observer: Observer<boolean>;
    private _count = 0;
    loading$: Observable<boolean>;

    constructor() {
        this.loading$ = new Observable<boolean>(observer => this._observer = observer).share();
    }

    show() {
        this.toggleLoadingIndicator(true);
    }

    hide() {
        this.toggleLoadingIndicator(false);
    }

    private toggleLoadingIndicator(next: boolean) {
        if (this._observer) {
            if (next) this._count++; else this._count--;
            if (this._count > 0) next = true;
            this._observer.next(next);
        }
    }
}