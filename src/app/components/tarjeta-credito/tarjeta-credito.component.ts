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
  listTarjetas: any[]=[
    {titular: 'Juan Perez', numerotarjeta: '154540', fechaExpiracion: '11/12', cvv:'123'},
    {titular: 'Ricardo', numerotarjeta: '1565644356', fechaExpiracion: '05/09', cvv:'050'}
  ];

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
      console.log(data);
    }, error=> {
      console.log(error);
    } );
  }

  agregarTarjeta(){
    console.log(this.form);

    const tarjeta:any={
      titular: this.form.get('titular')?.value,
      numerotarjeta: this.form.get('numerotarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }
    this.listTarjetas.push(tarjeta)
    this.toastr.success('La tarjeta fue registrada con exito', 'Tarjeta Registrada');
    this.form.reset();
  }
  eliminarTarjeta(index: number){
    this.listTarjetas.splice(index,1);
    this.toastr.error('La tarjeta fue elimina con exito','Tarjeta Eliminada')

  }

}
