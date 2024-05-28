import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FestivoDto } from '../entidades/festivo';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FestivoService {

  private apiUrl = 'https://date.nager.at/api/v3/publicholidays';

  constructor(private http: HttpClient) { }

  getHolidays(year: String): Observable<any> {
    return this.http.get(`${this.apiUrl}/${year}/CO`);
  }

  verificarFecha(fecha: Date): Observable<boolean> {
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const urlT = `${this.apiUrl}/${año}/CO`;

    return this.http.get<any[]>(urlT).pipe(
      map(holidays => {
        const festivo = holidays.find(holiday => {
          const holidayDate = new Date(holiday.date);
          return holidayDate.getFullYear() === año &&
                 holidayDate.getMonth() + 1 === mes &&
                 holidayDate.getDate() === dia;
        });
        return festivo !== undefined;
      })
    );
  }

  public obtenerFestivos(año: number): Observable<FestivoDto[]> {
    let urlT = `${this.apiUrl}${año}`;

    return this.http.get<FestivoDto[]>(urlT);
  }


}

