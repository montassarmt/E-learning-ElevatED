import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proposal } from '@/app/PartnershipManagement/Models/Proposal';
import { ProposalService } from '@/app/PartnershipManagement/Services/proposal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proposal-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proposal-list.component.html',
  styleUrl: './proposal-list.component.scss'
})
export class ProposalListComponent implements OnInit {
  proposals: Proposal[] = [];
  filteredProposals: Proposal[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  sortBy: string = '';
  currentPage: number = 1;

  constructor(private proposalService: ProposalService) {}
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

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this proposal?')) {
      this.deleteProposal(id);
    }
  }
  
  deleteProposal(id: number): void {
    this.proposalService.deleteProposal(id).subscribe(
      () => {
        this.proposals = this.proposals.filter(proposal => proposal.idProposal !== id);
      },
      (error) => {
        console.error('Error deleting proposal:', error);
      }
    );
  }

  editProposal(id: number): void {
    const proposalToUpdate = this.proposals.find(p => p.idProposal === id);
    if (proposalToUpdate) {
      this.proposalService.updateProposal(id, proposalToUpdate).subscribe({
        next: (updatedProposal) => {
          this.proposals = this.proposals.map(p =>
            p.idProposal === id ? updatedProposal : p
          );
          console.log('Proposal updated successfully:', updatedProposal);
        },
        error: (err) => console.error('Error updating proposal:', err)
      });
    }
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

  onPageChange(page: number): void {
    this.currentPage = page;
  }

}
