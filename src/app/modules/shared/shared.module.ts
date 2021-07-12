import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import * as solidIcons  from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
  constructor(private lib: FaIconLibrary) {
    lib.addIcons(
      solidIcons.faHandHoldingUsd,
      solidIcons.faAddressBook,
      solidIcons.faPen,
      solidIcons.faPlus,
      solidIcons.faUserPlus,
      solidIcons.faUser,
      solidIcons.faUsers,
      solidIcons.faPiggyBank
    )
  }
}
