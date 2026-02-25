import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FraisScolairesService } from '../service/frais-scolaires.service';
import { NgForm } from '@angular/forms';
import { EleveService } from '../service/eleve.service';
import { ActivatedRoute } from '@angular/router';
import { ItabDeatailProduits } from '../model/tabRetailProduits';

// modal
import { FormvailiderPaiementComponent } from './formvailider-paiement/formvailider-paiement.component';

@Component({
  selector: 'app-valider-paiement',
  templateUrl: './valider-paiement.component.html',
  styleUrls: ['./valider-paiement.component.scss']
})
export class ValiderPaiementComponent {
  eleves: ItabDeatailProduits[] = []
  loading!: boolean

  // fraisScolaires
  tabDetailProduits!: any[]

  // information de l'eleve
  IDELEVE!: number
  Metricule!: string
  Nom!: string
  Prenom!: string
  Classe!: string
  aucunPaiement = false;
timeoutRef: any;
  

  readonly dialog = inject(MatDialog);


  constructor(
    private servicefraiScolaire: FraisScolairesService,
    private serviceEleve: EleveService,
    private activeRoute: ActivatedRoute
  ){}

  ngOnInit(){
    const idEleve = this.activeRoute.snapshot.params['ID']
    const classeEleve = this.activeRoute.snapshot.params['classe']

    this.IDELEVE = idEleve
    this.Classe = classeEleve

    console.log(this.IDELEVE);
    console.log(this.Classe);
    
    this.getOnFraisScolaireEleve(this.IDELEVE)
  }

  // recuperer un eleve avec ID
 getOnFraisScolaireEleve(id: number) {
  this.loading = true;
  this.aucunPaiement = false;
  this.tabDetailProduits = [];

  // ⏱️ timeout de sécurité : 10 secondes
  this.timeoutRef = setTimeout(() => {
    if (this.loading) {
      this.loading = false;
      this.aucunPaiement = true;
    }
  }, 10000);

  this.servicefraiScolaire.getFraisScolaireEleve(id).subscribe({
    next: (data: any) => {
      clearTimeout(this.timeoutRef);
      this.loading = false;

      if (data?.tabDetailProduits && data.tabDetailProduits.length > 0) {
        this.tabDetailProduits = data.tabDetailProduits;
        this.aucunPaiement = false;

        this.Nom = data.Nom;
        this.Metricule = data.Matricule;
        this.Classe = data.Classe;
        this.Prenom = data.Prenom;
      } else {
        this.aucunPaiement = true;
      }
    },
    error: () => {
      clearTimeout(this.timeoutRef);
      this.loading = false;
      this.aucunPaiement = true;
    }
  });
}


  openDialog(data: any): void {
    console.log(data);
    const idEleve = this.IDELEVE
    const nomEleve = this.Nom
    console.log(nomEleve);
    
    
    const dialogRef = this.dialog.open(FormvailiderPaiementComponent, {data: {data, idEleve, nomEleve}});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
