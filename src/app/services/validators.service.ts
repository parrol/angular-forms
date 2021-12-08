import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  //returns the error "NoParra: true" if Parra is typed in the form
  noParra(control: FormControl): { [s: string]: boolean } | null {

    if (control.value?.toLowerCase() === 'parra') {
      return {
        NoParra: true
      }
    }
    return null;
  }

  //set the error "samePasswords: false" if the values of each password's control are different.
  samePasswords(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ samePasswords: false });
      }

    }
  }
}
