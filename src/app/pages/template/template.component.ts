import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  user = {
    name: '',
    last_name: '',
    email: '',
    country: '',
    sex: 'M'
  }

  sex = [
    { id: '0', sex: 'masculino', value: 'M' },
    { id: '1', sex: 'femenino', value: 'F' },
    { id: '2', sex: 'no binario', value: 'NB' }
  ]

  countries: any[] = []

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(countries => {

      this.countries = countries;
      this.countries.unshift({
        name: '[Seleccione un país]',
        code: ''
      })
    });
  }

  save(form: NgForm) {

    if (form.invalid) {

      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }

    console.log(form.value);

  }

}
