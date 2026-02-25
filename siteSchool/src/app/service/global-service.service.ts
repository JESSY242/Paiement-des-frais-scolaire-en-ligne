import { Injectable } from '@angular/core';
import { Iheader } from '../model/header';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  private codeEcole: string = 'CTP'
  private annee: string = '2022-2023'

  constructor() { }

  setHeaderInfos(codeEcole: string, annee: string){
    this.codeEcole = codeEcole
    this.annee = annee
  }

  getModelHeader(){
    // const header: Iheader = {
    //   CODE_ECOLE: 'CTP',
    //   ANNEE: '2022-2023',
    // }

    console.log(this.codeEcole);
    console.log(this.annee);
    
    
    const header: Iheader = {
      CODE_ECOLE: this.codeEcole,
      ANNEE: this.annee
    }

    return new HttpHeaders({...header})
  }
   getCodeEcole(): string {
  return this.codeEcole;
}
}
