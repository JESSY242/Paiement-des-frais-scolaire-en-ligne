import { Component, OnInit } from '@angular/core';
import { ServiceConnexionEcoleService } from 'src/app/service/service-connexion-ecole.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-accueil-ecole',
  templateUrl: './accueil-ecole.component.html',
  styleUrls: ['./accueil-ecole.component.scss']
})
export class AccueilEcoleComponent implements OnInit {

 

 

ecole: any;
  transactions: any[] = [];
  loading: boolean = false;
  searchLibelle: string = '';
searchDateDebut: string = '';
searchDateFin: string = '';
filteredList: any[] = [];
searchMobile: string = '';
searchReference: string = '';
selectedTransaction: any = null;
showModal: boolean = false;

  montantEncaisse = 0;
  montantRetire = 0;

  constructor(private service: ServiceConnexionEcoleService) {}

 ngOnInit(): void {
  const data = localStorage.getItem('ecole');

  if (data) {
    this.ecole = JSON.parse(data);

    const today = new Date();
    const formatted = this.formatInputDate(today);

    this.searchDateDebut = formatted;
    this.searchDateFin = formatted;

    this.chargerTransactions();
  }
}
openDetails(transaction: any) {
  this.selectedTransaction = transaction;
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
  this.selectedTransaction = null;
}
exporterPDF() {
  const doc = new jsPDF('p', 'mm', 'a4');

  doc.setFontSize(14);
  doc.setTextColor(200, 0, 0);
  doc.text(`Rapport des transactions - ${this.ecole?.RaisonSociale}`, 14, 15);

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Du ${this.searchDateDebut} au ${this.searchDateFin}`, 14, 22);

  const rows = this.filteredList.map(t => {

  

  return [
    this.formatInputDate(this.convertApiDate(t.DateHeure)),
    t.Libelle,
    t.Montant,
     t.Frais,
    t.Mobile_Payeur || '-',
    t.Reference 
  ];
});

  autoTable(doc, {
    head: [['Date', 'Libellé', 'Montant', 'Frais', 'Payeur']],
    body: rows,
    startY: 28,
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [200, 0, 0], textColor: 255, fontStyle: 'bold', halign: 'center' },
    bodyStyles: { textColor: 0, halign: 'left' },
    columnStyles: { 2: { halign: 'right' }, 3: { halign: 'right' } },
  });

  const finalY = (doc as any).lastAutoTable?.finalY || 28;
  doc.setFontSize(12);
  doc.setTextColor(200, 0, 0);
  doc.text(
    `Total encaissé : ${this.montantEncaisse.toLocaleString('fr-FR')} FCFA`,
    14,
    finalY + 10
  );

  doc.save('rapport-transactions.pdf');
}


 chargerTransactions() {
  this.loading = true;

  const body = {
    DateDebut: this.getDateDebut(),
    DateFin: this.getDateFin(),
    Code_Societe: this.ecole?.Code_Societe,
    Token: this.ecole?.Token || ""
  };

  this.service.getTransactions(body).subscribe({
    next: (response: any) => {
      console.log("RESPONSE API:", response);

      
      this.transactions = Array.isArray(response.tabDetail) ? response.tabDetail : [];
      this.applyFilters();

      

      this.loading = false;
    },
    error: (err: any) => {
      console.error(err);
      this.loading = false;
    }
  });
}
  calculerTotaux() {

    this.montantEncaisse = 0;
    this.montantRetire = 0;

    this.transactions.forEach(t => {

      if (t.Type === 'PAIEMENT') {
        this.montantEncaisse += Number(t.Montant);
      }

      if (t.Type === 'RETRAIT') {
        this.montantRetire += Number(t.Montant);
      }

    });

  }

  getDateDebut(): string {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    return this.formatInputDate(firstDay);
  }

  getDateFin(): string {
    return this.formatInputDate(new Date());
  }

 formatInputDate(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}



applyFilters() {

  this.filteredList = this.transactions.filter(t => {

    const libelleMatch = String(t.Libelle || '')
      .toLowerCase()
      .includes(this.searchLibelle.toLowerCase());

    const mobileMatch = String(t.Mobile_Payeur || '')
      .toLowerCase()
      .includes(this.searchMobile.toLowerCase());

    const referenceMatch = String(t.Reference || '')
      .toLowerCase()
      .includes(this.searchReference.toLowerCase());

    let dateMatch = true;

    const tDate = this.convertApiDate(t.DateHeure);

    if (this.searchDateDebut) {
      const [y, m, d] = this.searchDateDebut.split('-').map(Number);
      const start = new Date(y, m - 1, d, 0, 0, 0, 0);
      dateMatch = dateMatch && tDate >= start;
    }

    if (this.searchDateFin) {
      const [y, m, d] = this.searchDateFin.split('-').map(Number);
      const end = new Date(y, m - 1, d, 23, 59, 59, 999);
      dateMatch = dateMatch && tDate <= end;
    }

    return libelleMatch && mobileMatch && referenceMatch && dateMatch;
  });

  
  this.montantEncaisse = 0;
  this.montantRetire = 0;

  this.filteredList.forEach(t => {

    const montant = Number(
      String(t.Montant).replace(/[^\d.-]/g, '')
    ) || 0;

    
    if (montant > 0) {
      this.montantEncaisse += montant;
    }

    
    if (montant < 0) {
      this.montantRetire += Math.abs(montant);
    }

  });

}
convertApiDate(dateStr: string): Date {

 
  if (/^\d{14}$/.test(dateStr)) {
    const year = dateStr.substring(0,4);
    const month = dateStr.substring(4,6);
    const day = dateStr.substring(6,8);
    const hour = dateStr.substring(8,10);
    const minute = dateStr.substring(10,12);
    const second = dateStr.substring(12,14);

    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  }

  
  return new Date(dateStr);
}
}
