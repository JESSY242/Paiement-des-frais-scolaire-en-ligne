import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Connexion } from '../model/connexionEcole';
import { GlobalServiceService } from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceConnexionEcoleService {
  private apiUrl= "https://www.eschoolapi.com/epay/V1/USER_DemandeConnexion"

  
   private transactionUrl = "https://www.eschoolapi.com/epay/V1/USER_Get_Transactions";

  constructor(
     private http : HttpClient,
     private header: GlobalServiceService
  ) { }

  login (data:Connexion): Observable<any> {
    
    return this.http.post(this.apiUrl, data)
  }
  getTransactions(body: any): Observable<any> {
    return this.http.post(this.transactionUrl, body);
  }

  
}
