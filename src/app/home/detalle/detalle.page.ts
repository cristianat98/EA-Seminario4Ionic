import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AlumnosService } from '../alumnos.service';
import { AlertController } from '@ionic/angular'; 
import { User } from 'src/app/modelos/user';
import { Course} from 'src/app/modelos/course'

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  alumno: User;
  cursossincursar: Course[];
  i: number;
  aleatorio: number;
  resto: number;
  constructor(private activatedroute: ActivatedRoute, private alumnoservicio: AlumnosService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  this.activatedroute.paramMap.subscribe(paramMap => {
    const recipeId = paramMap.get('alumnoId');
    this.alumnoservicio.getalumno(recipeId).subscribe(data =>{
      this.alumno = data;
      console.log(data);
    }
    );
  })

  this.alumnoservicio.getcourses().subscribe(data => {
    this.cursossincursar = data
  });
  } 

  ionViewWillEnter(){
    this.alumnoservicio.getcourses().subscribe(data => {
      this.cursossincursar = data
    });

    this.i = 0;
    console.log(this.alumno)
    while (this.i<this.alumno.courses.length){
      this.cursossincursar = this.cursossincursar.filter(course => {
        return course._id !== this.alumno.courses[this.i]._id})
      
      //this.alumno.courses[this.i].nota = this.getNota();
      this.i++;
    }
  }

  async deleteAlumno(){
    const alertElement = await this.alertCtrl.create({
      header: "¿Estás segura que quieres que " + this.alumno.nombre + " " + this.alumno.apellidos + " no sea tu alumno?",
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sí',
          handler: () => {
            this.alumnoservicio.deletealumno(this.alumno._id);
            this.router.navigate(['/alumnos']);
          }
        }
      ]
    });
    await alertElement.present();
  }

  getNota(){ 
    this.aleatorio = Math.random() * 10;
    this.resto = this.aleatorio%1;
    this.aleatorio = this.aleatorio-this.resto;
    return this.aleatorio;
  }

  AbrirModificar(){
    this.router.navigate(['/alumnos/' + this.alumno._id + "/modificar"]);
  }

  AbrirChat(){
    this.router.navigate(['/alumnos/' + this.alumno._id + "/chat"]);
  }
  
  async eliminarAsignatura(asignatura){
    const alertElement = await this.alertCtrl.create({
      header: "¿Estás segura que " + this.alumno.nombre + " " + this.alumno.apellidos + " ya no está cursando " + asignatura.nombre + "?",
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sí',
          handler: () => {
            this.alumnoservicio.deleteasignatura(this.alumno, asignatura._id)
            this.router.navigate(['/alumnos']);
          }
        }
      ]
    });
    await alertElement.present();
  }

  async addasignatura(asignatura){
    
    if (asignatura.value != undefined){
      const alertElement = await this.alertCtrl.create({
        header: "La asignatura  se ha añadido al alumno " + this.alumno.nombre + " " + this.alumno.apellidos,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              //this.alumnoservicio.addasignatura(this.alumno, asignatura.value);
              this.router.navigate(['/alumnos']);
            }
          }
        ]
      });
      await alertElement.present();
    }
  }
}
