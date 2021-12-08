import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private validators: ValidatorsService) {
    this.createForm();
    this.loadDataToForm();
  }

  ngOnInit(): void {
  }

  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }

  get invalidName() {
    let name = this.form.get('name');
    return name!.invalid && name!.touched
  }

  get invalidLastName() {
    let last_name = this.form.get('last_name');
    return last_name!.invalid && last_name!.touched
  }

  get invalidEmail() {
    let email = this.form.get('email');
    return email!.invalid && email!.touched
  }

  get invalidDistrict() {
    let district = this.form.get('address.district');
    return district!.invalid && district!.touched
  }

  get invalidCity() {
    let city = this.form.get('address.city');
    return city!.invalid && city!.touched
  }

  get invalidPass1() {
    let password1 = this.form.get('password1');
    return password1!.invalid && password1!.touched
  }

  get invalidPass2() {
    const password1 = this.form.get('password1')?.value;
    const password2 = this.form.get('password2')?.value;
    return (password1 === password2) ? false : true;
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      last_name: ['', [Validators.required, Validators.minLength(5), this.validators.noParra]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      address: this.fb.group({
        district: ['', Validators.required],
        city: ['', Validators.required],
      }),
      hobbies: this.fb.array([])
    }, {
      validators: this.validators.samePasswords('password1', 'password2')
    });
  }

  loadDataToForm() {
    this.form.reset({
      name: '',
      last_name: '',
      email: '',
      address: {
        district: '',
        city: ''
      }

    })
  }

  addHobby() {
    this.hobbies.push(this.fb.control(''))
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  save() {

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })

      return;
    };

    this.form.reset();
  }

}
