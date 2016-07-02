import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Char }                from './char';
import { CharService }         from './char.service';
import { CharDetailComponent } from './char-detail.component';

@Component({
  selector: 'char',
  template: require('./char.component.html'),
  directives: [CharDetailComponent],
  providers:[CharService]
})
export class CharComponent implements OnInit {
  chars: Char[];
  selectedChar: Char;
  addingChar = false;
  error: any;

  constructor(
    private router: Router,
    private charService: CharService) { }

  getChars() {
    this.charService
        .getChars()
        .then(data => {
          //console.log(data);
          this.chars = data;
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  close(savedItem: Char) {
    this.addingChar = false;
    if (savedItem) { this.getChars(); }
  }

  ngOnInit() {
    this.getChars();
  }

  onSelect(char: Char) {
    this.selectedChar = char;
    this.addingChar = false;
  }

  gotoDetail() {
    this.router.navigate(['/char/detail', this.selectedChar.id ]);
  }

}
