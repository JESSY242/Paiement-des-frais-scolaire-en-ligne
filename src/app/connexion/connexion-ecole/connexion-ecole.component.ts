import { Component } from '@angular/core';
import { ServiceConnexionEcoleService } from 'src/app/service/service-connexion-ecole.service';
import { Router } from '@angular/router';
import { Connexion } from 'src/app/model/connexionEcole';
@Component({
  selector: 'app-connexion-ecole',
  templateUrl: './connexion-ecole.component.html',
  styleUrls: ['./connexion-ecole.component.scss']
})
export class ConnexionEcoleComponent {
 login: string =""
 MoDePasse: string =""
 loading: boolean = false;

 errorLogin: string = "";
  errorPassword: string = "";

  tentatives: number = 0;
bloque: boolean = false;
compteur: number = 60;
intervalId: any;

 constructor(
  private service : ServiceConnexionEcoleService,
  private route : Router
 ){}

 demarrerBlocage() {

  this.bloque = true;
  this.compteur = 60;

  this.intervalId = setInterval(() => {
    this.compteur--;

    if (this.compteur <= 0) {
      clearInterval(this.intervalId);
      this.bloque = false;
      this.tentatives = 0;
    }

  }, 1000);

}

 seConnecter(){

   if (this.bloque) {
    return;
  }
  this.loading = true;   

   this.errorLogin = "";
    this.errorPassword = "";

  const data: Connexion = {
    Login: this.login,
    MoDePasse: this.MoDePasse
  };

  this.service.login(data).subscribe({
    next: (response) => {

      this.tentatives = 0;

      localStorage.setItem('ecole', JSON.stringify(response));

      this.loading = false;  

      this.route.navigate(['/accueilEcole']);
    },
    
    error: (err: any) => {
       this.tentatives++;
      if (err.status === 401) {
          this.errorPassword = "Mot de passe incorrect";
        } else if (err.status === 404) {
          this.errorLogin = "Code école incorrect";
           this.loading = false; 
        } else {
          this.errorLogin = "Mot de passe ou login incorrect";
           this.loading = false; 
        }
         if (this.tentatives >= 3) {
        this.demarrerBlocage();
      }
      }
  });

  

}
}
