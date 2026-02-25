import { Injectable } from '@angular/core';
import { ImobileMoneyPaiement } from '../model/mobileMoneyPaiement';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from './global-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileMoneyPaiementService {

    ApiEleve = "https://eschool.ovh/eschool/V1/MOBILE_MONEY_Paiement_Frais_Scolaire"
  
    constructor(
      private http: HttpClient,
      private header: GlobalServiceService
    ) { }
  
    postMobileMoneyFraisScolaire(data: ImobileMoneyPaiement){
      const headers = this.header.getModelHeader()
      return this.http.post(this.ApiEleve, data, {headers})
    }
    verifierStatutTransaction(payload: any): Observable<any> {
  const headers = this.header.getModelHeader()
  return this.http.post(
    'https://eschool.ovh/eschool/V1/MOBILE_MONEY_Verifie_Statut_Transaction',
    payload,
    { headers }
  )
}
}
