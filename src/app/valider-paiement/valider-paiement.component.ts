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
  getOnFraisScolaireEleve(id: number){
    this.loading = true
    console.log(id);
    this.servicefraiScolaire.getFraisScolaireEleve(id).subscribe((data)=>{
      console.log(data);   
      this.tabDetailProduits = data.tabDetailProduits

      this.Nom = data.Nom
      this.Metricule = data.Matricule
      this.Classe = data.Classe
      this.Prenom = data.Prenom
      console.log(this.Nom);
      console.log(this.Prenom);
      console.log(this.Metricule);
      
      this.loading = false
    })
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
