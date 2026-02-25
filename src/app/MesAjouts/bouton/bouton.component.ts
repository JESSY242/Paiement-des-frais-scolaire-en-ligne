import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router,  NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-bouton',
  templateUrl: './bouton.component.html',
  styleUrls: ['./bouton.component.scss']
})
export class BoutonComponent {
    showButton = true
constructor(
  private location : Location,
  private router : Router
){this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // cacher le bouton sur l'accueil
        this.showButton = event.urlAfterRedirects !== '/';
      }
    });}

goBack(){
  this.location.back();
}

canGoBack(){
  return window.history.length > 1;
}
}
