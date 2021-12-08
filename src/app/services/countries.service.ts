import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get('https://restcountries.com/v2/lang/es')
      .pipe(
        map((response: any) => {
          return response.map((country: any) => {
            return {
              name: country.name,
              code: country.alpha3Code
            }
          })
        })
      )
  }
}
