import { PartnershipStatus } from '@/app/PartnershipManagement/Models/ParntershipStatus';
import { Partnership } from '@/app/PartnershipManagement/Models/Partnership';
import { PartnershipService } from '@/app/PartnershipManagement/Services/partnership.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-partnership-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partnership-list.component.html',
  styleUrl: './partnership-list.component.scss'
})
export class PartnershipListComponent implements OnInit {
  partnerships: Partnership[] = [];
  partnership: Partnership | null = null;
  PartnershipStatus = PartnershipStatus;
  buttonClicked: { [key: number]: boolean } = {};

  constructor(private partnershipService: PartnershipService) { }

  ngOnInit(): void {
    this.loadPartnerships();
  }

  loadPartnerships(): void {
    this.partnershipService.getAllPartnerships().subscribe(
      (data) =>{
        this.partnerships = data;
      },
      (error) => {
        console.error('Error fetching partnerships:', error);
      }
    )
  }


  getPartnershipById(id: number): void {
    this.partnershipService.getPartnershipById(id).subscribe(
      data => {
        this.partnership = data;
      },
      error => {
        console.error('Error fetching partnership by ID', error);
      }
    );
  }

  createPartnership(partnership: Partnership): void {
    this.partnershipService.createPartnership(partnership).subscribe(
      data => {
        this.partnerships.push(data);
      },
      error => {
        console.error('Error creating partnership', error);
      }
    );
  }

  updatePartnership(id: number, partnership: Partnership): void {
    this.partnershipService.updatePartnership(id, partnership).subscribe(
      data => {
        const index = this.partnerships.findIndex(p => p.idPartnership === id);
        if (index !== -1) {
          this.partnerships[index] = data;
        }
      },
      error => {
        console.error('Error updating partnership', error);
      }
    );
  }

  deletePartnership(id: number): void {
    this.partnershipService.deletePartnership(id).subscribe(
      () => {
        this.partnerships = this.partnerships.filter(p => p.idPartnership !== id);
      },
      error => {
        console.error('Error deleting partnership', error);
      }
    );
  }

  applyForPartnership(entrepriseId: number, proposalId: number): void {
    this.partnershipService.applyForPartnership(entrepriseId, proposalId).subscribe(
      data => {
        this.partnerships.push(data);
      },
      error => {
        console.error('Error applying for partnership', error);
      }
    );
  }

  acceptPartnership(partnershipId: number, entrepriseId: number): void {
    // Set the button as clicked to disable it after the user clicks it
    if (!this.buttonClicked[partnershipId]) {
      this.buttonClicked[partnershipId] = true;

      this.partnershipService.acceptPartnership(partnershipId, entrepriseId).subscribe(
        (response) => {
          console.log('Partnership accepted:', response);
          // Handle success (e.g., show a success message or update UI)
        },
        (error) => {
          console.error('Error accepting partnership:', error);
          // Handle error (e.g., show an error message)
        }
      );
    }
  }
  generatePartnershipPdf(id: number): void {
    this.partnershipService.generatePartnershipPdf(id).subscribe(
      blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `partnership_${id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error generating PDF', error);
      }
    );
  }
}
