import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
