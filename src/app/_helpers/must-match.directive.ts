import { Directive, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { MustMatchTd } from './must-match.validator';

@Directive({
  selector: '[appMustMatch]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true },
  ],
})
export class MustMatchDirective implements Validator {
  @Input('appMustMatch') mustMatch: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors {
    return MustMatchTd(this.mustMatch[0], this.mustMatch[1])(formGroup);
  }
}
