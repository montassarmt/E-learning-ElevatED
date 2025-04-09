import { Partnership } from '@/app/PartnershipManagement/Models/Partnership';
import { Proposal } from '@/app/PartnershipManagement/Models/Proposal';
import { PartnershipService } from '@/app/PartnershipManagement/Services/partnership.service';
import { ProposalService } from '@/app/PartnershipManagement/Services/proposal.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proposal-list-front',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proposal-list-front.component.html',
  styleUrl: './proposal-list-front.component.scss'
})
export class ProposalListFrontComponent implements OnInit {
 proposals: Proposal[] = [];
  filteredProposals: Proposal[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  sortBy: string = '';
  currentPage: number = 1;

    partnerships: Partnership[] = [];
  

  constructor(private proposalService: ProposalService , private partnershipService:PartnershipService) {}
  ngOnInit(): void {
    this.loadProposals();
  }

  loadProposals(): void {
    this.proposalService.getAllProposals().subscribe(
      (data) => {
        this.proposals = data;
      },
      (error) => {
        console.error('Error fetching proposals:', error);
      }
    );
  }


  filterProposals(): void {
    this.filteredProposals = this.proposals.filter((proposal) =>
      proposal.proposalName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (this.selectedCategory && this.selectedCategory !== 'All') {
      this.filteredProposals = this.filteredProposals.filter(
        (proposal) => proposal.proposalType === this.selectedCategory
      );
    }

    this.sortProposals();
  }

  sortProposals(): void {
   
  }

  applyForProposal(proposalId: number): void {
    console.log(`Applying for proposal ID: ${proposalId}`);
    // Handle application logic
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

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
