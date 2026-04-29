import { Component, HostListener, inject, Input } from '@angular/core';
import { ValiderPaiementComponent } from 'src/app/valider-paiement/valider-paiement.component';
import { EleveService } from 'src/app/service/eleve.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Ieleve, IeleveRenvoye } from 'src/app/model/eleve';
import { FraisScolairesService } from 'src/app/service/frais-scolaires.service';
import { GlobalServiceService } from 'src/app/service/global-service.service';
import { Iheader } from 'src/app/model/header';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormvailiderPaiementComponent } from 'src/app/valider-paiement/formvailider-paiement/formvailider-paiement.component';
import { AnneeScolaireComponent } from 'src/app/annee-scolaire/annee-scolaire.component';
import { SauvegardeService } from 'src/app/service/sauvegarde.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent {
  rechercheEffectuee = false;
  eleveTrouve: IeleveRenvoye[] = [];
  loading = false;

  CodeEcole = "";
  nomEtablissement = "";
  ligneSelectionnee!: Ieleve;
  idEleve!: number;
  header!: Iheader;

  @Input() codeEta!: string;
  @Input() NomEtab!: string;

  isButtonVisible = false;

  readonly dialog = inject(MatDialog);

  constructor(
    private serviceEleve: EleveService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private entete: GlobalServiceService,
    private location: Location,
    private sauvegarde : SauvegardeService
  ) {}
goBack(): void {
  this.location.back();
}
  ngOnInit() {
  const codeEtab = this.activateRoute.snapshot.params['CodeEtab'];
  const nomEtab = this.activateRoute.snapshot.params['NomEtab'];
  this.CodeEcole = codeEtab;
  this.nomEtablissement = nomEtab;
  console.log(this.CodeEcole);

  // Restaurer le tableau depuis le service
  if(this.sauvegarde.eleveTrouve.length > 0){
    this.eleveTrouve = this.sauvegarde.eleveTrouve;
    this.rechercheEffectuee = this.sauvegarde.rechercheEffectuee;
  }
}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isButtonVisible = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  

rechercheForm(form: NgForm) {
  this.loading = true;
  const eleve: Ieleve = form.value;
  console.log(eleve);
  

  this.serviceEleve.postRecherEcole(eleve).subscribe({
    next: (data) => {
      const result = Array.isArray(data) ? data : [];

      this.eleveTrouve = result;
      this.rechercheEffectuee = true;
      this.loading = false;

      if(result.length > 0){
        
        this.sauvegarde.eleveTrouve = result;
        this.sauvegarde.rechercheEffectuee = true;
        this.idEleve = result[0]?.IDELEVE ?? 0;
      }

     
    },
    error: (err) => {
      console.error(err);
      this.loading = false;
      this.rechercheEffectuee = true;
      
    }
  });
}

  openDialog(Eleve: IeleveRenvoye): void {
    const id = Eleve.IDELEVE;
    const classe = Eleve.Classe;

    const dialogRef = this.dialog.open(AnneeScolaireComponent);

    dialogRef.afterClosed().subscribe(result => {
      const annee = result;
      if (annee) {
        this.entete.setHeaderInfos(this.CodeEcole, annee);
        this.router.navigateByUrl('/validerPaiement/' + id + '/' + classe);
      }
    });
  }
}
