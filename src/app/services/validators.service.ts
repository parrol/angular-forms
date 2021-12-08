import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  userExists(control: FormControl): Promise<ErrorValidate | null> | Observable<ErrorValidate | null> {

    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'parrol') {
          resolve({ userExists: true });
        } else {
          resolve(null);
        }
      }, 3500);
    })
  }

  //returns the error "NoParra: true" if Parra is typed in the form
  noParra(control: FormControl): ErrorValidate | null {

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
