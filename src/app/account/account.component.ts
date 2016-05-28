import {Component, OnInit}  from '@angular/core';
import {Http, Response, HTTP_PROVIDERS}  from '@angular/http';
import {Observable}       from 'rxjs/Observable';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap';

@Component({
  selector: 'my-app',
  template: require('./account.html'),
  directives: [PAGINATION_DIRECTIVES],
  providers:[HTTP_PROVIDERS]
})

export class AccountComponent implements OnInit {

  errorMessage: string;
  items: string[];
  paginationCurrentPage: number = 1;
  paginationPageCount: number;
  paginationPerPage: number;
  paginationTotalCount;
  loading: boolean;

  constructor (private _http: Http) {}

  private _url = 'http://host5/account-datas';  // URL to web API

  getItems(page: number): Observable<string[]> {
  	this.loading = true;
    return this._http.get(this._url+"?page="+page)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    this.paginationCurrentPage = parseInt(res.headers._headersMap.get('X-Pagination-Current-Page')[0]);
    this.paginationPageCount = parseInt(res.headers._headersMap.get('X-Pagination-Page-Count')[0]);
    this.paginationPerPage = parseInt(res.headers._headersMap.get('X-Pagination-Per-Page')[0]);
    this.paginationTotalCount = parseInt(res.headers._headersMap.get('X-Pagination-Total-Count')[0]);
    this.loading = false;
    return body || { };
  }
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  ngOnInit() {
    this.getItems(this.paginationCurrentPage).subscribe(
                       items => this.items = items,
                       error =>  this.errorMessage = <any>error);;
  }
}
