import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaiementComponent } from './Paiement/paiement/paiement.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { EcoleComponent } from './ecole/ecole/ecole.component';
import { AccueilComponent } from './accueil/accueil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import { ValiderPaiementComponent } from './valider-paiement/valider-paiement.component';
import { FormvailiderPaiementComponent } from './valider-paiement/formvailider-paiement/formvailider-paiement.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { TemoignagesComponent } from './temoignages/temoignages.component';
import { EnvironComponent } from './environ/environ.component';
import { AnneeScolaireComponent } from './annee-scolaire/annee-scolaire.component';
import { BoutonComponent } from './MesAjouts/bouton/bouton.component';
import { ConnexionEcoleComponent } from './connexion/connexion-ecole/connexion-ecole.component';
import { AccueilEcoleComponent } from './accueil/accueil-ecole/accueil-ecole.component';

@NgModule({
  declarations: [
    AppComponent,
    PaiementComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    EcoleComponent,
    AccueilComponent,
    ValiderPaiementComponent,
    FormvailiderPaiementComponent,
    ServicePageComponent,
    TemoignagesComponent,
    EnvironComponent,
    AnneeScolaireComponent,
    BoutonComponent,
    ConnexionEcoleComponent,
    AccueilEcoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
  { provide: LOCALE_ID, useValue: 'fr' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
