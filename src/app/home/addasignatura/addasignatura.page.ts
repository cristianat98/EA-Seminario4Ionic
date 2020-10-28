import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Course } from 'src/app/modelos/course';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-addasignatura',
  templateUrl: './addasignatura.page.html',
  styleUrls: ['./addasignatura.page.scss'],
})
export class AddasignaturaPage implements OnInit {

  course: Course;
  constructor(private alertCtrl: AlertController, private servicioalumnos: AlumnosService, private router: Router) { }

  ngOnInit() {
  }

  async registrarasignatura(nombre, creditos){
    if (nombre.value == "" || creditos.value == ""){
      const alertElement = await this.alertCtrl.create({
        header: 'Debe rellenar todos los campos',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      await alertElement.present();
    }

    else{
      const alertElement = await this.alertCtrl.create({
        header: 'Asignatura guardada',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.course = new Course(nombre.value, creditos.value)
              this.servicioalumnos.registrarasignatura(this.course);
              this.router.navigate(['/alumnos']);
            }
          }
        ]
      });
      await alertElement.present();
    }
  }
}
