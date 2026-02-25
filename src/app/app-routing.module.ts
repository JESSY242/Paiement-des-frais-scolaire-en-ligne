import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PaiementComponent } from './Paiement/paiement/paiement.component';
import { ContactComponent } from './contact/contact.component';
import { EcoleComponent } from './ecole/ecole/ecole.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ValiderPaiementComponent } from './valider-paiement/valider-paiement.component';
import { EnvironComponent } from './environ/environ.component';
import { TemoignagesComponent } from './temoignages/temoignages.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { ConnexionEcoleComponent } from './connexion/connexion-ecole/connexion-ecole.component';
import { AccueilEcoleComponent } from './accueil/accueil-ecole/accueil-ecole.component';

const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'paiement/:CodeEtab/:NomEtab', component: PaiementComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'ecole', component: EcoleComponent},
  {path: 'validerPaiement/:ID/:classe', component: ValiderPaiementComponent},
  {path: 'environ', component: EnvironComponent},
  {path: 'temoignages', component: TemoignagesComponent},
  {path: 'service', component: ServicePageComponent},
  { path:'connexionEcole', component:ConnexionEcoleComponent},
   { path:'accueilEcole', component:AccueilEcoleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
