// import { Component } from '@angular/core';

// import { FestivoService } from './servicios/festivo.service';

// import { ReferenciasMaterialModule } from './modulos/referencias-material.module';
// import { FormsModule, NgModel } from '@angular/forms';
// import { FestivoDto } from './entidades/festivo';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [ReferenciasMaterialModule,
//     FormsModule,

//   ],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title(title: any) {
//     throw new Error('Method not implemented.');
//   }
//   year: number= 2024;
//   holidays: FestivoDto[] = [];

//   constructor(private festivoService: FestivoService) {}

//   obtenerFestivos() {
//     if (!this.year) {
//       alert('Por favor, ingresa un año válido.');
//       return;
//     }

//     this.festivoService.obtenerFestivos(this.year).subscribe(
//       (festivos: FestivoDto[]) => {
//         this.holidays = festivos;
//       },
//       (error) => {
//         console.error('Error al obtener los festivos:', error);
//         this.holidays = [];
//       }
//     );
//   }
// }
// holiday-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FestivoService } from './servicios/festivo.service';
import { ReferenciasMaterialModule } from './modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { MatDatepickerIntl } from '@angular/material/datepicker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReferenciasMaterialModule,
    FormsModule,

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  countryes: String[] = ["COLOMBIA", "CHILE", "VENEZUELA"];
  holidays: any[] = [];
  year: String = ""; // Puedes cambiar este valor según el año que desees mostrar

  constructor(private holidayService: FestivoService, private _intl: MatDatepickerIntl) {

  }

  ngOnInit(): void {
    this.getHolidays();
  }

  getHolidays(): void {
    this.holidayService.getHolidays(this.year)
      .subscribe(data => {
        this.holidays = data;
      });
  }

  formatoFecha(fecha: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    return fecha.toLocaleDateString('en-CA', options); 
  }

  fechaSeleccionada: Date = new Date(" ");
  mensajeValidacion: string = "";

  validarFecha() {
    if (!this.fechaSeleccionada) {
      alert('Por favor, selecciona una fecha.');
      return;
    }
  
      const fechaSeleccionadaStr = this.formatoFecha(this.fechaSeleccionada);
      const festivo = this.holidays.find(holiday => holiday.date === fechaSeleccionadaStr);
  
    if (festivo) {
      this.mensajeValidacion = 'Fecha festiva';
    } else {
      this.mensajeValidacion = 'No es una fecha festiva';
    }
  }


}
