import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { from } from 'rxjs';
import { IanneeScolaire } from '../model/anneeScolaire';

@Component({
  selector: 'app-annee-scolaire',
  templateUrl: './annee-scolaire.component.html',
  styleUrls: ['./annee-scolaire.component.scss']
})
export class AnneeScolaireComponent {

  anneeScolaire!: string

  constructor(
      // pour fermer une boite de dialog
      private dialogRef: MatDialogRef<AnneeScolaireComponent>,
  ){}

  onNoClick(): void {    
    this.dialogRef.close();
  }

  submitForm(form: NgForm){
    const annee = form.value
    console.log(annee);
    
    if(form.valid){
      const selectedAnnee: string = annee.anneeScolaire;
      console.log(selectedAnnee);
      this.dialogRef.close(selectedAnnee)
    }else{
      alert("Veuillez sélectionner une année scolaire.")
    }
    
  }
  goBack() {
  window.history.back();
}

}
