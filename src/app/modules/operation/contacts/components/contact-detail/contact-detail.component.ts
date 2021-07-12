import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IContact } from 'src/app/interfaces/Contact';
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: IContact | null = null;
  @Input() showResetButton = true;
  @Output() onreset = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  reset() {
    this.onreset.emit();
  }

}
