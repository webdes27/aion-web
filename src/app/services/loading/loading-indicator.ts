import {Component, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {LoadingService} from './loading.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'loading-indicator',
  template: `<div [style.visibility]="isLoading ? 'visible': 'hidden'" class="loading"></div>`,
  styles: ['./loading.css'],
})
export class LoadingIndicator implements OnInit, OnDestroy {
  isLoading = false;
  private _subscription:Subscription;

  constructor(private _loadingService:LoadingService) {
  }

  ngOnInit() {
    this._subscription = this._loadingService.loading$.subscribe(loading => this.isLoading = loading);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
