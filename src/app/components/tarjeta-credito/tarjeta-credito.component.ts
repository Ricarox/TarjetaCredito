import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas: any[]=[];

  form: FormGroup;

  constructor(private fb:FormBuilder,private toastr: ToastrService,
    private _tarjetaSvc: TarjetaService ) { 
    
    this.form=this.fb.group({
      titular:['',Validators.required],
      numerotarjeta:['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion:['',[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv:['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaSvc.getListTarjetas().subscribe(data=>{
      this.listTarjetas=data;
    }, error=> {
      console.log(error);
    } );
  }

  agregarTarjeta(){
    


    const tarjeta:any={
      titular: this.form.get('titular')?.value,
      numerotarjeta: this.form.get('numerotarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }
    this._tarjetaSvc.saveTarjeta(tarjeta).subscribe(
      data=>{
        this.toastr.success('La tarjeta fue registrada con exito', 'Tarjeta Registrada');
        this.obtenerTarjetas();
        this.form.reset();
      }, error =>{
        this.toastr.error('Oopss Ocurrio un error', 'Error');

        console.log(error);
      })
  }
  eliminarTarjeta(id: number){
    this._tarjetaSvc.deleteTarjeta(id).subscribe(data =>{
      this.toastr.error('La tarjeta fue elimina con exito','Tarjeta Eliminada');
      this.obtenerTarjetas();
    }, error =>{
      console.log(error);
    });
    

  }

}
