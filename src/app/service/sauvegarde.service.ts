import { Injectable } from '@angular/core';
import { IeleveRenvoye } from '../model/eleve';

@Injectable({
  providedIn: 'root'
})
export class SauvegardeService {

public eleveTrouve: IeleveRenvoye[] = [];
  public rechercheEffectuee = false;
  constructor(
   
  ) { }

  
}
