import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalServiceService } from 'siteSchool/src/app/service/global-service.service';
import { MobileMoneyPaiementService } from 'src/app/service/mobile-money-paiement.service';

@Component({
  selector: 'app-formvailider-paiement',
  templateUrl: './formvailider-paiement.component.html',
  styleUrls: ['./formvailider-paiement.component.scss']
})
export class FormvailiderPaiementComponent {
  Reference!: string
  CodeProduit!: string
  DetailOperation!: string
  IDEleve!: number
  IDProduit!: string
  MobilePayeur!: string
  Montant!: number
  message!: string
  loading!: boolean
  nomEleve!: string
  numeroOperation!: string
lienRecu!: string
operationValidee = false;
initialMobile!: string;
initialMontant!: number;

paiementValide = false
afficherReverification = false

timerVerification: any

  constructor(
    // pour fermer une boite de dialog
    private dialogRef: MatDialogRef<FormvailiderPaiementComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  {data: any, idEleve: number, nomEleve: string},
    private serviceMobileMoney: MobileMoneyPaiementService,
    private globalService : GlobalServiceService

  ){}

  ngOnInit(){
    const data =  this.data.data
    const idEleve = Number(this.data.idEleve)
    const nomEleve = this.data.nomEleve

    console.log(idEleve);
    console.log(data);
    
    this.nomEleve = data.nomEleve
    this.CodeProduit = data.CodeFrais
    this.DetailOperation = data.Libelle
    this.IDEleve = idEleve
    this.IDProduit = data.IDProduit
    this.MobilePayeur = ''
    this.Montant = data.Reste_A_Payer
    this.initialMobile = this.MobilePayeur;
this.initialMontant = this.Montant;
this.loading = false;
    this.Reference = "Paiement " + this.DetailOperation
    this.nomEleve = nomEleve
    
    console.log(this.CodeProduit);
    console.log(this.DetailOperation);
    console.log(this.IDProduit);
    console.log(this.Montant);
    console.log(this.Reference);
    console.log(this.nomEleve);
    
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

 submitForm(form: NgForm) {

  if (form.invalid) return;

  this.loading = true;
  const payloadPaiement = form.value;

  this.serviceMobileMoney.postMobileMoneyFraisScolaire(payloadPaiement)
    .subscribe(
      (res: any) => {

        this.message = res.DetailOperation;
        this.numeroOperation = res.NumeroOperation;

        // 🔒 Bloquer bouton (nouvelle opération en cours)
        this.operationValidee = true;

        // Sauvegarde des valeurs actuelles
        this.initialMobile = this.MobilePayeur;
        this.initialMontant = this.Montant;

        this.lancerVerificationAvecDelai();
      },
      error => {
        this.loading = false;
        this.message = 'Erreur lors du paiement ❌';
      }
    );
}
onFieldChange() {

  if (
    this.MobilePayeur !== this.initialMobile ||
    this.Montant !== this.initialMontant
  ) {
    this.operationValidee = false;
    this.paiementValide = false;
    this.afficherReverification = false;
  }
}

lancerVerificationAvecDelai() {
  this.timerVerification = setTimeout(() => {
    this.verifierPaiement()
  }, 25000)
}
verifierPaiement() {
  this.loading = true

  const payload = {
    Code_Etab: this.globalService.getCodeEcole(),
    NumeroOperation: this.numeroOperation,
    Action: 2
  }

  this.serviceMobileMoney.verifierStatutTransaction(payload)
    .subscribe(
      (res: any) => {
        console.log('Vérification :', res)
        this.loading = false

        // ✅ PAIEMENT VALIDÉ
        if (res.Status === '200' && res.Etat === '2') {
          this.paiementValide = true
          this.afficherReverification = false
          this.lienRecu = res.LienRecu
          this.message = 'Paiement effectué avec succès ✅'
          clearTimeout(this.timerVerification)
        }
        // ⏳ EN ATTENTE
        else {
          this.afficherReverification = true
          this.message = 'Paiement en attente ⏳'
        }
      },
      error => {
        this.loading = false
        this.afficherReverification = true
        this.message = 'Erreur de vérification ❌'
      }
    )
}
ouvrirRecu() {
  if (this.lienRecu && this.lienRecu.startsWith('http')) {
    window.open(this.lienRecu, '_blank');
  } else {
    this.message = 'Le lien du reçu n’est pas disponible ❌';
  }
}





}
