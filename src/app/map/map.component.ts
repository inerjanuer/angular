import { Map } from './mapa';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  public maps: Map;
  public impacts: Map;

  constructor(private restService: RestServiceService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.getBattlefield();
    console.log(this.getBattlefield());
    this.getImpacts();
    console.log(this.getImpacts());
  }

  evaluateImpact(x: number, y: number) {
    console.log(x, y );
    this.restService.evaluateImpact(x, y).subscribe((result: number) => {
      if (result == 1) {
        console.log(result);
        this.getImpacts();
        // location.reload();

      } else if (result == 423) {// numero retorno ocupado
        alert("Servidor Ocupado");
        // location.reload();
      } else {
        this.getImpacts();
        console.log(result);
        // location.reload();
      }
    });
  }

  getBattlefield() {
    this.restService.getBattlefield().subscribe((maps: Map)=>(this.maps = maps));
  }
  getImpacts() {
    this.restService.getImpacts().subscribe((impacts: Map) => (this.impacts = impacts));
  }
}
